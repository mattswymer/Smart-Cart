// Main Application Coordinator

import { STORES, GROCERY_ITEMS, RECIPES } from './database.js';
import { scrapeGroceryPrices } from './scraper.js';
import { optimizeShoppingBasket, calculateStoreTravelCost } from './optimizer.js';
import { initStaticUI, updateScraperStatus, renderBasket, renderRecipes, openRecipeModal, renderOptimizedList, resetScraperConsole, updateScraperProgress, addConsoleLog, renderLoyaltyCards, renderActiveMenu, renderPlannedRecipesTab, renderStoreCheckboxes, renderLocationDetails, updateLocationMap } from './ui.js';

// Global Application State
const state = {
  basket: {},              // { itemId: quantity }
  enabledStoreIds: [],     // Array of active store IDs
  priceGrid: null,         // Scraped price grid: { itemId: { storeId: { price... } } }
  lastScrapeTime: null,    // Date string of last scrape
  travelSettings: {
    useGasCalc: true,
    flatPenalty: 4.00,
    gasPrice: 3.45,
    carMpg: 25,
    timePenalty: 2.00,
    loyaltyCards: {
      walmart: false,
      kroger: false,
      publix: false,
      target: false,
      aldi: false,
      wholefoods: false,
      costco: false
    }
  },
  mealPlanRecipes: [],     // Selected recipes in active meal plan
  optimizedPlan: null,     // GBO Optimizer output
  recipeFilter: 'All',     // Active recipe category filter
  location: {
    lat: 33.7756,            // Default Atlanta, GA coordinates
    lon: -84.3853,
    address: 'Atlanta, GA (30309)',
    isLive: false,
    isLocating: false
  }
};

// DOM Elements
const btnScrapeTrigger = document.getElementById('btn-scrape-trigger');
const modalScraperConsole = document.getElementById('modal-scraper-console');
const btnCloseScraper = document.getElementById('btn-close-scraper');
const btnGenerateMeals = document.getElementById('btn-generate-meals');
const selectMealCount = document.getElementById('input-meal-count');
const btnClearBasket = document.getElementById('btn-clear-basket');
const btnOptimizeBasket = document.getElementById('btn-optimize-basket');
const btnParseTextarea = document.getElementById('btn-parse-textarea');
const textareaCustomList = document.getElementById('textarea-custom-list');
const toggleGasCalc = document.getElementById('toggle-gas-calc');
const inputGasPrice = document.getElementById('input-gas-price');
const inputCarMpg = document.getElementById('input-car-mpg');
const inputTimePenalty = document.getElementById('input-time-penalty');
const inputFlatPenalty = document.getElementById('input-flat-penalty');
const timePenaltyVal = document.getElementById('time-penalty-val');
const flatPenaltyVal = document.getElementById('flat-penalty-val');
const btnPrintList = document.getElementById('btn-print-list');
const statActiveDeals = document.getElementById('stat-active-deals');
const statActiveStores = document.getElementById('stat-active-stores');
const btnExportState = document.getElementById('btn-export-state');
const btnImportTrigger = document.getElementById('btn-import-trigger');
const inputImportState = document.getElementById('input-import-state');

/**
 * Initializes the application, loading state from localStorage and setting up listeners.
 */
document.addEventListener('DOMContentLoaded', () => {
  loadStateFromStorage();
  
  // Initialize static UI elements in sidebars
  initStaticUI({
    onStoreToggle: handleStoreToggle,
    onTagClick: handleAddBasketItem,
    onSuggestionClick: handleAddBasketItem
  });

  // Load active state values into inputs
  syncSettingsInputs();

  // Bind main event handlers
  bindEventHandlers();

  // Initial render
  refreshUI();
});

/**
 * Loads state from localStorage. Falls back to defaults.
 */
function loadStateFromStorage() {
  const savedState = localStorage.getItem('smart_cart_state');
  if (savedState) {
    try {
      const parsed = JSON.parse(savedState);
      state.basket = parsed.basket || {};
      state.enabledStoreIds = parsed.enabledStoreIds || STORES.filter(s => s.id !== 'costco').map(s => s.id);
      state.priceGrid = parsed.priceGrid || null;
      state.lastScrapeTime = parsed.lastScrapeTime || null;
      state.travelSettings = parsed.travelSettings || state.travelSettings;
      if (!state.travelSettings.loyaltyCards) {
        state.travelSettings.loyaltyCards = {
          walmart: false, kroger: false, publix: false, target: false, aldi: false, wholefoods: false, costco: false
        };
      }
      state.mealPlanRecipes = parsed.mealPlanRecipes || [];
      state.optimizedPlan = parsed.optimizedPlan || null;
      state.recipeFilter = parsed.recipeFilter || 'All';
      
      state.location = parsed.location || {
        lat: 33.7756,
        lon: -84.3853,
        address: 'Atlanta, GA (30309)',
        isLive: false,
        isLocating: false
      };
      state.location.isLocating = false;
      
      recalculateStoreDistances(state.location.lat, state.location.lon);
    } catch (e) {
      console.error('Error parsing saved state', e);
      loadDefaultState();
    }
  } else {
    loadDefaultState();
  }
}

/**
 * Sets initial default values.
 */
function loadDefaultState() {
  state.enabledStoreIds = STORES.filter(s => s.id !== 'costco').map(s => s.id);
  state.basket = {};
  state.priceGrid = null;
  state.lastScrapeTime = null;
  state.recipeFilter = 'All';
  state.travelSettings.loyaltyCards = {
    walmart: false, kroger: false, publix: false, target: false, aldi: false, wholefoods: false, costco: false
  };
  state.location = {
    lat: 33.7756,
    lon: -84.3853,
    address: 'Atlanta, GA (30309)',
    isLive: false,
    isLocating: false
  };
  recalculateStoreDistances(state.location.lat, state.location.lon);
}

/**
 * Saves current state to localStorage.
 */
function saveStateToStorage() {
  const dataToSave = {
    basket: state.basket,
    enabledStoreIds: state.enabledStoreIds,
    priceGrid: state.priceGrid,
    lastScrapeTime: state.lastScrapeTime,
    travelSettings: state.travelSettings,
    mealPlanRecipes: state.mealPlanRecipes,
    optimizedPlan: state.optimizedPlan,
    recipeFilter: state.recipeFilter,
    location: {
      lat: state.location.lat,
      lon: state.location.lon,
      address: state.location.address,
      isLive: state.location.isLive
    }
  };
  localStorage.setItem('smart_cart_state', JSON.stringify(dataToSave));
}

/**
 * Synchronizes DOM inputs with state.
 */
function syncSettingsInputs() {
  // Sync travel inputs
  toggleGasCalc.checked = state.travelSettings.useGasCalc;
  inputGasPrice.value = state.travelSettings.gasPrice;
  inputCarMpg.value = state.travelSettings.carMpg;
  inputTimePenalty.value = state.travelSettings.timePenalty;
  inputFlatPenalty.value = state.travelSettings.flatPenalty;

  // Set numeric labels
  timePenaltyVal.textContent = `$${parseFloat(state.travelSettings.timePenalty).toFixed(2)}`;
  flatPenaltyVal.textContent = `$${parseFloat(state.travelSettings.flatPenalty).toFixed(2)}`;

  toggleSettingsVisibility();
}

/**
 * Toggles travel settings sections in UI.
 */
function toggleSettingsVisibility() {
  const flatPanel = document.getElementById('flat-penalty-settings');
  const gasPanel = document.getElementById('gas-calc-settings');
  
  if (state.travelSettings.useGasCalc) {
    gasPanel.classList.remove('hidden');
    flatPanel.classList.add('hidden');
  } else {
    gasPanel.classList.add('hidden');
    flatPanel.classList.remove('hidden');
  }
}

/**
 * Binds main button clicks and inputs.
 */
function bindEventHandlers() {
  // Location detection
  const btnLocate = document.getElementById('btn-locate');
  if (btnLocate) {
    btnLocate.addEventListener('click', detectLiveLocation);
  }

  // Scraper Trigger buttons
  btnScrapeTrigger.addEventListener('click', runScraperWorkflow);
  
  // Shortcut buttons in empty views
  document.querySelectorAll('.btn-scrape-shortcut').forEach(btn => {
    btn.addEventListener('click', runScraperWorkflow);
  });

  // Close scraper terminal
  btnCloseScraper.addEventListener('click', () => {
    modalScraperConsole.close();
  });

  // Travel Settings controls
  toggleGasCalc.addEventListener('change', (e) => {
    state.travelSettings.useGasCalc = e.target.checked;
    toggleSettingsVisibility();
    saveStateToStorage();
    recalculateOptimizer();
  });

  const bindNumericSetting = (input, stateKey, parser = parseFloat) => {
    input.addEventListener('change', (e) => {
      state.travelSettings[stateKey] = parser(e.target.value);
      saveStateToStorage();
      recalculateOptimizer();
    });
  };

  bindNumericSetting(inputGasPrice, 'gasPrice');
  bindNumericSetting(inputCarMpg, 'carMpg', parseInt);
  
  inputTimePenalty.addEventListener('input', (e) => {
    state.travelSettings.timePenalty = parseFloat(e.target.value);
    timePenaltyVal.textContent = `$${state.travelSettings.timePenalty.toFixed(2)}`;
  });
  inputTimePenalty.addEventListener('change', () => {
    saveStateToStorage();
    recalculateOptimizer();
  });

  inputFlatPenalty.addEventListener('input', (e) => {
    state.travelSettings.flatPenalty = parseFloat(e.target.value);
    flatPenaltyVal.textContent = `$${state.travelSettings.flatPenalty.toFixed(2)}`;
  });
  inputFlatPenalty.addEventListener('change', () => {
    saveStateToStorage();
    recalculateOptimizer();
  });

  // Custom List items controls
  btnClearBasket.addEventListener('click', () => {
    state.basket = {};
    state.mealPlanRecipes = [];
    state.optimizedPlan = null;
    saveStateToStorage();
    refreshUI();
  });

  btnParseTextarea.addEventListener('click', handleParseTextarea);

  btnOptimizeBasket.addEventListener('click', () => {
    recalculateOptimizer();
    // Swap tab to Shopping List
    document.getElementById('tab-btn-list').click();
  });

  // Meal Planner control
  btnGenerateMeals.addEventListener('click', handleGenerateMeals);

  // Print button
  btnPrintList.addEventListener('click', () => {
    window.print();
  });

  // Clear Shopping List button on tab-list
  const btnClearList = document.getElementById('btn-clear-list');
  if (btnClearList) {
    btnClearList.addEventListener('click', () => {
      state.basket = {};
      state.mealPlanRecipes = [];
      state.optimizedPlan = null;
      saveStateToStorage();
      refreshUI();
    });
  }

  // Clear Planned Meals button on tab-planned
  const btnClearPlanned = document.getElementById('btn-clear-planned');
  if (btnClearPlanned) {
    btnClearPlanned.addEventListener('click', handleClearPlannedMeals);
  }

  // Backup Export/Import controls
  if (btnExportState) {
    btnExportState.addEventListener('click', exportStateToFile);
  }
  if (btnImportTrigger && inputImportState) {
    btnImportTrigger.addEventListener('click', () => {
      inputImportState.click();
    });
  }
  if (inputImportState) {
    inputImportState.addEventListener('change', importStateFromFile);
  }

  // Category filter pills click binding
  const categoryFilters = document.getElementById('recipe-category-filters');
  if (categoryFilters) {
    categoryFilters.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      
      // Update active styling
      categoryFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      
      state.recipeFilter = pill.dataset.category;
      saveStateToStorage();
      
      if (state.priceGrid) {
        renderRecipes(
          state.priceGrid,
          state.enabledStoreIds,
          handleMealAddIngredients,
          handleViewRecipeDetail,
          state.recipeFilter
        );
      }
    });
  }

  // Close recipe details modal close button
  const btnCloseRecipe = document.getElementById('btn-close-recipe');
  const modalRecipeDetail = document.getElementById('modal-recipe-detail');
  if (btnCloseRecipe && modalRecipeDetail) {
    btnCloseRecipe.addEventListener('click', () => {
      modalRecipeDetail.close();
    });
  }

  // Close recipe modal when clicking on the backdrop
  if (modalRecipeDetail) {
    modalRecipeDetail.addEventListener('click', (e) => {
      const dialogDimensions = modalRecipeDetail.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modalRecipeDetail.close();
      }
    });
  }

  // Close scraper modal when clicking on the backdrop
  if (modalScraperConsole && btnCloseScraper) {
    modalScraperConsole.addEventListener('click', (e) => {
      if (btnCloseScraper.disabled) return;
      const dialogDimensions = modalScraperConsole.getBoundingClientRect();
      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        modalScraperConsole.close();
      }
    });
  }
}

/**
 * Handles store checkbox click from UI callbacks.
 */
function handleStoreToggle(storeId, isChecked) {
  if (isChecked) {
    if (!state.enabledStoreIds.includes(storeId)) {
      state.enabledStoreIds.push(storeId);
    }
  } else {
    state.enabledStoreIds = state.enabledStoreIds.filter(id => id !== storeId);
  }
  
  saveStateToStorage();
  recalculateOptimizer();
  
  // Re-render recipes to update deal scores
  if (state.priceGrid) {
    renderRecipes(
      state.priceGrid,
      state.enabledStoreIds,
      handleMealAddIngredients,
      handleViewRecipeDetail,
      state.recipeFilter || 'All'
    );
  }
}

/**
 * Adds an item to the shopping basket list.
 */
function handleAddBasketItem(itemId) {
  if (state.basket[itemId]) {
    state.basket[itemId]++;
  } else {
    state.basket[itemId] = 1;
  }
  saveStateToStorage();
  refreshUI();
}

/**
 * Handles updating quantity controls inside the basket.
 */
function handleUpdateBasketQty(itemId, newQty) {
  if (newQty <= 0) {
    delete state.basket[itemId];
  } else {
    state.basket[itemId] = newQty;
  }
  saveStateToStorage();
  refreshUI();
}

/**
 * Parses textarea entries using fuzzy matches.
 */
function handleParseTextarea() {
  const text = textareaCustomList.value;
  if (!text.trim()) return;

  const lines = text.split('\n');
  let addedCount = 0;

  lines.forEach(line => {
    let cleanLine = line.toLowerCase().trim();
    if (!cleanLine) return;

    // 1. Extract quantity and clean item name
    let qty = 1;
    
    // Check parentheses at end, e.g. "black beans (2)" or "black beans ( 2 )"
    const parenMatch = cleanLine.match(/\(\s*(\d+)\s*\)$/);
    if (parenMatch) {
      qty = parseInt(parenMatch[1]);
      cleanLine = cleanLine.replace(/\(\s*(\d+)\s*\)$/, '').trim();
    } else {
      // Check multiplier at end, e.g. "black beans x2" or "black beans * 2" or "black beans - 2"
      const suffixMatch = cleanLine.match(/[\s*x\-]+(\d+)$/i);
      if (suffixMatch) {
        qty = parseInt(suffixMatch[1]);
        cleanLine = cleanLine.replace(/[\s*x\-]+(\d+)$/i, '').trim();
      } else {
        // Check multiplier at start, e.g. "2 black beans" or "2x black beans"
        const prefixMatch = cleanLine.match(/^(\d+)[\s*x\-]+/i);
        if (prefixMatch) {
          qty = parseInt(prefixMatch[1]);
          cleanLine = cleanLine.replace(/^(\d+)[\s*x\-]+/i, '').trim();
        }
      }
    }

    if (!cleanLine) return;

    // Fuzzy matching logic
    let bestMatch = null;
    let highestScore = 0;

    GROCERY_ITEMS.forEach(item => {
      const name = item.name.toLowerCase();
      let score = 0;

      // 1. Exact match
      if (name === cleanLine) {
        score = 100;
      }
      // 2. Substring match
      else if (name.includes(cleanLine) || cleanLine.includes(name)) {
        score = 70 + Math.abs(name.length - cleanLine.length) * -1; // penalize length difference
      } 
      // 3. Word-based overlaps
      else {
        const queryWords = cleanLine.split(/\s+/).filter(w => w.length > 2);
        const itemWords = name.split(/[\s()\-/,]+/).filter(w => w.length > 2);
        
        let exactMatches = 0;
        let partialMatches = 0;

        queryWords.forEach(qw => {
          if (itemWords.some(iw => iw === qw)) {
            exactMatches++;
          } else if (itemWords.some(iw => iw.includes(qw) || qw.includes(iw))) {
            partialMatches++;
          }
        });

        if (exactMatches > 0 || partialMatches > 0) {
          score = (exactMatches * 30 + partialMatches * 15) / (queryWords.length || 1);
        }
      }

      // Add a deal prioritization bonus (+15 points) if the item is currently on sale
      if (score > 0) {
        let hasActiveDeal = false;
        if (state.priceGrid && state.priceGrid[item.id]) {
          hasActiveDeal = Object.values(state.priceGrid[item.id]).some(d => d.hasDeal);
        }
        if (hasActiveDeal) {
          score += 15;
        }
      }

      if (score > highestScore && score > 10) {
        highestScore = score;
        bestMatch = item;
      }
    });

    if (bestMatch) {
      if (state.basket[bestMatch.id]) {
        state.basket[bestMatch.id] += qty;
      } else {
        state.basket[bestMatch.id] = qty;
      }
      addedCount += qty;
    }
  });

  textareaCustomList.value = '';
  
  if (addedCount > 0) {
    saveStateToStorage();
    refreshUI();
    recalculateOptimizer();
  }
}

/**
 * Removes a planned recipe and deducts its ingredients from the basket.
 */
function handleRemovePlannedRecipe(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return;

  // 1. Remove one instance of the recipe from active meal plans
  const idx = state.mealPlanRecipes.indexOf(recipeId);
  if (idx > -1) {
    state.mealPlanRecipes.splice(idx, 1);
  }

  // 2. Deduct ingredient amounts from the basket
  recipe.ingredients.forEach(ing => {
    const packs = Math.ceil(ing.amountNeeded);
    if (state.basket[ing.itemId]) {
      state.basket[ing.itemId] -= packs;
      if (state.basket[ing.itemId] <= 0) {
        delete state.basket[ing.itemId];
      }
    }
  });

  saveStateToStorage();
  refreshUI();
  recalculateOptimizer();
}

/**
 * Clears all planned meals and deducts their ingredients from the basket.
 */
function handleClearPlannedMeals() {
  state.mealPlanRecipes.forEach(recipeId => {
    const recipe = RECIPES.find(r => r.id === recipeId);
    if (recipe) {
      recipe.ingredients.forEach(ing => {
        const packs = Math.ceil(ing.amountNeeded);
        if (state.basket[ing.itemId]) {
          state.basket[ing.itemId] -= packs;
          if (state.basket[ing.itemId] <= 0) {
            delete state.basket[ing.itemId];
          }
        }
      });
    }
  });

  state.mealPlanRecipes = [];
  saveStateToStorage();
  refreshUI();
  recalculateOptimizer();
}

/**
 * Exports current shopping basket and optimizer settings to a JSON file.
 */
function exportStateToFile() {
  const savedState = localStorage.getItem('smart_cart_state') || JSON.stringify(state);
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(savedState);
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute("download", `smart_cart_backup_${timestamp}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Imports state from an uploaded JSON backup file.
 */
function importStateFromFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && typeof parsed === 'object') {
        // Hydrate state
        state.basket = parsed.basket || {};
        state.enabledStoreIds = parsed.enabledStoreIds || [];
        state.priceGrid = parsed.priceGrid || null;
        state.lastScrapeTime = parsed.lastScrapeTime || null;
        state.travelSettings = parsed.travelSettings || state.travelSettings;
        state.mealPlanRecipes = parsed.mealPlanRecipes || [];
        state.optimizedPlan = parsed.optimizedPlan || null;
        state.recipeFilter = parsed.recipeFilter || 'All';

        // Re-align default shopper card fields if missing
        if (!state.travelSettings.loyaltyCards) {
          state.travelSettings.loyaltyCards = {
            walmart: false, kroger: false, publix: false, target: false, aldi: false, wholefoods: false, costco: false
          };
        }

        saveStateToStorage();
        syncSettingsInputs();
        refreshUI();
        recalculateOptimizer();
        
        // Reset file field
        event.target.value = '';
        alert('Shopping list and settings successfully imported!');
      } else {
        alert('Invalid file format. Please upload a valid Smart Cart backup JSON.');
      }
    } catch (err) {
      console.error('Error importing backup:', err);
      alert('Failed to parse backup. Please upload a valid JSON file.');
    }
  };
  reader.readAsText(file);
}

/**
 * Runs the simulated scraper pipeline.
 */
async function runScraperWorkflow() {
  if (state.enabledStoreIds.length === 0) {
    alert('Please enable at least one store in the store preferences sidebar before scraping.');
    return;
  }

  // Open console dialog
  resetScraperConsole();
  modalScraperConsole.showModal();

  try {
    const resultGrid = await scrapeGroceryPrices(
      state.enabledStoreIds,
      (msg, type) => addConsoleLog(msg, type),
      (pct) => updateScraperProgress(pct)
    );

    // Save outputs
    state.priceGrid = resultGrid;
    state.lastScrapeTime = new Date().toLocaleDateString(undefined, { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    });
    saveStateToStorage();

    // Trigger updates
    refreshUI();
    recalculateOptimizer();

  } catch (e) {
    addConsoleLog(`❌ Fatal error in scraper logic: ${e.message}`, 'error');
    updateScraperProgress(100);
  }
}

/**
 * Compiles recipe ingredients and inserts them into the basket, tracking the recipe choice.
 */
function handleMealAddIngredients(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (!recipe) return;

  // Track the recipe ID
  state.mealPlanRecipes.push(recipeId);

  recipe.ingredients.forEach(ing => {
    // If the ingredient matches one of our standard grocery catalog items
    const quantityPackageMultiplier = Math.ceil(ing.amountNeeded); // buy whole packs
    
    if (state.basket[ing.itemId]) {
      state.basket[ing.itemId] += quantityPackageMultiplier;
    } else {
      state.basket[ing.itemId] = quantityPackageMultiplier;
    }
  });

  saveStateToStorage();
  refreshUI();
  recalculateOptimizer();
}

/**
 * Opens details modal for a recipe.
 */
function handleViewRecipeDetail(recipeId) {
  const recipe = RECIPES.find(r => r.id === recipeId);
  if (recipe && state.priceGrid) {
    openRecipeModal(
      recipe,
      state.priceGrid,
      state.enabledStoreIds,
      handleMealAddIngredients
    );
  }
}

/**
 * Creates X meals from the active recipes sorted by best deals.
 */
function handleGenerateMeals() {
  if (!state.priceGrid) return;

  const count = parseInt(selectMealCount.value);
  
  // 1. Recompute score for all recipes
  const scored = RECIPES.map(recipe => {
    let dealsMatched = 0;
    recipe.ingredients.forEach(ing => {
      let bestDeal = null;
      state.enabledStoreIds.forEach(storeId => {
        const storeData = state.priceGrid[ing.itemId]?.[storeId];
        if (storeData && storeData.price < (bestDeal?.price || Infinity)) {
          bestDeal = storeData;
        }
      });
      if (bestDeal && bestDeal.hasDeal) {
        dealsMatched++;
      }
    });
    // calculate match score
    const score = Math.min(99, 45 + Math.round((dealsMatched / recipe.ingredients.length) * 50) + (dealsMatched * 5));
    return { ...recipe, score };
  });

  // 2. Sort by score
  scored.sort((a, b) => b.score - a.score);

  // 3. Take top X
  const topRecipes = scored.slice(0, count);
  
  // 4. Wipe active basket and load all ingredients from these meals!
  state.basket = {};
  state.mealPlanRecipes = [];
  
  topRecipes.forEach(recipe => {
    state.mealPlanRecipes.push(recipe.id);
    recipe.ingredients.forEach(ing => {
      // buy whole packages
      const packs = Math.ceil(ing.amountNeeded);
      if (state.basket[ing.itemId]) {
        state.basket[ing.itemId] += packs;
      } else {
        state.basket[ing.itemId] = packs;
      }
    });
  });

  saveStateToStorage();
  refreshUI();
  recalculateOptimizer();

  // Swap to shopping list tab
  document.getElementById('tab-btn-list').click();
}

/**
 * Runs Global Basket Optimizer algorithm on current basket.
 */
function recalculateOptimizer() {
  const basketItemIds = Object.keys(state.basket);
  
  if (basketItemIds.length === 0 || !state.priceGrid || state.enabledStoreIds.length === 0) {
    state.optimizedPlan = null;
    saveStateToStorage();
    renderOptimizedList(null, []);
    return;
  }

  // Format basket items for optimizer: [{ itemId, amountNeeded }]
  const itemsToBuy = basketItemIds.map(id => ({
    itemId: id,
    amountNeeded: state.basket[id]
  }));

  // Fetch enabled store objects
  const activeStores = STORES.filter(s => state.enabledStoreIds.includes(s.id));

  // Run optimization
  const results = optimizeShoppingBasket(
    itemsToBuy,
    state.priceGrid,
    activeStores,
    state.travelSettings
  );

  state.optimizedPlan = results;
  saveStateToStorage();
  
  // Render results
  renderOptimizedList(results, state.enabledStoreIds, state.priceGrid);
}

/**
 * Re-renders the dynamic sections of the UI.
 */
function refreshUI() {
  const isScraped = !!state.priceGrid;
  updateScraperStatus(isScraped, state.lastScrapeTime);

  // Render location details & update/initialize map
  renderLocationDetails(state.location);
  updateLocationMap(state.location.lat, state.location.lon, STORES);

  // Render store preferences (checkboxes list) in sidebar
  renderStoreCheckboxes(state.enabledStoreIds, handleStoreToggle);

  // Render basket sidebar list
  renderBasket(state.basket, {
    onUpdateQty: handleUpdateBasketQty
  });

  // Render recipes grid
  if (isScraped) {
    renderRecipes(
      state.priceGrid,
      state.enabledStoreIds,
      handleMealAddIngredients,
      handleViewRecipeDetail,
      state.recipeFilter || 'All'
    );
  }

  // Sync category filter pills active styles
  const categoryFilters = document.getElementById('recipe-category-filters');
  if (categoryFilters) {
    categoryFilters.querySelectorAll('.filter-pill').forEach(pill => {
      if (pill.dataset.category.toLowerCase() === (state.recipeFilter || 'All').toLowerCase()) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // Render optimized checklist
  if (state.optimizedPlan) {
    renderOptimizedList(state.optimizedPlan, state.enabledStoreIds, state.priceGrid);
  } else {
    recalculateOptimizer();
  }

  // Render store shopper loyalty cards
  renderLoyaltyCards(state.travelSettings.loyaltyCards, handleLoyaltyToggle);

  // Render active menu chips on optimized list
  renderActiveMenu(state.mealPlanRecipes, handleRemovePlannedRecipe);

  // Render planned recipes tab content
  renderPlannedRecipesTab(state.mealPlanRecipes, state.priceGrid, state.enabledStoreIds, handleRemovePlannedRecipe, handleViewRecipeDetail);

  // Update quick stats panel
  updateQuickStats();
}

/**
 * Refreshes values inside the Optimization Stats sidebar card.
 */
function updateQuickStats() {
  statActiveStores.textContent = state.enabledStoreIds.length;
  
  let dealsCount = 0;
  if (state.priceGrid) {
    Object.keys(state.priceGrid).forEach(itemId => {
      state.enabledStoreIds.forEach(storeId => {
        if (state.priceGrid[itemId]?.[storeId]?.hasDeal) {
          dealsCount++;
        }
      });
    });
  }
  statActiveDeals.textContent = dealsCount;
}

/**
 * Toggles a loyalty card linking status.
 */
function handleLoyaltyToggle(storeId, isLinked) {
  if (!state.travelSettings.loyaltyCards) {
    state.travelSettings.loyaltyCards = {};
  }
  state.travelSettings.loyaltyCards[storeId] = isLinked;
  saveStateToStorage();
  recalculateOptimizer();
}

/**
 * Triggers geolocation search and reverse-geocodes the coordinates using Nominatim.
 */
function detectLiveLocation() {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    return;
  }

  state.location.isLocating = true;
  renderLocationDetails(state.location);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      state.location.lat = lat;
      state.location.lon = lon;
      state.location.isLive = true;

      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`);
        if (response.ok) {
          const data = await response.json();
          const address = data.address || {};
          const city = address.city || address.town || address.village || address.suburb || '';
          const stateName = address.state || '';
          const postcode = address.postcode || '';
          
          let addressString = '';
          if (city && stateName) {
            addressString = `${city}, ${stateName}`;
            if (postcode) {
              addressString += ` (${postcode})`;
            }
          } else {
            addressString = data.display_name ? data.display_name.split(',').slice(0, 2).join(',').trim() : `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
          }
          state.location.address = addressString;
        } else {
          state.location.address = `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        }
      } catch (err) {
        console.error('Error reverse geocoding:', err);
        state.location.address = `Coordinates: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
      }

      state.location.isLocating = false;
      
      // Update store distances
      recalculateStoreDistances(lat, lon);
      
      // Save state
      saveStateToStorage();
      
      // Refresh UI, re-run GBO optimizer
      refreshUI();
      recalculateOptimizer();
    },
    (error) => {
      console.error('Geolocation error:', error);
      let errMsg = 'Failed to retrieve your location.';
      if (error.code === error.PERMISSION_DENIED) {
        errMsg = 'Location permission denied. Please enable location sharing in your browser settings.';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errMsg = 'Location info is unavailable.';
      } else if (error.code === error.TIMEOUT) {
        errMsg = 'Location request timed out.';
      }
      alert(errMsg);
      state.location.isLocating = false;
      renderLocationDetails(state.location);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

/**
 * Calculates store distances using the Haversine formula based on coordinate offsets.
 */
function recalculateStoreDistances(userLat, userLon) {
  const R = 3958.8; // Radius of Earth in miles
  
  STORES.forEach(store => {
    const storeLat = userLat + (store.latOffset || 0);
    const storeLon = userLon + (store.lonOffset || 0);

    const dLat = (storeLat - userLat) * Math.PI / 180;
    const dLon = (storeLon - userLon) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(userLat * Math.PI / 180) * Math.cos(storeLat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const oneWayDistance = R * c;

    // Double the distance for round trip as used in GBO travel surcharge calculations
    store.distanceMiles = parseFloat((2 * oneWayDistance).toFixed(1));
  });
}
