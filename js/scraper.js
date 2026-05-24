// Simulated price scraper engine

import { STORES, GROCERY_ITEMS } from './database.js';

/**
 * Simulates scraping grocery prices for the enabled stores.
 * Generates realistic price grids with randomized weekly deals (BOGOs, Coupons, Rollbacks).
 * Outputs progress logs asynchronously to populate the scraper console.
 * 
 * @param {Array<string>} enabledStoreIds - List of store IDs enabled by the user.
 * @param {Function} onLog - Callback function for scraper console logs.
 * @param {Function} onProgress - Callback function for progress percentage (0 - 100).
 * @returns {Promise<Object>} The scraped price database.
 */
export async function scrapeGroceryPrices(enabledStoreIds, onLog, onProgress) {
  const activeStores = STORES.filter(s => enabledStoreIds.includes(s.id));
  
  onLog('🔌 Starting local grocery price scraper...', 'system');
  await sleep(300);
  onProgress(5);

  onLog(`⚙️ Configurations loaded. Active stores: ${activeStores.map(s => s.name).join(', ')}`, 'system');
  await sleep(400);
  onProgress(10);

  const priceGrid = {};
  let progressStep = 10;
  const progressPerStore = 80 / Math.max(1, activeStores.length);

  for (const store of activeStores) {
    onLog(`📡 Connecting to ${store.name} web endpoint...`, 'info');
    await sleep(250 + Math.random() * 250);

    onLog(`🔍 Scraping category pages for ${store.name} (Produce, Meat, Dairy, Pantry)...`, 'info');
    await sleep(300 + Math.random() * 300);

    let dealsCount = 0;
    
    // Process each grocery item for this store
    for (const item of GROCERY_ITEMS) {
      // 1. Calculate base price with store multiplier
      const storeMultiplier = store.baseMultiplier;
      // Add a tiny random daily fluctuation (-4% to +4%)
      const dailyFluctuation = 0.96 + Math.random() * 0.08;
      
      const baselinePrice = item.basePrice * storeMultiplier * dailyFluctuation;
      let finalPrice = baselinePrice;
      let originalPrice = baselinePrice;
      let dealType = null;
      let dealText = '';

      // 2. Generate randomized promotional deals based on store traits
      const roll = Math.random();

      if (store.id === 'publix' && roll < 0.14) {
        // Publix BOGO deals (50% unit savings for simplicity)
        dealType = 'bogo';
        dealText = 'BOGO Free';
        finalPrice = baselinePrice * 0.50;
        dealsCount++;
      } else if (store.id === 'kroger' && roll < 0.16) {
        // Kroger Digital Coupon deals (20% to 40% off)
        const discountPercent = selectRandom([20, 25, 30, 40]);
        dealType = 'coupon';
        dealText = `Save ${discountPercent}% with Digital Coupon`;
        finalPrice = baselinePrice * (1 - discountPercent / 100);
        dealsCount++;
      } else if (store.id === 'target' && roll < 0.12) {
        // Target Circle deals (15% to 25% off)
        const discountPercent = selectRandom([15, 20, 25]);
        dealType = 'target_circle';
        dealText = `${discountPercent}% Off Circle Offer`;
        finalPrice = baselinePrice * (1 - discountPercent / 100);
        dealsCount++;
      } else if (store.id === 'walmart' && roll < 0.15) {
        // Walmart Rollbacks (8% to 20% off)
        const discountPercent = selectRandom([10, 12, 15, 20]);
        dealType = 'rollback';
        dealText = `Rollback! Save ${discountPercent}%`;
        finalPrice = baselinePrice * (1 - discountPercent / 100);
        dealsCount++;
      } else if (store.id === 'aldi' && roll < 0.10) {
        // Aldi Finds (15% to 30% off, limited time)
        const discountPercent = selectRandom([15, 20, 25, 30]);
        dealType = 'aldi_find';
        dealText = `Aldi Finds! Save ${discountPercent}%`;
        finalPrice = baselinePrice * (1 - discountPercent / 100);
        dealsCount++;
      } else if (store.id === 'wholefoods' && roll < 0.15) {
        // Whole Foods Prime Member deals (10% to 20% off)
        const discountPercent = selectRandom([10, 15, 20]);
        dealType = 'prime';
        dealText = `Prime Member Deal: -${discountPercent}%`;
        finalPrice = baselinePrice * (1 - discountPercent / 100);
        dealsCount++;
      } else if (store.id === 'costco' && roll < 0.12) {
        // Costco Member Savings
        const instantSavings = selectRandom([1.50, 2.00, 3.00, 4.00]);
        // Only apply if the item price is reasonably larger than the savings
        if (baselinePrice > instantSavings + 1) {
          dealType = 'member_saving';
          dealText = `$${instantSavings.toFixed(2)} Instant Member Saving`;
          finalPrice = baselinePrice - instantSavings;
          dealsCount++;
        }
      }

      // Round to 2 decimal places
      finalPrice = Math.round(finalPrice * 100) / 100;
      originalPrice = Math.round(originalPrice * 100) / 100;

      // Store in price grid
      if (!priceGrid[item.id]) {
        priceGrid[item.id] = {};
      }
      
      priceGrid[item.id][store.id] = {
        price: finalPrice,
        originalPrice: originalPrice,
        dealType: dealType,
        dealText: dealText,
        hasDeal: !!dealType
      };
    }

    const totalStoreItems = Math.floor(180 + Math.random() * 50);
    onLog(`✅ Connected. Scraped ${totalStoreItems} active listings from ${store.name}. Found ${dealsCount} weekly deals.`, 'success');
    progressStep += progressPerStore;
    onProgress(Math.min(90, Math.round(progressStep)));
    await sleep(200);
  }

  onLog('📊 Indexing scraped price points and running coupon catalog matching...', 'system');
  await sleep(400);
  onProgress(95);

  onLog('✨ Scraping completed successfully! Price database updated.', 'success');
  onProgress(100);
  
  return priceGrid;
}

// Helper to wait a given duration
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to pick random item from array
function selectRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
