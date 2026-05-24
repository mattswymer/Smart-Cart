// Database of grocery stores, items, and recipes

export const STORES = [
  {
    id: 'walmart',
    name: 'Walmart',
    color: '#0071dc',
    logo: 'W',
    baseMultiplier: 0.90,
    distanceMiles: 3.5,
    latOffset: 0.021,
    lonOffset: -0.032,
    slogan: 'Everyday Low Prices',
    description: 'Consistently the lowest baseline prices, but fewer specialty sales.',
    dealsStyle: 'Rollback'
  },
  {
    id: 'kroger',
    name: 'Kroger',
    color: '#002f6c',
    logo: 'K',
    baseMultiplier: 1.00,
    distanceMiles: 4.8,
    latOffset: -0.035,
    lonOffset: 0.024,
    slogan: 'Fresh Food, Low Prices',
    description: 'Great digital coupons and loyalty card discounts.',
    dealsStyle: 'Digital Coupon'
  },
  {
    id: 'publix',
    name: 'Publix',
    color: '#318b40',
    logo: 'P',
    baseMultiplier: 1.15,
    distanceMiles: 2.2,
    latOffset: 0.012,
    lonOffset: 0.015,
    slogan: 'Where Shopping is a Pleasure',
    description: 'Excellent Buy-One-Get-One (BOGO) weekly deals, though regular prices are higher.',
    dealsStyle: 'BOGO Deal'
  },
  {
    id: 'target',
    name: 'Target',
    color: '#cc0000',
    logo: 'T',
    baseMultiplier: 1.05,
    distanceMiles: 5.2,
    latOffset: 0.042,
    lonOffset: -0.045,
    slogan: 'Expect More. Pay Less.',
    description: 'Good store brand items and Cartwheel savings circle deals.',
    dealsStyle: 'Target Circle'
  },
  {
    id: 'aldi',
    name: 'Aldi',
    color: '#002c5b',
    logo: 'A',
    baseMultiplier: 0.82,
    distanceMiles: 6.5,
    latOffset: -0.048,
    lonOffset: -0.025,
    slogan: 'Like Brands, Only Cheaper',
    description: 'Extremely cheap baseline prices on produce, meat, and private label pantry goods.',
    dealsStyle: 'Aldi Finds'
  },
  {
    id: 'wholefoods',
    name: 'Whole Foods',
    color: '#006738',
    logo: 'WF',
    baseMultiplier: 1.30,
    distanceMiles: 7.8,
    latOffset: -0.025,
    lonOffset: 0.048,
    slogan: 'Whole Foods, Whole People',
    description: 'Premium organic selection, with Amazon Prime member deals on select items.',
    dealsStyle: 'Prime Savings'
  },
  {
    id: 'costco',
    name: 'Costco',
    color: '#e21936',
    logo: 'C',
    baseMultiplier: 0.78, // Very low unit cost
    distanceMiles: 14.5,
    latOffset: 0.115,
    lonOffset: -0.138,
    slogan: 'Savings in Bulk',
    description: 'Requires membership. Low unit price but requires bulk purchases and a longer drive.',
    dealsStyle: 'Member Only'
  }
];

export const GROCERY_ITEMS = [
  // --- Produce ---
  { id: 'apples', name: 'Apples (3lb bag)', category: 'Produce', basePrice: 4.49, unit: 'bag' },
  { id: 'bananas', name: 'Bananas (per lb)', category: 'Produce', basePrice: 0.59, unit: 'lb' },
  { id: 'spinach', name: 'Fresh Spinach (8oz)', category: 'Produce', basePrice: 2.99, unit: 'bag' },
  { id: 'broccoli', name: 'Broccoli Crowns (per lb)', category: 'Produce', basePrice: 1.89, unit: 'lb' },
  { id: 'tomatoes', name: 'Roma Tomatoes (per lb)', category: 'Produce', basePrice: 1.49, unit: 'lb' },
  { id: 'bellpeppers', name: 'Bell Peppers / Green Peppers (3-pack)', category: 'Produce', basePrice: 3.29, unit: 'pack' },
  { id: 'onions', name: 'Yellow Onions (3lb bag)', category: 'Produce', basePrice: 2.79, unit: 'bag' },
  { id: 'potatoes', name: 'Russet Potatoes (5lb bag)', category: 'Produce', basePrice: 3.99, unit: 'bag' },
  { id: 'garlic', name: 'Garlic (3-pack)', category: 'Produce', basePrice: 1.29, unit: 'pack' },
  { id: 'avocado', name: 'Avocados (each)', category: 'Produce', basePrice: 0.99, unit: 'each' },
  { id: 'strawberries', name: 'Strawberries (1lb)', category: 'Produce', basePrice: 3.49, unit: 'clamshell' },
  { id: 'carrots', name: 'Baby Carrots (1lb bag)', category: 'Produce', basePrice: 1.39, unit: 'bag' },
  { id: 'cucumbers', name: 'English Cucumber', category: 'Produce', basePrice: 1.19, unit: 'each' },
  { id: 'lemons', name: 'Lemons (per bag)', category: 'Produce', basePrice: 2.99, unit: 'bag' },
  { id: 'lettuce', name: 'Romaine Hearts (3-pack)', category: 'Produce', basePrice: 3.29, unit: 'pack' },
  { id: 'asparagus', name: 'Fresh Asparagus (per lb)', category: 'Produce', basePrice: 2.99, unit: 'lb' },
  { id: 'sweetpotatoes', name: 'Sweet Potatoes (per lb)', category: 'Produce', basePrice: 0.99, unit: 'lb' },
  { id: 'cherrytomatoes', name: 'Cherry Tomatoes (10oz)', category: 'Produce', basePrice: 2.49, unit: 'pint' },
  { id: 'mushrooms', name: 'Sliced White Mushrooms (8oz)', category: 'Produce', basePrice: 2.19, unit: 'pack' },
  { id: 'cilantro', name: 'Fresh Cilantro Bunch', category: 'Produce', basePrice: 0.79, unit: 'bunch' },

  // --- Meat & Seafood ---
  { id: 'chicken_breast', name: 'Chicken Breast (per lb)', category: 'Meat & Seafood', basePrice: 3.99, unit: 'lb' },
  { id: 'ground_beef', name: 'Ground Beef 80/20 (per lb)', category: 'Meat & Seafood', basePrice: 4.99, unit: 'lb' },
  { id: 'salmon_fillet', name: 'Atlantic Salmon Fillet (per lb)', category: 'Meat & Seafood', basePrice: 9.99, unit: 'lb' },
  { id: 'ribeye_steak', name: 'Ribeye Steak (per lb)', category: 'Meat & Seafood', basePrice: 14.99, unit: 'lb' },
  { id: 'shrimp', name: 'Raw Shrimp 31/40 count (1lb)', category: 'Meat & Seafood', basePrice: 8.99, unit: 'bag' },
  { id: 'pork_chops', name: 'Boneless Pork Chops (per lb)', category: 'Meat & Seafood', basePrice: 3.49, unit: 'lb' },
  { id: 'turkey_breast', name: 'Deli Sliced Turkey (1lb)', category: 'Meat & Seafood', basePrice: 7.99, unit: 'pack' },
  { id: 'bacon', name: 'Sliced Bacon (12oz)', category: 'Meat & Seafood', basePrice: 5.49, unit: 'pack' },
  { id: 'sausage', name: 'Italian Sausage Links (19oz)', category: 'Meat & Seafood', basePrice: 4.89, unit: 'pack' },
  { id: 'canned_tuna', name: 'Chunk Light Tuna (5oz can)', category: 'Meat & Seafood', basePrice: 1.09, unit: 'can' },

  // --- Dairy & Eggs ---
  { id: 'milk', name: 'Whole Milk (Gallon)', category: 'Dairy & Eggs', basePrice: 3.69, unit: 'gallon' },
  { id: 'butter', name: 'Salted Butter (4 quarters, 1lb)', category: 'Dairy & Eggs', basePrice: 3.99, unit: 'pack' },
  { id: 'eggs', name: 'Large Grade A Eggs (Dozen)', category: 'Dairy & Eggs', basePrice: 2.79, unit: 'carton' },
  { id: 'cheddar_cheese', name: 'Shredded Cheddar Cheese (8oz)', category: 'Dairy & Eggs', basePrice: 2.49, unit: 'bag' },
  { id: 'greek_yogurt', name: 'Greek Yogurt (32oz)', category: 'Dairy & Eggs', basePrice: 4.99, unit: 'tub' },
  { id: 'cream_cheese', name: 'Cream Cheese Bar (8oz)', category: 'Dairy & Eggs', basePrice: 2.29, unit: 'block' },
  { id: 'sour_cream', name: 'Sour Cream (16oz)', category: 'Dairy & Eggs', basePrice: 2.19, unit: 'tub' },
  { id: 'mozzarella', name: 'Shredded Mozzarella Cheese (8oz)', category: 'Dairy & Eggs', basePrice: 2.49, unit: 'bag' },
  { id: 'parm_cheese', name: 'Grated Parmesan (8oz)', category: 'Dairy & Eggs', basePrice: 3.49, unit: 'shaker' },

  // --- Pantry staples ---
  { id: 'rice', name: 'Jasmine Rice (5lb bag)', category: 'Pantry', basePrice: 6.99, unit: 'bag' },
  { id: 'pasta', name: 'Spaghetti Pasta (16oz)', category: 'Pantry', basePrice: 1.29, unit: 'box' },
  { id: 'olive_oil', name: 'Extra Virgin Olive Oil (16.9oz)', category: 'Pantry', basePrice: 7.99, unit: 'bottle' },
  { id: 'canned_tomatoes', name: 'Diced Tomatoes (14.5oz can)', category: 'Pantry', basePrice: 0.99, unit: 'can' },
  { id: 'black_beans', name: 'Canned Black Beans (15oz)', category: 'Pantry', basePrice: 0.89, unit: 'can' },
  { id: 'chickpeas', name: 'Canned Chickpeas (15oz)', category: 'Pantry', basePrice: 0.89, unit: 'can' },
  { id: 'peanut_butter', name: 'Creamy Peanut Butter (16oz)', category: 'Pantry', basePrice: 2.49, unit: 'jar' },
  { id: 'honey', name: 'Pure Honey (12oz)', category: 'Pantry', basePrice: 3.99, unit: 'bottle' },
  { id: 'chicken_broth', name: 'Chicken Broth (32oz)', category: 'Pantry', basePrice: 1.89, unit: 'carton' },
  { id: 'flour', name: 'All Purpose Flour (5lb bag)', category: 'Pantry', basePrice: 2.89, unit: 'bag' },
  { id: 'sugar', name: 'Granulated Sugar (4lb bag)', category: 'Pantry', basePrice: 2.99, unit: 'bag' },
  { id: 'oats', name: 'Old Fashioned Oats (18oz)', category: 'Pantry', basePrice: 2.69, unit: 'canister' },
  { id: 'quinoa', name: 'Organic Quinoa (1lb)', category: 'Pantry', basePrice: 3.49, unit: 'bag' },
  { id: 'soy_sauce', name: 'Soy Sauce (15oz)', category: 'Pantry', basePrice: 2.29, unit: 'bottle' },
  { id: 'breadcrumbs', name: 'Panko Breadcrumbs (8oz)', category: 'Pantry', basePrice: 1.79, unit: 'canister' },
  { id: 'tomato_paste', name: 'Tomato Paste (6oz can)', category: 'Pantry', basePrice: 0.79, unit: 'can' },
  { id: 'coconut_milk', name: 'Coconut Milk (13.6oz can)', category: 'Pantry', basePrice: 1.89, unit: 'can' },
  { id: 'curry_paste', name: 'Red Curry Paste (4oz jar)', category: 'Pantry', basePrice: 2.49, unit: 'jar' },
  { id: 'marinara', name: 'Marinara Pasta Sauce (24oz jar)', category: 'Pantry', basePrice: 2.49, unit: 'jar' },
  { id: 'pesto', name: 'Basil Pesto Sauce (8oz jar)', category: 'Pantry', basePrice: 3.49, unit: 'jar' },
  { id: 'salsa', name: 'Medium Salsa (16oz jar)', category: 'Pantry', basePrice: 2.29, unit: 'jar' },
  { id: 'maple_syrup', name: 'Pure Maple Syrup (8oz)', category: 'Pantry', basePrice: 5.99, unit: 'bottle' },
  { id: 'tomato_soup', name: 'Condensed Tomato Soup (10oz can)', category: 'Pantry', basePrice: 1.19, unit: 'can' },

  // --- Bakery ---
  { id: 'sourdough', name: 'Fresh Sourdough Bread (loaf)', category: 'Bakery', basePrice: 3.99, unit: 'loaf' },
  { id: 'wheat_bread', name: 'Whole Wheat Bread (loaf)', category: 'Bakery', basePrice: 2.29, unit: 'loaf' },
  { id: 'tortillas', name: 'Flour Tortillas (8-count)', category: 'Bakery', basePrice: 1.99, unit: 'pack' },
  { id: 'burger_buns', name: 'Hamburger Buns (8-count)', category: 'Bakery', basePrice: 1.89, unit: 'pack' },

  // --- Snacks & Beverages ---
  { id: 'coffee', name: 'Ground Coffee (12oz)', category: 'Snacks & Beverages', basePrice: 6.99, unit: 'bag' },
  { id: 'tea', name: 'Green Tea Bags (20-count)', category: 'Snacks & Beverages', basePrice: 2.49, unit: 'box' },
  { id: 'orange_juice', name: 'Orange Juice (52oz)', category: 'Snacks & Beverages', basePrice: 3.89, unit: 'bottle' },
  { id: 'mixed_nuts', name: 'Salted Mixed Nuts (10oz)', category: 'Snacks & Beverages', basePrice: 4.99, unit: 'canister' },
  { id: 'tortilla_chips', name: 'Tortilla Chips (13oz bag)', category: 'Snacks & Beverages', basePrice: 2.99, unit: 'bag' },
  { id: 'dark_chocolate', name: 'Dark Chocolate Bar (3.5oz)', category: 'Snacks & Beverages', basePrice: 2.49, unit: 'each' },
  { id: 'potato_chips', name: 'Potato Chips (Classic 13oz)', category: 'Snacks & Beverages', basePrice: 3.99, unit: 'bag' },
  { id: 'beef_broth', name: 'Beef Broth (32oz)', category: 'Pantry', basePrice: 1.99, unit: 'carton' },
  { id: 'cereal', name: 'Honey Nut Cereal (10.8oz)', category: 'Pantry', basePrice: 3.49, unit: 'box' },
  { id: 'chicken_thighs', name: 'Chicken Thighs (per lb)', category: 'Meat & Seafood', basePrice: 2.49, unit: 'lb' },
  { id: 'chili_beans', name: 'Chili Beans (15oz)', category: 'Pantry', basePrice: 1.19, unit: 'can' },
  { id: 'chili_powder', name: 'Chili Powder (2.5oz)', category: 'Pantry', basePrice: 2.29, unit: 'bottle' },
  { id: 'cinnamon_rolls', name: 'Cinnamon Rolls (5-count)', category: 'Bakery', basePrice: 3.49, unit: 'pack' },
  { id: 'diaper_bags', name: 'Diaper Bags (Pack of 40)', category: 'Household', basePrice: 12.99, unit: 'box' },
  { id: 'dishwasher_soap', name: 'Dishwasher Soap Pacs (20-count)', category: 'Household', basePrice: 5.99, unit: 'pack' },
  { id: 'fairlife_milk', name: 'Fairlife Ultra-Filtered Milk (52oz)', category: 'Dairy & Eggs', basePrice: 4.79, unit: 'bottle' },
  { id: 'frozen_pizza', name: 'Frozen Pepperoni Pizza', category: 'Pantry', basePrice: 5.99, unit: 'each' },
  { id: 'mixed_fruit', name: 'Mixed Fruit Salad Cups (4-pack)', category: 'Produce', basePrice: 3.29, unit: 'pack' },
  { id: 'green_beans', name: 'Fresh Green Beans (1lb)', category: 'Produce', basePrice: 1.99, unit: 'bag' },
  { id: 'mac_cheese', name: 'Macaroni and Cheese Box (7.25oz)', category: 'Pantry', basePrice: 1.29, unit: 'box' },
  { id: 'mini_muffins', name: 'Mini Chocolate Muffins (12-count)', category: 'Bakery', basePrice: 4.29, unit: 'box' },
  { id: 'snack_packs', name: 'Pudding Snack Packs (4-pack)', category: 'Snacks & Beverages', basePrice: 1.89, unit: 'pack' },
  { id: 'fruit_snacks', name: 'Fruit Snacks (10-count)', category: 'Snacks & Beverages', basePrice: 2.99, unit: 'box' },
  { id: 'sundried_tomatoes', name: 'Sun-dried Tomatoes (8oz jar)', category: 'Pantry', basePrice: 3.79, unit: 'jar' },
  { id: 'toilet_paper', name: 'Ultra Soft Toilet Paper (6-roll)', category: 'Household', basePrice: 6.49, unit: 'pack' }
];

export const RECIPES = [
  {
    id: 'chicken_fajitas',
    name: 'Chicken Fajitas',
    category: 'Poultry',
    prepTime: '15 min',
    cookTime: '15 min',
    servings: 4,
    description: 'Sizzling bell peppers, onions, and perfectly spiced chicken wrapped in warm flour tortillas.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'bellpeppers', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'onions', quantity: '1 bag', amountNeeded: 0.33 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 },
      { itemId: 'tortillas', quantity: '1 pack', amountNeeded: 1 }
    ],
    instructions: '1. Slice chicken, peppers, and onions into strips.\n2. Heat olive oil in a skillet and cook chicken with fajita spices until browned.\n3. Add peppers and onions, sautéing until tender-crisp.\n4. Warm tortillas and serve hot.',
    image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'shrimp_scampi',
    name: 'Garlic Butter Shrimp Scampi',
    category: 'Seafood',
    prepTime: '10 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Plump shrimp sautéed in a rich garlic, butter, and white wine sauce tossed with spaghetti.',
    ingredients: [
      { itemId: 'shrimp', quantity: '1 bag', amountNeeded: 1 },
      { itemId: 'pasta', quantity: '1 box', amountNeeded: 0.5 },
      { itemId: 'butter', quantity: '4 tbsp', amountNeeded: 0.25 },
      { itemId: 'garlic', quantity: '3 cloves', amountNeeded: 0.33 },
      { itemId: 'lemons', quantity: '1 bag', amountNeeded: 0.25 },
      { itemId: 'olive_oil', quantity: '1 tbsp', amountNeeded: 0.05 }
    ],
    instructions: '1. Boil spaghetti according to box instructions.\n2. In a large pan, melt butter and olive oil. Sauté minced garlic until fragrant.\n3. Add shrimp and cook until pink (about 2-3 mins per side).\n4. Toss with cooked pasta, squeeze lemon juice, and garnish with fresh parsley if available.',
    image: 'https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'beef_broccoli',
    name: 'Beef and Broccoli Stir Fry',
    category: 'Beef',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 4,
    description: 'Tender beef strips and crispy broccoli crowns tossed in a savory ginger-garlic soy glaze over fluffy jasmine rice.',
    ingredients: [
      { itemId: 'ground_beef', quantity: '1 lb', amountNeeded: 1 }, // Simulating stir fry beef
      { itemId: 'broccoli', quantity: '2 lbs', amountNeeded: 2 },
      { itemId: 'soy_sauce', quantity: '4 tbsp', amountNeeded: 0.2 },
      { itemId: 'garlic', quantity: '2 cloves', amountNeeded: 0.33 },
      { itemId: 'rice', quantity: '1 bag', amountNeeded: 0.2 },
      { itemId: 'sugar', quantity: '2 tsp', amountNeeded: 0.05 }
    ],
    instructions: '1. Cook jasmine rice according to package.\n2. In a skillet, brown beef and drain excess fat.\n3. Add garlic and broccoli crowns, stir fry for 3 minutes.\n4. Whisk soy sauce, water, and sugar, pour over skillet and simmer until sauce thickens and broccoli is tender.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tomato_pasta',
    name: 'Creamy Tomato Mozzarella Pasta',
    category: 'Vegetarian',
    prepTime: '5 min',
    cookTime: '15 min',
    servings: 4,
    description: 'A comforting bowl of spaghetti tossed in creamy marinara sauce and melted mozzarella pearls.',
    ingredients: [
      { itemId: 'pasta', quantity: '1 box', amountNeeded: 1 },
      { itemId: 'marinara', quantity: '1 jar', amountNeeded: 1 },
      { itemId: 'mozzarella', quantity: '1 bag', amountNeeded: 1 },
      { itemId: 'garlic', quantity: '2 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Cook pasta until al dente.\n2. Warm marinara sauce with minced garlic in a pan.\n3. Drain pasta and mix directly into the sauce.\n4. Stir in mozzarella cheese until gooey and melted.',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'avocado_toast',
    name: 'Avocado Toast with Poached Eggs',
    category: 'Breakfast',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 2,
    description: 'Creamy avocado mash spread over toasted sourdough, topped with warm poached eggs.',
    ingredients: [
      { itemId: 'avocado', quantity: '2 each', amountNeeded: 2 },
      { itemId: 'sourdough', quantity: '1 loaf', amountNeeded: 0.25 },
      { itemId: 'eggs', quantity: '4 eggs', amountNeeded: 0.33 },
      { itemId: 'lemons', quantity: '0.5 lemon', amountNeeded: 0.1 }
    ],
    instructions: '1. Toast sourdough slices.\n2. Mash avocados with lemon juice, salt, and pepper.\n3. Poach eggs in simmering water for 3 minutes.\n4. Spread avocado on toast, top with eggs, and season.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chicken_caesar',
    name: 'Grilled Chicken Caesar Salad',
    category: 'Poultry',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Crisp romaine lettuce hearts, sliced grilled chicken breast, and home-style panko croutons.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'lettuce', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'breadcrumbs', quantity: '0.5 cup', amountNeeded: 0.25 }, // crouton mock
      { itemId: 'parm_cheese', quantity: '0.5 cup', amountNeeded: 0.25 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 }
    ],
    instructions: '1. Season chicken with salt, pepper, and garlic powder, grill until done.\n2. Chop romaine lettuce and wash thoroughly.\n3. Toast breadcrumbs in olive oil until golden brown.\n4. Toss lettuce with grated parmesan, olive oil, lemon juice, croutons, and top with sliced chicken.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pork_asparagus',
    name: 'Pan-Seared Pork Chops & Asparagus',
    category: 'Pork',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 2,
    description: 'Juicy, thick-cut pork chops seared in garlic butter, served with crisp-tender roasted asparagus.',
    ingredients: [
      { itemId: 'pork_chops', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'asparagus', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'butter', quantity: '2 tbsp', amountNeeded: 0.12 },
      { itemId: 'garlic', quantity: '3 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Heat butter and garlic in a skillet. Sear pork chops on both sides until cooked through.\n2. Roast asparagus with olive oil, salt, and pepper at 400°F for 12 minutes.\n3. Serve pork chops hot with asparagus side.',
    image: 'https://images.unsplash.com/photo-1432139786580-d729c69398f2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'crispy_salmon',
    name: 'Crispy Pan-Seared Salmon & Broccoli',
    category: 'Seafood',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 2,
    description: 'Crispy skin salmon fillet seared in olive oil, accompanied by steamed broccoli crowns.',
    ingredients: [
      { itemId: 'salmon_fillet', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'broccoli', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 },
      { itemId: 'lemons', quantity: '1 bag', amountNeeded: 0.25 }
    ],
    instructions: '1. Pat salmon dry and season with salt and pepper.\n2. Sear in hot olive oil skin-side down for 5-6 mins, flip and cook 3 mins more.\n3. Steam broccoli crowns until bright green.\n4. Plate together with a squeeze of fresh lemon juice.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'black_bean_tacos',
    name: 'Crispy Black Bean Tacos',
    category: 'Vegetarian',
    prepTime: '10 min',
    cookTime: '10 min',
    servings: 3,
    description: 'Warm corn tortillas filled with spiced black beans, cheddar cheese, and fresh cilantro.',
    ingredients: [
      { itemId: 'black_beans', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'tortillas', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'avocado', quantity: '2 each', amountNeeded: 2 },
      { itemId: 'cilantro', quantity: '1 bunch', amountNeeded: 0.5 }
    ],
    instructions: '1. Drain beans and warm in a pan with cumin, chili powder, and garlic.\n2. Fill tortillas with bean mash, sprinkle cheese, and fold in half.\n3. Crisp in a dry skillet on both sides until cheese is melted.\n4. Garnish with sliced avocado and chopped cilantro.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chickpea_curry',
    name: 'Coconut Chickpea Curry',
    category: 'Vegetarian',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    description: 'A comforting, creamy vegan curry made with chickpeas, coconut milk, and red curry paste, served with fluffy rice.',
    ingredients: [
      { itemId: 'chickpeas', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'coconut_milk', quantity: '1 can', amountNeeded: 1 },
      { itemId: 'curry_paste', quantity: '2 tbsp', amountNeeded: 0.5 },
      { itemId: 'spinach', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'rice', quantity: '1 bag', amountNeeded: 0.2 },
      { itemId: 'onions', quantity: '1 onion', amountNeeded: 0.33 }
    ],
    instructions: '1. Cook rice. In a separate pot, sauté chopped onions until translucent.\n2. Stir in curry paste and cook for 1 minute.\n3. Add coconut milk and chickpeas, bring to a simmer for 10 minutes.\n4. Stir in fresh spinach until wilted, serve hot over rice.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'spinach_quiche',
    name: 'Spinach & Mushroom Crustless Quiche',
    category: 'Vegetarian',
    prepTime: '15 min',
    cookTime: '35 min',
    servings: 6,
    description: 'A protein-packed crustless quiche filled with sautéed mushrooms, spinach, and cheddar cheese.',
    ingredients: [
      { itemId: 'eggs', quantity: '8 large', amountNeeded: 0.66 },
      { itemId: 'spinach', quantity: '1 bag', amountNeeded: 1 },
      { itemId: 'mushrooms', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 1 },
      { itemId: 'milk', quantity: '0.5 cup', amountNeeded: 0.1 }
    ],
    instructions: '1. Sauté sliced mushrooms and spinach in a pan until cooked; squeeze out excess liquid.\n2. Whisk eggs, milk, salt, pepper, and cheese in a large bowl.\n3. Fold in cooked vegetables and pour into a greased pie dish.\n4. Bake at 375°F for 30-35 minutes until set.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'greek_salad',
    name: 'Greek Chicken Salad Bowl',
    category: 'Poultry',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Grilled chicken breast with cucumbers, tomatoes, romaine lettuce, and a splash of olive oil.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'cucumbers', quantity: '1 each', amountNeeded: 1 },
      { itemId: 'tomatoes', quantity: '1 lb', amountNeeded: 0.5 },
      { itemId: 'lettuce', quantity: '1 pack', amountNeeded: 0.66 },
      { itemId: 'olive_oil', quantity: '3 tbsp', amountNeeded: 0.15 },
      { itemId: 'lemons', quantity: '1 lemon', amountNeeded: 0.2 }
    ],
    instructions: '1. Grill seasoned chicken breast and slice.\n2. Chop romaine lettuce, cucumbers, and tomatoes.\n3. Combine ingredients in a large bowl.\n4. Drizzle with olive oil and fresh lemon juice, season with oregano and salt.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'turkey_sliders',
    name: 'Baked Turkey & Cheese Sliders',
    category: 'Poultry',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    description: 'Savory deli turkey and melted cheddar cheese baked inside soft buns with garlic butter glaze.',
    ingredients: [
      { itemId: 'turkey_breast', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'burger_buns', quantity: '1 pack', amountNeeded: 1 }, // using burger buns as slider base
      { itemId: 'butter', quantity: '3 tbsp', amountNeeded: 0.2 },
      { itemId: 'garlic', quantity: '1 pack', amountNeeded: 0.33 }
    ],
    instructions: '1. Slice buns in half and place bottom halves on a baking sheet.\n2. Layer deli turkey and cheddar cheese inside.\n3. Place bun tops on. Brush with melted garlic butter.\n4. Bake at 350°F for 12 minutes until cheese is fully melted.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'marinara_pasta',
    name: 'Classic Homemade Marinara Pasta',
    category: 'Vegetarian',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    description: 'Rich, simmering canned tomato sauce seasoned with garlic and olive oil, served over spaghetti.',
    ingredients: [
      { itemId: 'pasta', quantity: '1 box', amountNeeded: 1 },
      { itemId: 'canned_tomatoes', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'garlic', quantity: '4 cloves', amountNeeded: 0.5 },
      { itemId: 'olive_oil', quantity: '3 tbsp', amountNeeded: 0.15 },
      { itemId: 'tomato_paste', quantity: '2 tbsp', amountNeeded: 0.25 }
    ],
    instructions: '1. Sauté minced garlic in olive oil. Add tomato paste and cook for 1 minute.\n2. Pour in diced canned tomatoes, salt, and simmer for 15 minutes.\n3. Boil spaghetti until al dente.\n4. Toss pasta with the rich marinara sauce and serve.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'classic_cheeseburger',
    name: 'Classic Beef Cheeseburgers',
    category: 'Beef',
    prepTime: '10 min',
    cookTime: '10 min',
    servings: 4,
    description: 'Juicy ground beef patties grilled and topped with melted cheddar cheese on toasted buns.',
    ingredients: [
      { itemId: 'ground_beef', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'burger_buns', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'tomatoes', quantity: '1 each', amountNeeded: 0.25 },
      { itemId: 'lettuce', quantity: '1 Romaine heart', amountNeeded: 0.33 }
    ],
    instructions: '1. Shape ground beef into 4 patties and season with salt and pepper.\n2. Grill or pan-sear patties for 4 mins per side, adding cheese in the final minute.\n3. Toast hamburger buns.\n4. Assemble burgers with lettuce, sliced tomatoes, and your favorite sauces.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'teriyaki_chicken',
    name: 'Sweet Teriyaki Chicken Bowl',
    category: 'Poultry',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 3,
    description: 'Sautéed chicken cubes glazed in a sweet teriyaki sauce made from soy sauce and honey, with broccoli and rice.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'broccoli', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'soy_sauce', quantity: '6 tbsp', amountNeeded: 0.3 },
      { itemId: 'honey', quantity: '3 tbsp', amountNeeded: 0.2 },
      { itemId: 'rice', quantity: '1 bag', amountNeeded: 0.25 },
      { itemId: 'garlic', quantity: '2 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Cook rice and steam broccoli.\n2. Cut chicken into bite-sized pieces and cook in a hot pan until done.\n3. In a bowl, mix soy sauce, honey, minced garlic, and pour over the chicken.\n4. Cook until the glaze coats the chicken, serve over rice with broccoli.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'caprese_salad',
    name: 'Fresh Caprese Salad Platter',
    category: 'Vegetarian',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 2,
    description: 'Juicy Roma tomatoes, fresh mozzarella slices, and sweet basil leaves drizzled with extra virgin olive oil.',
    ingredients: [
      { itemId: 'tomatoes', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'mozzarella', quantity: '1 pack', amountNeeded: 1 }, // assuming fresh-style mock
      { itemId: 'olive_oil', quantity: '3 tbsp', amountNeeded: 0.15 }
    ],
    instructions: '1. Thickly slice Roma tomatoes and mozzarella cheese.\n2. Alternate slices of tomato and mozzarella on a serving plate.\n3. Drizzle generously with high-quality extra virgin olive oil, sprinkle sea salt, and top with fresh herbs.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'beef_chili',
    name: 'Hearty Ground Beef Chili',
    category: 'Beef',
    prepTime: '15 min',
    cookTime: '45 min',
    servings: 6,
    description: 'A classic, thick beef chili packed with beans, diced tomatoes, onions, and bold spices.',
    ingredients: [
      { itemId: 'ground_beef', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'black_beans', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'canned_tomatoes', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'onions', quantity: '1 onion', amountNeeded: 0.33 },
      { itemId: 'tomato_paste', quantity: '1 can', amountNeeded: 0.5 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.5 }
    ],
    instructions: '1. Sauté chopped onions in a large pot, then add ground beef and cook until brown; drain fat.\n2. Stir in tomato paste, diced tomatoes, black beans, chili powder, and cumin.\n3. Simmer on low heat for 30 minutes.\n4. Serve warm topped with shredded cheddar cheese.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'overnight_oats',
    name: 'Overnight Oats with Strawberries',
    category: 'Breakfast',
    prepTime: '5 min',
    cookTime: '0 min',
    servings: 2,
    description: 'Old fashioned rolled oats soaked in milk and sweetened with honey, topped with strawberries.',
    ingredients: [
      { itemId: 'oats', quantity: '1 cup', amountNeeded: 0.25 },
      { itemId: 'milk', quantity: '1 cup', amountNeeded: 0.06 },
      { itemId: 'honey', quantity: '2 tbsp', amountNeeded: 0.15 },
      { itemId: 'strawberries', quantity: '0.5 pack', amountNeeded: 0.5 }
    ],
    instructions: '1. Mix oats, milk, and honey in a jar.\n2. Seal and refrigerate overnight (at least 6 hours).\n3. In the morning, stir the oats and top with freshly sliced strawberries.',
    image: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'garlic_butter_chicken',
    name: 'Skillet Garlic Butter Chicken',
    category: 'Poultry',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 3,
    description: 'Pan-seared chicken breast pieces cooked in a rich garlic butter pan sauce.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'butter', quantity: '4 tbsp', amountNeeded: 0.25 },
      { itemId: 'garlic', quantity: '4 cloves', amountNeeded: 0.5 },
      { itemId: 'olive_oil', quantity: '1 tbsp', amountNeeded: 0.05 }
    ],
    instructions: '1. Cut chicken breast into bite-sized cubes.\n2. Heat olive oil and 1 tbsp butter in a skillet, sear chicken until golden and cooked.\n3. Add remaining butter and minced garlic, sautéing for 2 minutes on low.\n4. Coat chicken in garlic butter sauce and serve.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mushroom_risotto',
    name: 'Creamy Mushroom Rice Risotto',
    category: 'Vegetarian',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    description: 'A comforting Italian-style rice dish slowly cooked in hot chicken broth, packed with garlic butter mushrooms.',
    ingredients: [
      { itemId: 'rice', quantity: '1.5 cups', amountNeeded: 0.2 },
      { itemId: 'mushrooms', quantity: '1.5 packs', amountNeeded: 1.5 },
      { itemId: 'chicken_broth', quantity: '1 carton', amountNeeded: 1 },
      { itemId: 'butter', quantity: '4 tbsp', amountNeeded: 0.25 },
      { itemId: 'parm_cheese', quantity: '0.5 cup', amountNeeded: 0.25 },
      { itemId: 'onions', quantity: '1 onion', amountNeeded: 0.33 }
    ],
    instructions: '1. Sauté sliced mushrooms in 2 tbsp butter, set aside.\n2. Sauté chopped onions in remaining butter, add dry rice and toast for 1 minute.\n3. Add warm chicken broth one ladle at a time, stirring until absorbed.\n4. Once rice is cooked and creamy, fold in mushrooms and grated parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pork_stirfry',
    name: 'Savory Pork Stir Fry',
    category: 'Pork',
    prepTime: '15 min',
    cookTime: '10 min',
    servings: 4,
    description: 'Tender pork loin strips stir-fried with bell peppers, broccoli, and carrots in a delicious soy-garlic sauce.',
    ingredients: [
      { itemId: 'pork_chops', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'broccoli', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'bellpeppers', quantity: '1 pack', amountNeeded: 0.66 },
      { itemId: 'carrots', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'soy_sauce', quantity: '4 tbsp', amountNeeded: 0.2 },
      { itemId: 'garlic', quantity: '2 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Slice pork chops into thin strips.\n2. Sauté pork in a large pan with oil until browned.\n3. Add broccoli crowns, sliced carrots, and bell peppers; sauté for 5 minutes.\n4. Stir in soy sauce and minced garlic, cook 2 mins until bubbling and hot.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tuna_sandwich',
    name: 'Classic Tuna Salad Sandwich',
    category: 'Seafood',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 2,
    description: 'Creamy canned tuna salad mixed with onions, stacked between slices of fresh sourdough bread.',
    ingredients: [
      { itemId: 'canned_tuna', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'sourdough', quantity: '4 slices', amountNeeded: 0.25 },
      { itemId: 'onions', quantity: '1 small', amountNeeded: 0.2 },
      { itemId: 'sour_cream', quantity: '3 tbsp', amountNeeded: 0.15 } // mayo replacement
    ],
    instructions: '1. Drain canned tuna and flak in a bowl.\n2. Mix with minced onion and sour cream (or mayo if you have it), salt, and pepper.\n3. Spread tuna mix onto sourdough slices.\n4. Add lettuce or sliced tomato if desired, and assemble.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'french_toast',
    name: 'Classic Cinnamon French Toast',
    category: 'Breakfast',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 4,
    description: 'Fluffy sourdough slices soaked in vanilla egg custard and griddled, finished with maple syrup.',
    ingredients: [
      { itemId: 'sourdough', quantity: '1 loaf', amountNeeded: 0.5 },
      { itemId: 'eggs', quantity: '4 large', amountNeeded: 0.33 },
      { itemId: 'milk', quantity: '0.5 cup', amountNeeded: 0.1 },
      { itemId: 'butter', quantity: '2 tbsp', amountNeeded: 0.12 },
      { itemId: 'maple_syrup', quantity: '0.25 cup', amountNeeded: 0.25 }
    ],
    instructions: '1. Whisk eggs, milk, and ground cinnamon in a shallow dish.\n2. Dip sourdough bread slices into the egg custard, soaking both sides.\n3. Cook in melted butter on a hot skillet until golden brown on both sides.\n4. Drizzle with sweet maple syrup and serve.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ribeye_steak_meal',
    name: 'Garlic Asparagus & Ribeye Steak',
    category: 'Beef',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 2,
    description: 'Premium pan-seared ribeye steak basted in garlic herb butter, with roasted asparagus.',
    ingredients: [
      { itemId: 'ribeye_steak', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'asparagus', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'butter', quantity: '4 tbsp', amountNeeded: 0.25 },
      { itemId: 'garlic', quantity: '3 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Let steak sit at room temp for 20 mins, season heavily with salt/pepper.\n2. Sear steak in a hot skillet with butter and garlic, basting constantly for 4 mins per side.\n3. Sauté asparagus in the same pan juices until tender.\n4. Rest steak for 5 minutes before slicing.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'coconut_chicken_curry',
    name: 'Creamy Coconut Chicken Curry',
    category: 'Poultry',
    prepTime: '15 min',
    cookTime: '20 min',
    servings: 4,
    description: 'Juicy chicken cubes simmered in a warm, fragrant red curry and coconut milk sauce over rice.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'coconut_milk', quantity: '1 can', amountNeeded: 1 },
      { itemId: 'curry_paste', quantity: '2 tbsp', amountNeeded: 0.5 },
      { itemId: 'bellpeppers', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'rice', quantity: '1 bag', amountNeeded: 0.25 },
      { itemId: 'onions', quantity: '1 onion', amountNeeded: 0.33 }
    ],
    instructions: '1. Cook jasmine rice.\n2. Sauté chopped onions and chicken breast cubes in a pot until chicken is white.\n3. Add red curry paste and bell pepper slices, cook for 2 minutes.\n4. Pour in coconut milk, bring to a boil, and simmer for 12 minutes.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'grilled_cheese_soup',
    name: 'Grilled Cheese & Tomato Soup',
    category: 'Vegetarian',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    description: 'A comforting childhood favorite: toasted sourdough grilled cheese served with warm tomato soup.',
    ingredients: [
      { itemId: 'sourdough', quantity: '4 slices', amountNeeded: 0.25 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'butter', quantity: '2 tbsp', amountNeeded: 0.12 },
      { itemId: 'tomato_soup', quantity: '1 can', amountNeeded: 1 }
    ],
    instructions: '1. Butter sourdough bread slices. Place cheese between two slices.\n2. Grill in a skillet until cheese is fully melted and bread is toasted golden.\n3. Warm tomato soup in a small saucepan.\n4. Serve sandwich warm, sliced diagonally, with soup for dipping.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'honey_salmon',
    name: 'Honey Mustard Glazed Salmon',
    category: 'Seafood',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 2,
    description: 'Sweet honey-brushed salmon fillets baked to flaky perfection, served with asparagus.',
    ingredients: [
      { itemId: 'salmon_fillet', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'honey', quantity: '3 tbsp', amountNeeded: 0.2 },
      { itemId: 'asparagus', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 }
    ],
    instructions: '1. Mix honey and salt (add mustard if available) and coat salmon fillets.\n2. Place salmon and asparagus on a baking tray.\n3. Drizzle asparagus with olive oil, salt, and pepper.\n4. Bake at 400°F for 12-15 minutes until salmon flakes easily.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bacon_egg_scramble',
    name: 'Bacon, Egg, and Cheese Scramble',
    category: 'Breakfast',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Crispy pan-fried bacon crumbled into soft scrambled eggs, topped with melted cheddar cheese.',
    ingredients: [
      { itemId: 'eggs', quantity: '6 eggs', amountNeeded: 0.5 },
      { itemId: 'bacon', quantity: '6 slices', amountNeeded: 0.5 },
      { itemId: 'cheddar_cheese', quantity: '0.5 cup', amountNeeded: 0.25 },
      { itemId: 'butter', quantity: '1 tbsp', amountNeeded: 0.06 }
    ],
    instructions: '1. Fry bacon in a skillet until crispy; drain on paper towels and crumble.\n2. Whisk eggs in a bowl with salt and pepper.\n3. Melt butter in a skillet, pour in eggs, and cook on low, stirring gently.\n4. Stir in bacon and top with cheddar cheese, allowing it to melt.',
    image: 'https://images.unsplash.com/photo-1603046891744-1f76eb10aec1?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sweet_potato_bowl',
    name: 'Sweet Potato & Black Bean Bowl',
    category: 'Vegetarian',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 2,
    description: 'Roasted sweet potato cubes, spiced black beans, and fresh avocado over quinoa.',
    ingredients: [
      { itemId: 'sweetpotatoes', quantity: '1.5 lbs', amountNeeded: 1.5 },
      { itemId: 'black_beans', quantity: '1 can', amountNeeded: 1 },
      { itemId: 'quinoa', quantity: '1 cup', amountNeeded: 0.5 },
      { itemId: 'avocado', quantity: '2 each', amountNeeded: 2 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 }
    ],
    instructions: '1. Cook quinoa according to package.\n2. Peel and dice sweet potatoes. Toss with olive oil and roast at 400°F for 20 mins.\n3. Warm black beans with garlic powder and cumin.\n4. Divide quinoa into bowls, top with beans, roasted sweet potatoes, and avocado slices.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'chicken_quesadillas',
    name: 'Cheesy Chicken Quesadillas',
    category: 'Poultry',
    prepTime: '10 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Crisp tortillas stuffed with shredded spiced chicken breast and loaded with gooey melted cheddar.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'tortillas', quantity: '1 pack', amountNeeded: 0.5 },
      { itemId: 'cheddar_cheese', quantity: '1 bag', amountNeeded: 0.75 },
      { itemId: 'butter', quantity: '2 tbsp', amountNeeded: 0.12 },
      { itemId: 'salsa', quantity: '0.5 jar', amountNeeded: 0.5 }
    ],
    instructions: '1. Cook seasoned chicken breast and shred it.\n2. Lay a tortilla in a buttered skillet, cover with cheese, shredded chicken, and more cheese.\n3. Fold tortilla in half. Griddle until golden brown and crispy on both sides.\n4. Slice into triangles and serve hot with salsa.',
    image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'mediterranean_salad',
    name: 'Mediterranean Chickpea Salad',
    category: 'Vegetarian',
    prepTime: '15 min',
    cookTime: '0 min',
    servings: 4,
    description: 'A refreshing salad of protein-rich chickpeas, diced cucumber, tomatoes, onions, and fresh cilantro.',
    ingredients: [
      { itemId: 'chickpeas', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'cucumbers', quantity: '1 each', amountNeeded: 1 },
      { itemId: 'cherrytomatoes', quantity: '1 pint', amountNeeded: 1 },
      { itemId: 'onions', quantity: '1 small', amountNeeded: 0.25 },
      { itemId: 'olive_oil', quantity: '4 tbsp', amountNeeded: 0.2 },
      { itemId: 'cilantro', quantity: '1 bunch', amountNeeded: 0.5 }
    ],
    instructions: '1. Drain and rinse canned chickpeas.\n2. Dice cucumber, onions, and chop cherry tomatoes.\n3. Combine all ingredients in a bowl with chopped cilantro.\n4. Toss with olive oil, salt, pepper, and lemon juice (if available).',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'pesto_cherry_pasta',
    name: 'Basil Pesto Pasta with Cherry Tomatoes',
    category: 'Vegetarian',
    prepTime: '5 min',
    cookTime: '12 min',
    servings: 4,
    description: 'Spaghetti pasta tossed in aromatic basil pesto, studded with juicy, lightly blistered cherry tomatoes.',
    ingredients: [
      { itemId: 'pasta', quantity: '1 box', amountNeeded: 1 },
      { itemId: 'pesto', quantity: '1 jar', amountNeeded: 1 },
      { itemId: 'cherrytomatoes', quantity: '1 pint', amountNeeded: 1 },
      { itemId: 'parm_cheese', quantity: '0.25 cup', amountNeeded: 0.15 }
    ],
    instructions: '1. Cook pasta according to package instructions.\n2. In a skillet, sauté whole cherry tomatoes in a splash of olive oil until blistered.\n3. Drain pasta, return to pot, and toss with pesto and blistered tomatoes.\n4. Serve hot with a sprinkle of parmesan cheese.',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'sausage_peppers',
    name: 'Sausage, Peppers, and Onions',
    category: 'Pork',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    description: 'Savory Italian sausage links skillet-seared with sweet bell peppers and sliced onions.',
    ingredients: [
      { itemId: 'sausage', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'bellpeppers', quantity: '1 pack', amountNeeded: 1 },
      { itemId: 'onions', quantity: '1 onion', amountNeeded: 0.33 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 }
    ],
    instructions: '1. Heat olive oil in a skillet and cook sausage links until browned and fully cooked.\n2. Remove sausages and slice. In the same skillet, cook sliced peppers and onions until soft.\n3. Add sausages back to skillet and stir fry together for 3 minutes.\n4. Serve hot in buns or over rice.',
    image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'beef_taco_bowls',
    name: 'Spiced Beef Taco Bowls',
    category: 'Beef',
    prepTime: '15 min',
    cookTime: '15 min',
    servings: 3,
    description: 'Warm taco-seasoned ground beef served over white jasmine rice with black beans, avocado, and salsa.',
    ingredients: [
      { itemId: 'ground_beef', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'rice', quantity: '1 bag', amountNeeded: 0.25 },
      { itemId: 'black_beans', quantity: '1 can', amountNeeded: 1 },
      { itemId: 'avocado', quantity: '2 each', amountNeeded: 2 },
      { itemId: 'salsa', quantity: '1 jar', amountNeeded: 0.5 }
    ],
    instructions: '1. Cook jasmine rice.\n2. Brown ground beef in a skillet, seasoning with taco spices, and drain.\n3. Warm black beans in a separate pot.\n4. Build bowls with a base of rice, then add beef, beans, avocado slices, and top with salsa.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'strawberry_oatmeal',
    name: 'Strawberry Banana Oatmeal',
    category: 'Breakfast',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    description: 'Warm oatmeal cooked in milk, sweetened with honey, and topped with strawberries and bananas.',
    ingredients: [
      { itemId: 'oats', quantity: '1 cup', amountNeeded: 0.25 },
      { itemId: 'milk', quantity: '2 cups', amountNeeded: 0.12 },
      { itemId: 'bananas', quantity: '1 each', amountNeeded: 1 },
      { itemId: 'strawberries', quantity: '0.5 cup', amountNeeded: 0.25 },
      { itemId: 'honey', quantity: '2 tbsp', amountNeeded: 0.15 }
    ],
    instructions: '1. Bring milk to a simmer in a saucepan, add oats, and stir. Cook for 5 mins.\n2. Remove from heat and stir in honey.\n3. Divide oatmeal into bowls.\n4. Top with sliced bananas, sliced strawberries, and serve.',
    image: 'https://images.unsplash.com/photo-1517881917430-e70dfb3610aa?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'baked_ziti',
    name: 'Cheesy Baked Marinara Ziti',
    category: 'Vegetarian',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 6,
    description: 'Pasta baked with marinara sauce, cream cheese pockets, and a thick layer of melted mozzarella.',
    ingredients: [
      { itemId: 'pasta', quantity: '1 box', amountNeeded: 1 },
      { itemId: 'marinara', quantity: '1 jar', amountNeeded: 1 },
      { itemId: 'cream_cheese', quantity: '1 block', amountNeeded: 0.5 },
      { itemId: 'mozzarella', quantity: '1 bag', amountNeeded: 1 },
      { itemId: 'parm_cheese', quantity: '0.25 cup', amountNeeded: 0.15 }
    ],
    instructions: '1. Cook pasta slightly under al dente. Drain.\n2. Toss pasta with marinara sauce and cubed cream cheese.\n3. Pour into a baking dish. Top with mozzarella and parmesan cheese.\n4. Bake at 375°F for 20 minutes until bubbly and golden on top.',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'lemon_herb_chicken',
    name: 'Lemon Herb Pan-Roasted Chicken',
    category: 'Poultry',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 2,
    description: 'Chicken breast pan-roasted with garlic, olive oil, and fresh lemon juice, served with broccoli.',
    ingredients: [
      { itemId: 'chicken_breast', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'lemons', quantity: '1 bag', amountNeeded: 0.25 },
      { itemId: 'broccoli', quantity: '1 lb', amountNeeded: 1 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 },
      { itemId: 'garlic', quantity: '2 cloves', amountNeeded: 0.33 }
    ],
    instructions: '1. Season chicken with salt, pepper, and herbs.\n2. Sear chicken in hot olive oil for 5 mins. Add garlic, lemon juice, and broccoli crowns to the pan.\n3. Cover skillet and cook on medium-low for 10-12 minutes until chicken is done and broccoli is tender.\n4. Serve hot.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'garlic_parm_potatoes',
    name: 'Crispy Garlic Parmesan Potatoes',
    category: 'Vegetarian',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    description: 'Roasted russet potato wedges seasoned with garlic, olive oil, and topped with crisp parmesan cheese.',
    ingredients: [
      { itemId: 'potatoes', quantity: '2 lbs', amountNeeded: 0.4 },
      { itemId: 'olive_oil', quantity: '3 tbsp', amountNeeded: 0.15 },
      { itemId: 'garlic', quantity: '4 cloves', amountNeeded: 0.5 },
      { itemId: 'parm_cheese', quantity: '0.5 cup', amountNeeded: 0.25 }
    ],
    instructions: '1. Cut potatoes into wedges and dry them with a towel.\n2. Toss wedges in a bowl with olive oil, minced garlic, salt, and pepper.\n3. Spread in a single layer on a baking sheet, bake at 400°F for 20 minutes.\n4. Toss with parmesan cheese and bake another 10 minutes until crispy and golden.',
    image: 'https://images.unsplash.com/photo-1518013006335-e1103c2b17bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'tuna_salad_bowl',
    name: 'Tuna Avocado Protein Salad',
    category: 'Seafood',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 2,
    description: 'A low-carb, high-protein bowl featuring canned tuna, diced cucumber, avocado, and green spinach.',
    ingredients: [
      { itemId: 'canned_tuna', quantity: '2 cans', amountNeeded: 2 },
      { itemId: 'avocado', quantity: '2 each', amountNeeded: 2 },
      { itemId: 'cucumbers', quantity: '1 each', amountNeeded: 1 },
      { itemId: 'spinach', quantity: '1 bag', amountNeeded: 0.5 },
      { itemId: 'olive_oil', quantity: '2 tbsp', amountNeeded: 0.1 }
    ],
    instructions: '1. Flake drained canned tuna in a bowl.\n2. Chop cucumber and dice avocado.\n3. Arrange spinach in bowls, top with tuna salad, chopped cucumber, and avocado.\n4. Drizzle with olive oil, sprinkle salt, and squeeze fresh lemon if available.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80'
  }
];
