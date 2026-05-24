// UI Rendering and DOM Manipulation Module

import { STORES, GROCERY_ITEMS, RECIPES } from './database.js';

// DOM Element Selectors
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const storeCheckboxesContainer = document.getElementById('store-checkboxes-container');
const popularItemsTags = document.getElementById('popular-items-tags');
const searchSuggestions = document.getElementById('search-suggestions');
const inputSearchItem = document.getElementById('input-search-item');
const textareaCustomList = document.getElementById('textarea-custom-list');
const basketCount = document.getElementById('basket-count');
const basketEmptyView = document.getElementById('basket-empty-view');
const basketItemsContainer = document.getElementById('basket-items-container');
const basketActions = document.getElementById('basket-actions');
const recipesResultsGrid = document.getElementById('recipes-results-grid');
const mealsPromptScrape = document.getElementById('meals-prompt-scrape');
const finderPromptScrape = document.getElementById('finder-prompt-scrape');
const finderContentLayout = document.getElementById('finder-content-layout');
const listEmptyView = document.getElementById('list-empty-view');
const optimizerResultsLayout = document.getElementById('optimizer-results-layout');
const gboSummaryBlock = document.getElementById('gbo-summary-block');
const storeListsWrapper = document.getElementById('store-lists-wrapper');
const baselinesComparisonList = document.getElementById('baselines-comparison-list');
const gboConsolidationAlert = document.getElementById('gbo-consolidation-alert');
const listCountBadge = document.getElementById('list-count-badge');

// Console Elements
const scraperConsoleBox = document.getElementById('scraper-console-box');
const scraperProgressBar = document.getElementById('scraper-progress-bar');
const scraperProgressPercentage = document.getElementById('scraper-progress-percentage');
const btnCloseScraper = document.getElementById('btn-close-scraper');

// Modals
const modalRecipeDetail = document.getElementById('modal-recipe-detail');
const recipeModalContent = document.getElementById('recipe-modal-content');

/**
 * Initializes static UI elements (stores sidebar, popular tags, and tabs).
 */
export function initStaticUI(callbacks) {
  // 1. Render Popular Staples tags
  renderPopularTags(callbacks.onTagClick);

  // 2. Setup autocomplete listeners
  setupAutocomplete(callbacks.onSuggestionClick);

  // 3. Tab switching
  setupTabs();
}

/**
 * Updates the scraper status banner in the header.
 */
export function updateScraperStatus(isReady, dateString = '') {
  const categoryFilters = document.getElementById('recipe-category-filters');
  if (isReady) {
    statusDot.className = 'status-dot ready';
    statusText.textContent = `Live Prices Active (${dateString})`;
    // Hide scrape banners
    mealsPromptScrape.classList.add('hidden');
    recipesResultsGrid.classList.remove('hidden');
    if (categoryFilters) categoryFilters.classList.remove('hidden');
    finderPromptScrape.classList.add('hidden');
    finderContentLayout.classList.remove('hidden');
  } else {
    statusDot.className = 'status-dot pulsing';
    statusText.textContent = 'Scrape Required for Current Prices';
    // Show scrape banners
    mealsPromptScrape.classList.remove('hidden');
    recipesResultsGrid.classList.add('hidden');
    if (categoryFilters) categoryFilters.classList.add('hidden');
    finderPromptScrape.classList.remove('hidden');
    finderContentLayout.classList.add('hidden');
  }
}

/**
 * Renders the store toggle checkbox cards in the sidebar.
 */
export function renderStoreCheckboxes(enabledStoreIds, onToggle) {
  storeCheckboxesContainer.innerHTML = '';
  STORES.forEach(store => {
    const isChecked = enabledStoreIds.includes(store.id);
    
    const card = document.createElement('div');
    card.className = `store-checkbox-card ${isChecked ? 'checked' : ''}`;
    card.id = `store-card-${store.id}`;
    card.style.borderLeft = `4px solid ${store.color}`;

    card.innerHTML = `
      <div class="store-cb-info">
        <span class="store-logo-badge" style="background-color: ${store.color}">${store.logo}</span>
        <div class="store-cb-details">
          <h3>${store.name}</h3>
          <p>📍 ${store.distanceMiles} miles (Round Trip)</p>
        </div>
      </div>
      <div class="store-cb-control">
        <input type="checkbox" id="store-cb-${store.id}" ${isChecked ? 'checked' : ''}>
      </div>
    `;

    // Event listener for card click
    card.addEventListener('click', (e) => {
      const checkbox = card.querySelector('input[type="checkbox"]');
      // If they clicked the checkbox itself, don't double toggle
      if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
      }
      
      if (checkbox.checked) {
        card.classList.add('checked');
      } else {
        card.classList.remove('checked');
      }
      
      onToggle(store.id, checkbox.checked);
    });

    storeCheckboxesContainer.appendChild(card);
  });
}

/**
 * Renders popular item tags for quick addition.
 */
function renderPopularTags(onTagClick) {
  const popularIds = ['milk', 'eggs', 'chicken_breast', 'spinach', 'avocado', 'apples', 'potatoes', 'pasta', 'bacon', 'strawberries'];
  const popularItems = GROCERY_ITEMS.filter(item => popularIds.includes(item.id));
  
  popularItemsTags.innerHTML = '';
  popularItems.forEach(item => {
    const tag = document.createElement('button');
    tag.className = 'quick-add-tag';
    tag.textContent = `+ ${item.name.split(' (')[0]}`;
    tag.addEventListener('click', () => onTagClick(item.id));
    popularItemsTags.appendChild(tag);
  });
}

/**
 * Sets up the auto-complete search inputs.
 */
function setupAutocomplete(onSelect) {
  inputSearchItem.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (query.length < 2) {
      searchSuggestions.classList.add('hidden');
      return;
    }

    const matches = GROCERY_ITEMS.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length === 0) {
      searchSuggestions.classList.add('hidden');
      return;
    }

    searchSuggestions.innerHTML = '';
    matches.forEach(item => {
      const div = document.createElement('div');
      div.className = 'suggestion-item';
      div.textContent = `${item.name} (${item.category})`;
      div.addEventListener('click', () => {
        inputSearchItem.value = '';
        searchSuggestions.classList.add('hidden');
        onSelect(item.id);
      });
      searchSuggestions.appendChild(div);
    });

    searchSuggestions.classList.remove('hidden');
  });

  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box-container')) {
      searchSuggestions.classList.add('hidden');
    }
  });
}

/**
 * Handles switching tabs in the main interface.
 */
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons and panels
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      // Add active to current
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

/**
 * Renders the custom grocery list items in the Basket card.
 */
export function renderBasket(basket, callbacks) {
  const itemIds = Object.keys(basket);
  basketCount.textContent = itemIds.reduce((sum, id) => sum + basket[id], 0);

  if (itemIds.length === 0) {
    basketEmptyView.classList.remove('hidden');
    basketItemsContainer.classList.add('hidden');
    basketActions.classList.add('hidden');
    return;
  }

  basketEmptyView.classList.add('hidden');
  basketItemsContainer.classList.remove('hidden');
  basketActions.classList.remove('hidden');

  basketItemsContainer.innerHTML = '';
  itemIds.forEach(itemId => {
    const item = GROCERY_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const quantity = basket[itemId];

    const row = document.createElement('div');
    row.className = 'basket-item';
    row.innerHTML = `
      <div class="basket-item-info">
        <span class="basket-item-name">${item.name}</span>
        <span class="basket-item-category">${item.category}</span>
      </div>
      <div class="basket-item-controls">
        <div class="quantity-control">
          <button class="btn-qty btn-minus" data-id="${itemId}">-</button>
          <span class="qty-val">${quantity}</span>
          <button class="btn-qty btn-plus" data-id="${itemId}">+</button>
        </div>
        <button class="btn-delete-item" data-id="${itemId}" aria-label="Remove item">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
        </button>
      </div>
    `;

    // Event bindings
    row.querySelector('.btn-minus').addEventListener('click', () => callbacks.onUpdateQty(itemId, quantity - 1));
    row.querySelector('.btn-plus').addEventListener('click', () => callbacks.onUpdateQty(itemId, quantity + 1));
    row.querySelector('.btn-delete-item').addEventListener('click', () => callbacks.onUpdateQty(itemId, 0));

    basketItemsContainer.appendChild(row);
  });
}

/**
 * Computes a "Deal Score" and price breakdown for a recipe based on current prices.
 * Returns { score: number, estimatedPrice: number, storeDeals: Array }
 */
function calculateRecipeScore(recipe, priceGrid, enabledStoreIds) {
  let dealsMatched = 0;
  let totalPriceCheapest = 0;
  const storeDeals = [];

  recipe.ingredients.forEach(ing => {
    let cheapestItemPrice = Infinity;
    let bestDeal = null;
    let bestStoreName = '';

    enabledStoreIds.forEach(storeId => {
      const storeData = priceGrid[ing.itemId]?.[storeId];
      if (storeData) {
        const cost = storeData.price * ing.amountNeeded;
        if (cost < cheapestItemPrice) {
          cheapestItemPrice = cost;
          bestDeal = storeData;
          bestStoreName = STORES.find(s => s.id === storeId)?.name || '';
        }
      }
    });

    if (cheapestItemPrice !== Infinity) {
      totalPriceCheapest += cheapestItemPrice;
      if (bestDeal && bestDeal.hasDeal) {
        dealsMatched++;
        storeDeals.push({
          storeName: bestStoreName,
          dealType: bestDeal.dealType,
          dealText: bestDeal.dealText
        });
      }
    }
  });

  // Score is percentage of ingredients that are active deals (or just average discount)
  // Let's model it as a value: base score 50 + 10 points per active deal (cap at 99)
  const score = Math.min(99, 45 + Math.round((dealsMatched / recipe.ingredients.length) * 50) + (dealsMatched * 5));

  return {
    score: score,
    estimatedPrice: totalPriceCheapest,
    dealsCount: dealsMatched,
    storeDeals: storeDeals.slice(0, 2) // show top 2
  };
}

/**
 * Renders the recipe cards list matched against current deals.
 */
export function renderRecipes(priceGrid, enabledStoreIds, onAddIngredients, onViewRecipe, categoryFilter = 'All') {
  recipesResultsGrid.innerHTML = '';
  
  if (!priceGrid) return;

  // 1. Calculate scores and match recipes
  let filteredRecipes = RECIPES;
  if (categoryFilter && categoryFilter !== 'All') {
    filteredRecipes = RECIPES.filter(r => r.category.toLowerCase() === categoryFilter.toLowerCase());
  }

  const scoredRecipes = filteredRecipes.map(recipe => {
    const stats = calculateRecipeScore(recipe, priceGrid, enabledStoreIds);
    return { ...recipe, ...stats };
  });

  // 2. Sort by Deal Score descending (highest deals first)
  scoredRecipes.sort((a, b) => b.score - a.score);

  // 3. Render cards
  scoredRecipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    
    // Create deal tags html
    let dealsHtml = '';
    recipe.storeDeals.forEach(deal => {
      const badgeClass = `badge-${deal.dealType}`;
      dealsHtml += `<span class="shopping-item-deal-badge ${badgeClass}" style="font-size: 0.65rem; margin-right: 0.25rem">${deal.storeName} Deal</span>`;
    });

    card.innerHTML = `
      <div class="recipe-img-container">
        <img class="recipe-img" src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <span class="recipe-tag">${recipe.category}</span>
        <span class="recipe-score-badge">🔥 Deal Match: ${recipe.score}%</span>
      </div>
      <div class="recipe-card-content">
        <h3>${recipe.name}</h3>
        <p>${recipe.description}</p>
        
        <div class="recipe-details-row">
          <div class="recipe-detail-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>${recipe.prepTime} prep</span>
          </div>
          <div class="recipe-detail-stat">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            <span>Est: $${recipe.estimatedPrice.toFixed(2)}</span>
          </div>
        </div>

        <div class="recipe-card-actions">
          <button class="btn btn-secondary btn-sm btn-view-recipe">Details</button>
          <button class="btn btn-primary btn-sm btn-add-recipe-items">
            Add Ingredients
          </button>
        </div>
      </div>
    `;

    // Hook events
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-add-recipe-items')) return;
      onViewRecipe(recipe.id);
    });
    card.querySelector('.btn-add-recipe-items').addEventListener('click', (e) => {
      e.stopPropagation();
      onAddIngredients(recipe.id);
    });

    recipesResultsGrid.appendChild(card);
  });
}

/**
 * Opens and renders the details modal for a single recipe.
 */
export function openRecipeModal(recipe, priceGrid, enabledStoreIds, onAddIngredients) {
  const stats = calculateRecipeScore(recipe, priceGrid, enabledStoreIds);
  
  recipeModalContent.innerHTML = `
    <div class="recipe-modal-hero">
      <img src="${recipe.image}" alt="${recipe.name}">
      <div class="recipe-modal-title-overlay">
        <div>
          <span class="recipe-tag">${recipe.category}</span>
          <h2>${recipe.name}</h2>
        </div>
      </div>
    </div>
    <div class="recipe-modal-info-block">
      <div class="recipe-modal-stats-bar">
        <div class="recipe-modal-stat-item">
          <span>Prep Time</span>
          <span>${recipe.prepTime}</span>
        </div>
        <div class="recipe-modal-stat-item">
          <span>Cook Time</span>
          <span>${recipe.cookTime}</span>
        </div>
        <div class="recipe-modal-stat-item">
          <span>Servings</span>
          <span>${recipe.servings} people</span>
        </div>
        <div class="recipe-modal-stat-item">
          <span>Est. Ingredients Cost</span>
          <span style="color: var(--secondary)">$${stats.estimatedPrice.toFixed(2)}</span>
        </div>
      </div>

      <div class="recipe-modal-grid">
        <!-- Ingredients List -->
        <div class="recipe-modal-ingredients">
          <h3>Ingredients</h3>
          <div class="recipe-modal-ingredients-list">
            ${recipe.ingredients.map(ing => {
              const item = GROCERY_ITEMS.find(i => i.id === ing.itemId);
              const name = item ? item.name : ing.itemId;
              return `
                <div class="recipe-ingredient-row">
                  <span class="recipe-ing-name">${name}</span>
                  <span class="recipe-ing-qty">${ing.quantity}</span>
                </div>
              `;
            }).join('')}
          </div>
          <button class="btn btn-primary w-full btn-modal-add-ingredients" style="margin-top: 1.5rem">
            Add Ingredients to Shopping List
          </button>
        </div>

        <!-- Instructions -->
        <div class="recipe-modal-instructions">
          <h3>Directions</h3>
          <p>${recipe.instructions}</p>
        </div>
      </div>
    </div>
  `;

  // Bind add button
  recipeModalContent.querySelector('.btn-modal-add-ingredients').addEventListener('click', () => {
    onAddIngredients(recipe.id);
    modalRecipeDetail.close();
  });

  modalRecipeDetail.showModal();
}

/**
 * Renders the mathematically optimized shopping list results page.
 */
export function renderOptimizedList(optimizedResults, enabledStoreIds, priceGrid) {
  if (!optimizedResults || !optimizedResults.success || !optimizedResults.optimalPlan) {
    listEmptyView.classList.remove('hidden');
    optimizerResultsLayout.classList.add('hidden');
    listCountBadge.classList.add('hidden');
    return;
  }

  listEmptyView.classList.add('hidden');
  optimizerResultsLayout.classList.remove('hidden');

  const plan = optimizedResults.optimalPlan;
  
  // Show list count badge on navigation tab
  listCountBadge.textContent = plan.assignments.length;
  listCountBadge.classList.remove('hidden');

  // 1. Render GBO Summary Card
  const singleStoreWord = plan.storesVisited.length === 1 ? 'store' : 'stores';
  gboSummaryBlock.innerHTML = `
    <div class="gbo-summary-content">
      <div>
        <h3 style="font-size: 1.25rem; font-family: var(--font-display); margin-bottom: 0.25rem;">Optimal Shopping Plan Found!</h3>
        <p class="gbo-comparison-text">
          ${optimizedResults.comparisonText}
        </p>
      </div>
      <div class="gbo-stats-summary">
        <div class="gbo-summary-stat">
          <span class="gbo-stat-val cheapest">$${plan.totalCost.toFixed(2)}</span>
          <span class="gbo-stat-lbl">Grand Total (with travel)</span>
        </div>
        <div class="gbo-summary-stat">
          <span class="gbo-stat-val">${plan.storesVisited.length}</span>
          <span class="gbo-stat-lbl">Recommended Visited</span>
        </div>
        ${optimizedResults.savings > 0 ? `
          <div class="gbo-summary-stat">
            <span class="gbo-badge-savings">Saved $${optimizedResults.savings.toFixed(2)}</span>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // 2. Render Store Split Lists (Left Side)
  storeListsWrapper.innerHTML = '';
  
  // Group assignments by store
  const storeGroups = {};
  plan.storesVisited.forEach(store => {
    storeGroups[store.id] = {
      store: store,
      items: []
    };
  });

  plan.assignments.forEach(itemDetails => {
    if (storeGroups[itemDetails.storeId]) {
      storeGroups[itemDetails.storeId].items.push(itemDetails);
    }
  });

  // Render a list card for each store visited
  plan.storesVisited.forEach(store => {
    const group = storeGroups[store.id];
    const storeTravelCost = optimizedResults.singleStoreBaselines.find(b => b.store.id === store.id)?.travelCost || 0;
    const storeItemsSubtotal = group.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const storeGrandTotal = storeItemsSubtotal + storeTravelCost;

    const card = document.createElement('div');
    card.className = 'card store-list-card';
    card.style.borderLeft = `5px solid ${store.color}`;

    card.innerHTML = `
      <div class="store-list-header">
        <div class="store-list-title-block">
          <span class="store-logo-badge" style="background-color: ${store.color}; font-size: 0.95rem; width: 32px; height: 32px;">${store.logo}</span>
          <div>
            <h3>${store.name} Shopping List</h3>
            <span class="store-list-sub">📍 ${store.distanceMiles} miles • Travel Cost: $${storeTravelCost.toFixed(2)}</span>
          </div>
        </div>
        <div class="store-list-total">
          $${storeGrandTotal.toFixed(2)}
          <span>Subtotal: $${storeItemsSubtotal.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="shopping-items-table">
        ${group.items.map(itemDetails => {
          const item = GROCERY_ITEMS.find(i => i.id === itemDetails.itemId);
          const name = item ? item.name : itemDetails.itemId;
          
          let priceHtml = '';
          if (itemDetails.hasDeal) {
            priceHtml = `
              <span class="shopping-item-original-price">$${(itemDetails.originalPrice * itemDetails.amountNeeded).toFixed(2)}</span>
              <span class="shopping-item-price-val" style="color: var(--secondary)">$${itemDetails.totalPrice.toFixed(2)}</span>
            `;
          } else {
            priceHtml = `<span class="shopping-item-price-val">$${itemDetails.totalPrice.toFixed(2)}</span>`;
          }

          let badgeHtml = '';
          if (itemDetails.isLoyaltyApplied) {
            badgeHtml = `<span class="shopping-item-deal-badge badge-bogo" style="background-color: var(--secondary); font-size: 0.65rem;">💳 Card -5%</span>`;
          } else if (itemDetails.hasDeal) {
            badgeHtml = `<span class="shopping-item-deal-badge badge-${itemDetails.dealType}">${itemDetails.dealText}</span>`;
          }

          return `
            <div class="shopping-item-row">
              <label class="shopping-item-checkbox-label">
                <input type="checkbox">
                <span>${name}</span>
              </label>
              <span class="shopping-item-qty">Qty: ${itemDetails.amountNeeded}</span>
              <div class="shopping-item-pricing">
                ${badgeHtml}
                <div class="price-figures">
                  ${priceHtml}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    storeListsWrapper.appendChild(card);
  });

  // 3. Render Single Store Baselines Comparison (Right Side Table)
  baselinesComparisonList.innerHTML = '';
  optimizedResults.singleStoreBaselines.forEach(baseline => {
    const row = document.createElement('div');
    row.className = `baseline-row ${baseline.store.id === plan.storesVisited[0].id && plan.storesVisited.length === 1 ? 'cheapest' : ''}`;
    
    row.innerHTML = `
      <div class="baseline-store-info">
        <span class="store-logo-badge" style="background-color: ${baseline.store.color}; width: 22px; height: 22px; font-size: 0.7rem">${baseline.store.logo}</span>
        <div>
          <h4>${baseline.store.name}</h4>
          <span>Subtotal: $${baseline.itemsCost.toFixed(2)}</span>
        </div>
      </div>
      <div class="baseline-price-info">
        <div class="baseline-price-total">$${baseline.totalCost.toFixed(2)}</div>
        <div class="baseline-price-sub">incl. travel ($${baseline.travelCost.toFixed(2)})</div>
      </div>
    `;

    baselinesComparisonList.appendChild(row);
  });

  // 4. Render Consolidation Alert / Explanations
  gboConsolidationAlert.innerHTML = '';
  
  // Compute how many items were NOT split to other stores because of travel penalty
  let splitItemsCount = 0;
  let consolidatedItemsCount = 0;
  
  // Find which items could have been cheaper elsewhere if travel cost was 0
  plan.assignments.forEach(itemDetails => {
    let absoluteCheapestStore = itemDetails.storeId;
    let absoluteCheapestPrice = itemDetails.unitPrice;
    
    enabledStoreIds.forEach(storeId => {
      const storeData = priceGrid[itemDetails.itemId]?.[storeId];
      if (storeData && storeData.price < absoluteCheapestPrice) {
        absoluteCheapestPrice = storeData.price;
        absoluteCheapestStore = storeId;
      }
    });

    if (absoluteCheapestStore !== itemDetails.storeId) {
      consolidatedItemsCount++;
    } else if (plan.storesVisited.length > 1) {
      splitItemsCount++;
    }
  });

  if (consolidatedItemsCount > 0) {
    gboConsolidationAlert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <p>
        <strong>Surcharge Consolidation Active:</strong> The GBO algorithm consolidated <strong>${consolidatedItemsCount} items</strong> to already-visited stores. Although these items were slightly cheaper at other stores, the price difference was less than the travel/gas cost to drive there. You saved time and driving costs!
      </p>
    `;
    gboConsolidationAlert.classList.remove('hidden');
  } else if (plan.storesVisited.length > 1) {
    gboConsolidationAlert.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
      <p>
        <strong>Multi-Store Splitting Profitable:</strong> Visiting multiple stores is mathematically optimal for your list. The price savings on the split items outweigh the travel surcharge by <strong>$${optimizedResults.savings.toFixed(2)}</strong>.
      </p>
    `;
    gboConsolidationAlert.classList.remove('hidden');
  } else {
    gboConsolidationAlert.classList.add('hidden');
  }
}

/**
 * Adds log output to the scraper terminal box in the modal.
 */
export function addConsoleLog(message, type = 'info') {
  const line = document.createElement('div');
  line.className = `console-line ${type}`;
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  
  scraperConsoleBox.appendChild(line);
  // Auto-scroll to bottom of console
  scraperConsoleBox.scrollTop = scraperConsoleBox.scrollHeight;
}

/**
 * Resets the scraper console progress bar and lines.
 */
export function resetScraperConsole() {
  scraperConsoleBox.innerHTML = '';
  scraperProgressBar.style.width = '0%';
  scraperProgressPercentage.textContent = '0% Completed';
  btnCloseScraper.disabled = true;
  btnCloseScraper.textContent = 'Scraping in progress...';
}

/**
 * Updates the scraper progress bar and percentage display.
 */
export function updateScraperProgress(percent) {
  scraperProgressBar.style.width = `${percent}%`;
  scraperProgressPercentage.textContent = `${percent}% Completed`;
  
  if (percent === 100) {
    btnCloseScraper.disabled = false;
    btnCloseScraper.textContent = 'Close Console';
  }
}

/**
 * Renders store shopper loyalty cards inside the sidebar settings panel.
 */
export function renderLoyaltyCards(loyaltyCardsState, onToggle) {
  const container = document.getElementById('loyalty-cards-container');
  if (!container) return;

  container.innerHTML = '';
  STORES.forEach(store => {
    let detailText = 'Unlock coupons';
    if (store.id === 'kroger') detailText = 'Kroger Plus (Extra 5% off)';
    else if (store.id === 'target') detailText = 'Target Circle ID (Extra 5% off)';
    else if (store.id === 'publix') detailText = 'Publix Club (Extra 5% off)';
    else if (store.id === 'wholefoods') detailText = 'Amazon Prime Linked (Extra 5% off)';
    else if (store.id === 'walmart') detailText = 'Walmart+ Account (Extra 5% off)';
    else if (store.id === 'costco') detailText = 'Costco Membership (Extra 5% off)';
    else if (store.id === 'aldi') detailText = 'Aldi Saver (Extra 5% off)';

    const isLinked = !!loyaltyCardsState[store.id];
    
    const card = document.createElement('div');
    card.className = `loyalty-card-item ${isLinked ? 'linked' : ''}`;
    card.id = `loyalty-card-${store.id}`;

    card.innerHTML = `
      <div class="store-cb-info">
        <span class="store-logo-badge" style="background-color: ${store.color}">${store.logo}</span>
        <div class="loyalty-card-details">
          <h3>${store.name} Card</h3>
          <p>${detailText}</p>
        </div>
      </div>
      <div class="loyalty-card-control">
        <input type="checkbox" id="loyalty-cb-${store.id}" ${isLinked ? 'checked' : ''}>
      </div>
    `;

    card.addEventListener('click', (e) => {
      const cb = card.querySelector('input[type="checkbox"]');
      if (e.target !== cb) {
        cb.checked = !cb.checked;
      }
      
      if (cb.checked) {
        card.classList.add('linked');
      } else {
        card.classList.remove('linked');
      }
      
      onToggle(store.id, cb.checked);
    });

    container.appendChild(card);
  });
}

/**
 * Renders planned recipes chips at the top of the shopping list.
 */
export function renderActiveMenu(mealPlanRecipes, onRemoveRecipe) {
  const container = document.getElementById('card-active-menu');
  const chipsContainer = document.getElementById('active-meals-chips-container');
  if (!container || !chipsContainer) return;

  if (!mealPlanRecipes || mealPlanRecipes.length === 0) {
    container.classList.add('hidden');
    return;
  }

  container.classList.remove('hidden');
  chipsContainer.innerHTML = '';

  // Aggregate duplicate recipe choices to show quantities (e.g. Chicken Fajitas x2)
  const counts = {};
  mealPlanRecipes.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });

  Object.keys(counts).forEach(recipeId => {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    const count = counts[recipeId];
    const chip = document.createElement('div');
    chip.className = 'meal-chip';

    chip.innerHTML = `
      <img class="meal-chip-img" src="${recipe.image}" alt="${recipe.name}">
      <span>${recipe.name} ${count > 1 ? `<strong>x${count}</strong>` : ''}</span>
      <button class="btn-remove-meal" data-id="${recipeId}" aria-label="Remove recipe">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    chip.querySelector('.btn-remove-meal').addEventListener('click', (e) => {
      e.stopPropagation();
      onRemoveRecipe(recipeId);
    });

    chipsContainer.appendChild(chip);
  });
}

/**
 * Renders full recipe cards for the planned meals inside the "My Planned Meals" tab.
 */
export function renderPlannedRecipesTab(mealPlanRecipes, priceGrid, enabledStoreIds, onRemoveRecipe, onViewRecipe) {
  const emptyView = document.getElementById('planned-meals-empty-view');
  const wrapper = document.getElementById('planned-recipes-wrapper');
  if (!emptyView || !wrapper) return;

  if (!mealPlanRecipes || mealPlanRecipes.length === 0) {
    emptyView.classList.remove('hidden');
    wrapper.classList.add('hidden');
    return;
  }

  emptyView.classList.add('hidden');
  wrapper.classList.remove('hidden');
  wrapper.innerHTML = '';

  // Aggregate duplicate recipe choices to show quantities (e.g. Chicken Fajitas x2)
  const counts = {};
  mealPlanRecipes.forEach(id => {
    counts[id] = (counts[id] || 0) + 1;
  });

  Object.keys(counts).forEach(recipeId => {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (!recipe) return;

    const count = counts[recipeId];
    const card = document.createElement('article');
    card.className = 'recipe-card planned-recipe-card';

    // Build ingredients list items
    const ingListHtml = recipe.ingredients.map(ing => {
      const item = GROCERY_ITEMS.find(i => i.id === ing.itemId);
      const name = item ? item.name : ing.itemId;
      const totalQtyNeeded = (ing.amountNeeded * count).toFixed(2).replace(/\.00$/, '');
      const unit = item ? item.unit : '';
      return `<li style="margin-bottom: 0.25rem;">${name}: <strong>${totalQtyNeeded}</strong> ${unit}</li>`;
    }).join('');

    card.innerHTML = `
      <div class="recipe-img-container">
        <img class="recipe-img" src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <span class="recipe-tag">${recipe.category}</span>
        ${count > 1 ? `<span class="recipe-score-badge" style="background: linear-gradient(135deg, var(--secondary), hsl(160, 84%, 48%)); border-color: var(--secondary)">x${count} Planned</span>` : ''}
      </div>
      <div class="recipe-card-content">
        <h3>${recipe.name}</h3>
        <p style="margin-bottom: 0.75rem;">${recipe.description}</p>
        
        <div class="planned-recipe-ingredients" style="margin-bottom: 1rem; font-size: 0.8rem; border-top: 1px solid var(--border-color); padding-top: 0.75rem;">
          <h4 style="font-size: 0.85rem; margin-bottom: 0.4rem; color: var(--text-main);">Required Ingredients (x${count}):</h4>
          <ul style="padding-left: 1.1rem; color: var(--text-muted); line-height: 1.45; list-style-type: disc;">
            ${ingListHtml}
          </ul>
        </div>

        <div class="recipe-card-actions" style="margin-top: auto;">
          <button class="btn btn-secondary btn-sm btn-view-recipe" style="flex: 1;">Details</button>
          <button class="btn btn-secondary btn-sm btn-remove-recipe-items" style="border-color: var(--danger); color: var(--danger); flex: 1;">
            Remove Meal
          </button>
        </div>
      </div>
    `;

    // Hook events
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-remove-recipe-items')) return;
      onViewRecipe(recipe.id);
    });

    card.querySelector('.btn-remove-recipe-items').addEventListener('click', (e) => {
      e.stopPropagation();
      onRemoveRecipe(recipe.id);
    });

    wrapper.appendChild(card);
  });
}

/**
 * Global Leaflet map and marker instances.
 */
let leafletMap = null;
let userMarker = null;
let storeMarkers = [];

/**
 * Updates the Location details display, including button state.
 */
export function renderLocationDetails(locationState) {
  const labelAddress = document.getElementById('label-current-address');
  const btnLocate = document.getElementById('btn-locate');
  if (labelAddress) {
    labelAddress.textContent = locationState.address || 'Atlanta, GA (30309)';
  }
  if (btnLocate) {
    if (locationState.isLocating) {
      btnLocate.disabled = true;
      btnLocate.textContent = 'Locating...';
    } else {
      btnLocate.disabled = false;
      btnLocate.textContent = 'Detect Live';
    }
  }
}

/**
 * Initializes the Leaflet map and centers on user location coordinates.
 */
export function initLocationMap(userLat, userLon, stores) {
  const mapContainer = document.getElementById('location-map');
  if (!mapContainer) return;

  if (typeof L === 'undefined') {
    console.warn('Leaflet is not loaded yet.');
    return;
  }

  if (leafletMap) {
    leafletMap.setView([userLat, userLon], 11);
    updateLocationMap(userLat, userLon, stores);
    return;
  }

  leafletMap = L.map('location-map', {
    zoomControl: false,
    attributionControl: false
  }).setView([userLat, userLon], 11);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(leafletMap);

  updateLocationMap(userLat, userLon, stores);
}

/**
 * Redraws markers on the Leaflet map and centers it.
 */
export function updateLocationMap(userLat, userLon, stores) {
  if (!leafletMap) {
    initLocationMap(userLat, userLon, stores);
    return;
  }

  leafletMap.setView([userLat, userLon], 11);

  // Update user marker
  const userIcon = L.divIcon({
    className: 'user-location-marker',
    html: `<div style="background-color: #0071dc; border: 2px solid white; width: 12px; height: 12px; border-radius: 50%; box-shadow: 0 0 8px rgba(0,113,220,0.6); position: relative;"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
  });

  if (userMarker) {
    userMarker.setLatLng([userLat, userLon]);
  } else {
    userMarker = L.marker([userLat, userLon], { icon: userIcon }).addTo(leafletMap);
    userMarker.bindPopup('<b style="color:#0071dc;">Your Location</b>');
  }

  // Remove existing store markers
  storeMarkers.forEach(marker => leafletMap.removeLayer(marker));
  storeMarkers = [];

  // Add new store markers
  stores.forEach(store => {
    const storeLat = userLat + (store.latOffset || 0);
    const storeLon = userLon + (store.lonOffset || 0);

    const storeIcon = L.divIcon({
      className: 'store-location-marker',
      html: `<div style="background-color: ${store.color}; border: 1.5px solid white; width: 10px; height: 10px; border-radius: 50%; box-shadow: 0 0 6px rgba(0,0,0,0.5);"></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5]
    });

    const marker = L.marker([storeLat, storeLon], { icon: storeIcon }).addTo(leafletMap);
    marker.bindPopup(`
      <div style="font-family: var(--font-sans); font-size: 0.8rem; line-height: 1.4; color: var(--text-main);">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
          <span style="background-color: ${store.color}; color: white; border-radius: 4px; padding: 2px 6px; font-weight: bold; font-size: 0.75rem;">${store.logo}</span>
          <strong style="color: ${store.color}; font-size: 0.85rem;">${store.name}</strong>
        </div>
        <div>📍 ${store.distanceMiles} miles (Round Trip)</div>
      </div>
    `);
    storeMarkers.push(marker);
  });
}
