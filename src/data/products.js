// src/data/products.js

export const categories = ["All", "Coffee", "Tea", "Pastries", "Sandwiches", "Smoothies"];

export const products = [
    {
        id: 1,
        name: "Caramel Macchiato",
        subname: "Smooth espresso with vanilla and caramel drizzle",
        description: "Freshly brewed espresso with steamed milk, vanilla syrup, and a rich caramel drizzle",
        price: 4.50,
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400",
        category: "Coffee",
        best: true,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0, ml: 250 },
                { name: "Medium", price: 0.50, ml: 350 },
                { name: "Large", price: 1.00, ml: 450 }
            ],
            milkOptions: [
                { name: "Whole Milk", price: 0 },
                { name: "Almond Milk", price: 0.75 },
                { name: "Oat Milk", price: 0.75 },
                { name: "Soy Milk", price: 0.75 },
                { name: "Coconut Milk", price: 0.75 }
            ],
            sweetnessLevels: [
                { name: "0%", value: "0%" },
                { name: "25%", value: "25%" },
                { name: "50%", value: "50%" },
                { name: "75%", value: "75%" },
                { name: "100%", value: "100%" }
            ],
            addOns: [
                { name: "Extra Espresso Shot", price: 0.75 },
                { name: "Vanilla Syrup", price: 0.50 },
                { name: "Caramel Drizzle", price: 0.50 },
                { name: "Whipped Cream", price: 0.25 },
                { name: "Chocolate Powder", price: 0.25 },
                { name: "Cinnamon Powder", price: 0.25 }
            ],
            temperature: [
                { name: "Hot", price: 0 },
                { name: "Iced", price: 0 }
            ]
        }
    },
    {
        id: 2,
        name: "Latte",
        subname: "Espresso with steamed milk and light foam",
        description: "Classic Italian coffee drink made with espresso and steamed milk",
        price: 4.00,
        image: "https://images.unsplash.com/photo-1561047029-3000c03d35d9?w=400",
        category: "Coffee",
        best: true,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0, ml: 250 },
                { name: "Medium", price: 0.50, ml: 350 },
                { name: "Large", price: 1.00, ml: 450 }
            ],
            milkOptions: [
                { name: "Whole Milk", price: 0 },
                { name: "Almond Milk", price: 0.75 },
                { name: "Oat Milk", price: 0.75 },
                { name: "Soy Milk", price: 0.75 }
            ],
            sweetnessLevels: [
                { name: "0%", value: "0%" },
                { name: "25%", value: "25%" },
                { name: "50%", value: "50%" },
                { name: "75%", value: "75%" },
                { name: "100%", value: "100%" }
            ],
            addOns: [
                { name: "Extra Espresso Shot", price: 0.75 },
                { name: "Vanilla Syrup", price: 0.50 },
                { name: "Hazelnut Syrup", price: 0.50 }
            ],
            temperature: [
                { name: "Hot", price: 0 },
                { name: "Iced", price: 0 }
            ]
        }
    },
    {
        id: 3,
        name: "Cappuccino",
        subname: "Espresso with equal parts steamed milk and foam",
        description: "Rich espresso with velvety steamed milk and thick foam",
        price: 4.25,
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400",
        category: "Coffee",
        best: false,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0, ml: 250 },
                { name: "Medium", price: 0.50, ml: 350 },
                { name: "Large", price: 1.00, ml: 450 }
            ],
            milkOptions: [
                { name: "Whole Milk", price: 0 },
                { name: "Almond Milk", price: 0.75 },
                { name: "Oat Milk", price: 0.75 }
            ],
            addOns: [
                { name: "Cinnamon Powder", price: 0.25 },
                { name: "Chocolate Powder", price: 0.25 }
            ],
            temperature: [
                { name: "Hot", price: 0 }
            ]
        }
    },
    {
        id: 4,
        name: "Matcha Latte",
        subname: "Premium Japanese matcha with steamed milk",
        description: "Ceremonial grade matcha green tea with steamed milk",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400",
        category: "Tea",
        best: true,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0, ml: 250 },
                { name: "Medium", price: 0.50, ml: 350 },
                { name: "Large", price: 1.00, ml: 450 }
            ],
            milkOptions: [
                { name: "Whole Milk", price: 0 },
                { name: "Almond Milk", price: 0.75 },
                { name: "Oat Milk", price: 0.75 },
                { name: "Soy Milk", price: 0.75 }
            ],
            sweetnessLevels: [
                { name: "0%", value: "0%" },
                { name: "25%", value: "25%" },
                { name: "50%", value: "50%" },
                { name: "75%", value: "75%" },
                { name: "100%", value: "100%" }
            ],
            temperature: [
                { name: "Hot", price: 0 },
                { name: "Iced", price: 0 }
            ]
        }
    },
    {
        id: 5,
        name: "Croissant",
        subname: "Butter, flaky pastry",
        description: "Freshly baked French croissant with a golden, flaky crust",
        price: 3.50,
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
        category: "Pastries",
        best: false,
        hasCustomizations: false
    },
    {
        id: 6,
        name: "Chocolate Muffin",
        subname: "Rich chocolate chips",
        description: "Moist chocolate muffin packed with chocolate chips",
        price: 3.00,
        image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400",
        category: "Pastries",
        best: false,
        hasCustomizations: false
    },
    {
        id: 7,
        name: "Turkey Sandwich",
        subname: "Turkey, lettuce, tomato on wheat",
        description: "Fresh roasted turkey breast with lettuce, tomato, and mayo on wheat bread",
        price: 7.50,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400",
        category: "Sandwiches",
        best: true,
        hasCustomizations: true,
        customizationOptions: {
            breadOptions: [
                { name: "Wheat Bread", price: 0 },
                { name: "White Bread", price: 0 },
                { name: "Sourdough", price: 0.50 },
                { name: "Gluten-Free", price: 1.00 }
            ],
            cheeseOptions: [
                { name: "No Cheese", price: 0 },
                { name: "Cheddar", price: 0.50 },
                { name: "Swiss", price: 0.50 },
                { name: "Provolone", price: 0.50 }
            ],
            addOns: [
                { name: "Bacon", price: 1.00 },
                { name: "Avocado", price: 1.50 },
                { name: "Extra Turkey", price: 2.00 }
            ]
        }
    },
    {
        id: 8,
        name: "Strawberry Smoothie",
        subname: "Fresh strawberries and yogurt",
        description: "Refreshing smoothie made with fresh strawberries, banana, and Greek yogurt",
        price: 5.50,
        image: "https://images.unsplash.com/photo-1553530666-b14c90d6f7b3?w=400",
        category: "Smoothies",
        best: false,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0, ml: 350 },
                { name: "Medium", price: 0.75, ml: 500 },
                { name: "Large", price: 1.50, ml: 700 }
            ],
            addOns: [
                { name: "Protein Powder", price: 1.00 },
                { name: "Extra Strawberries", price: 0.75 },
                { name: "Honey", price: 0.50 }
            ]
        }
    },
    {
        id: 9,
        name: "Espresso",
        subname: "Strong and bold",
        description: "Pure coffee concentrate with rich crema",
        price: 3.00,
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400",
        category: "Coffee",
        best: false,
        hasCustomizations: false
    },
    {
        id: 10,
        name: "Blueberry Scone",
        subname: "Fresh blueberries",
        description: "Buttery scone packed with fresh blueberries",
        price: 3.25,
        image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400",
        category: "Pastries",
        best: false,
        hasCustomizations: false
    },
    {
        id: 11,
        name: "Iced Americano",
        subname: "Espresso with cold water",
        description: "Refreshing iced espresso diluted with cold water",
        price: 3.75,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
        category: "Coffee",
        best: false,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0 },
                { name: "Medium", price: 0.50 },
                { name: "Large", price: 1.00 }
            ],
            addOns: [
                { name: "Extra Shot", price: 0.75 },
                { name: "Vanilla Syrup", price: 0.50 }
            ]
        }
    },
    {
        id: 12,
        name: "Chai Latte",
        subname: "Spiced tea with milk",
        description: "Aromatic black tea with spices and steamed milk",
        price: 4.75,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb77374?w=400",
        category: "Tea",
        best: true,
        hasCustomizations: true,
        customizationOptions: {
            sizes: [
                { name: "Small", price: 0 },
                { name: "Medium", price: 0.50 },
                { name: "Large", price: 1.00 }
            ],
            milkOptions: [
                { name: "Whole Milk", price: 0 },
                { name: "Almond Milk", price: 0.75 },
                { name: "Oat Milk", price: 0.75 }
            ],
            sweetnessLevels: [
                { name: "0%", value: "0%" },
                { name: "25%", value: "25%" },
                { name: "50%", value: "50%" },
                { name: "75%", value: "75%" },
                { name: "100%", value: "100%" }
            ],
            temperature: [
                { name: "Hot", price: 0 },
                { name: "Iced", price: 0 }
            ]
        }
    }
];

// Helper function to get product by ID
export const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
};

// Helper function to get products by category
export const getProductsByCategory = (category) => {
    if (category === "All") return products;
    return products.filter(product => product.category === category);
};

// Helper function to get customizable products
export const getCustomizableProducts = () => {
    return products.filter(product => product.hasCustomizations);
};

// Helper function to calculate customized price
export const calculateCustomizedPrice = (product, customizations) => {
    let finalPrice = product.price;
    
    if (customizations.size) {
        const sizeOption = product.customizationOptions?.sizes?.find(s => s.name === customizations.size);
        if (sizeOption) finalPrice += sizeOption.price;
    }
    
    if (customizations.milk) {
        const milkOption = product.customizationOptions?.milkOptions?.find(m => m.name === customizations.milk);
        if (milkOption) finalPrice += milkOption.price;
    }
    
    if (customizations.addOns && customizations.addOns.length > 0) {
        customizations.addOns.forEach(addOnName => {
            const addOnOption = product.customizationOptions?.addOns?.find(a => a.name === addOnName);
            if (addOnOption) finalPrice += addOnOption.price;
        });
    }
    
    if (customizations.bread) {
        const breadOption = product.customizationOptions?.breadOptions?.find(b => b.name === customizations.bread);
        if (breadOption) finalPrice += breadOption.price;
    }
    
    if (customizations.cheese) {
        const cheeseOption = product.customizationOptions?.cheeseOptions?.find(c => c.name === customizations.cheese);
        if (cheeseOption) finalPrice += cheeseOption.price;
    }
    
    return finalPrice;
};