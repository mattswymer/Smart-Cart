// Global Basket Optimizer (GBO) Engine

/**
 * Calculates the travel cost for a specific store.
 * 
 * @param {Object} store - The store database object.
 * @param {Object} settings - Travel penalty settings.
 * @returns {number} The travel cost in dollars.
 */
export function calculateStoreTravelCost(store, settings) {
  if (settings.useGasCalc) {
    const gasCost = (store.distanceMiles / settings.carMpg) * settings.gasPrice;
    return gasCost + settings.timePenalty;
  } else {
    return settings.flatPenalty;
  }
}

/**
 * Computes all non-empty subsets of an array.
 * Used to evaluate all store visit combinations.
 */
function getNonEmptySubsets(array) {
  const result = [[]];
  for (const element of array) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push(result[i].concat(element));
    }
  }
  return result.filter(subset => subset.length > 0);
}

/**
 * Optimizes the grocery list by finding the mathematically cheapest shopping trip,
 * balancing item prices against travel costs of visiting multiple stores.
 * 
 * @param {Array<Object>} itemsToBuy - Array of { itemId, amountNeeded }
 * @param {Object} priceGrid - Scraped prices: { itemId: { storeId: { price, ... } } }
 * @param {Array<Object>} activeStores - Array of enabled store objects
 * @param {Object} travelSettings - Travel penalty settings
 * @returns {Object} Optimized shopping plan containing assignments, costs, and comparisons.
 */
export function optimizeShoppingBasket(itemsToBuy, priceGrid, activeStores, travelSettings) {
  if (itemsToBuy.length === 0 || activeStores.length === 0) {
    return {
      success: false,
      optimalPlan: null,
      singleStoreBaselines: []
    };
  }

  // 1. Precalculate travel costs for each active store
  const travelCosts = {};
  activeStores.forEach(store => {
    travelCosts[store.id] = calculateStoreTravelCost(store, travelSettings);
  });

  // 2. Generate all non-empty combinations of stores we could visit
  const storeSubsets = getNonEmptySubsets(activeStores);
  
  let bestPlan = null;
  let minTotalCost = Infinity;

  // 3. For each subset, calculate optimal item assignments and total cost
  for (const subset of storeSubsets) {
    const subsetStoreIds = subset.map(s => s.id);
    let itemsCostSum = 0;
    const assignments = [];
    let isSubsetValid = true;

    for (const listItem of itemsToBuy) {
      let cheapestStoreId = null;
      let cheapestPrice = Infinity;
      let matchingDeal = null;

      // Find the cheapest store for this item *within the current subset*
      for (const storeId of subsetStoreIds) {
        const itemStoreData = priceGrid[listItem.itemId]?.[storeId];
        if (itemStoreData && itemStoreData.price !== undefined) {
          // Check if shopper card is linked for this store
          const isLoyaltyLinked = travelSettings.loyaltyCards && travelSettings.loyaltyCards[storeId];
          const discountFactor = isLoyaltyLinked ? 0.95 : 1.00;

          const itemPrice = itemStoreData.price * listItem.amountNeeded * discountFactor;
          // Pick the cheapest. If there is a tie, favor the store with lower travel cost
          if (itemPrice < cheapestPrice || 
             (itemPrice === cheapestPrice && cheapestStoreId && travelCosts[storeId] < travelCosts[cheapestStoreId])) {
            cheapestPrice = itemPrice;
            cheapestStoreId = storeId;
            matchingDeal = {
              ...itemStoreData,
              price: itemStoreData.price * discountFactor,
              isLoyaltyApplied: isLoyaltyLinked
            };
          }
        }
      }

      // If an item cannot be found in any store in this subset, the subset is invalid
      if (cheapestStoreId === null) {
        isSubsetValid = false;
        break;
      }

      assignments.push({
        itemId: listItem.itemId,
        amountNeeded: listItem.amountNeeded,
        storeId: cheapestStoreId,
        unitPrice: matchingDeal.price,
        originalPrice: matchingDeal.originalPrice,
        totalPrice: cheapestPrice,
        dealText: matchingDeal.dealText,
        dealType: matchingDeal.dealType,
        hasDeal: matchingDeal.hasDeal || matchingDeal.isLoyaltyApplied,
        isLoyaltyApplied: matchingDeal.isLoyaltyApplied
      });

      itemsCostSum += cheapestPrice;
    }

    if (!isSubsetValid) continue;

    // Calculate total travel cost for this subset
    let totalTravelCost = 0;
    subsetStoreIds.forEach(storeId => {
      totalTravelCost += travelCosts[storeId];
    });

    const totalTripCost = itemsCostSum + totalTravelCost;

    // If this is the cheapest trip combination so far, save it
    if (totalTripCost < minTotalCost) {
      minTotalCost = totalTripCost;
      bestPlan = {
        storesVisited: subset,
        assignments: assignments,
        itemsCost: itemsCostSum,
        travelCost: totalTravelCost,
        totalCost: totalTripCost
      };
    }
  }

  // 4. Calculate Single Store Baselines for comparison
  const singleStoreBaselines = [];
  activeStores.forEach(store => {
    let itemsCostSum = 0;
    const assignments = [];
    let isStoreValid = true;

    for (const listItem of itemsToBuy) {
      const itemStoreData = priceGrid[listItem.itemId]?.[store.id];
      if (itemStoreData && itemStoreData.price !== undefined) {
        const isLoyaltyLinked = travelSettings.loyaltyCards && travelSettings.loyaltyCards[store.id];
        const discountFactor = isLoyaltyLinked ? 0.95 : 1.00;

        const itemPrice = itemStoreData.price * listItem.amountNeeded * discountFactor;
        assignments.push({
          itemId: listItem.itemId,
          amountNeeded: listItem.amountNeeded,
          storeId: store.id,
          unitPrice: itemStoreData.price * discountFactor,
          originalPrice: itemStoreData.originalPrice,
          totalPrice: itemPrice,
          dealText: itemStoreData.dealText,
          dealType: itemStoreData.dealType,
          hasDeal: itemStoreData.hasDeal || isLoyaltyLinked,
          isLoyaltyApplied: isLoyaltyLinked
        });
        itemsCostSum += itemPrice;
      } else {
        isStoreValid = false;
        break;
      }
    }

    if (isStoreValid) {
      const travelCost = travelCosts[store.id];
      singleStoreBaselines.push({
        store: store,
        assignments: assignments,
        itemsCost: itemsCostSum,
        travelCost: travelCost,
        totalCost: itemsCostSum + travelCost
      });
    }
  });

  // Sort baselines by total cost (cheapest first)
  singleStoreBaselines.sort((a, b) => a.totalCost - b.totalCost);

  // 5. Calculate Savings
  let savings = 0;
  let comparisonText = '';
  if (singleStoreBaselines.length > 0 && bestPlan) {
    const cheapestSingleStore = singleStoreBaselines[0];
    savings = cheapestSingleStore.totalCost - bestPlan.totalCost;
    
    if (bestPlan.storesVisited.length === 1) {
      comparisonText = `Visiting only ${bestPlan.storesVisited[0].name} is your cheapest option.`;
    } else {
      comparisonText = `Splitting your trip between ${bestPlan.storesVisited.map(s => s.name).join(' & ')} saves you $${savings.toFixed(2)} compared to shopping only at ${cheapestSingleStore.store.name} (accounting for travel costs).`;
    }
  }

  return {
    success: true,
    optimalPlan: bestPlan,
    singleStoreBaselines: singleStoreBaselines,
    savings: Math.max(0, savings),
    comparisonText: comparisonText
  };
}
