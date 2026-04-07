import React, { useState } from "react";

const initialProducts = [
    {
        id: 1,
        name: "ESPRESSO",
        subname: "Mondulkiri Phum",
        category: "Coffee",
        price: 3.5,
        image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        best: true,
        qty: 1, // Changed from 0 to 1
    },
    {
        id: 2,
        name: "AMERICANO",
        subname: "Premium Blend",
        category: "Coffee",
        price: 3.0,
        image:
        "https://th.bing.com/th/id/OIP.5TvO8KKs3qbHukjvvrQJOAHaE8?w=273&h=182&c=7&r=0&o=7&pid=1.7&rm=3",
        best: false,
        qty: 1, // Changed from 0 to 1
    },
    {
        id: 3,
        name: "CAPPUCCINO",
        subname: "Italian Style",
        category: "Coffee",
        price: 3.5,
        image:
        "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
        best: true,
        qty: 1, // Changed from 0 to 1
    },
    {
        id: 4,
        name: "LATTE",
        subname: "Smooth & Creamy",
        category: "Coffee",
        price: 3.8,
        image:
        "https://th.bing.com/th/id/OIP.iObZOXH9CgWppRQudO96NwHaHa?w=217&h=216&c=7&r=0&o=7&pid=1.7&rm=3",
        best: false,
        qty: 1, // Changed from 0 to 1
    },
];

const categories = ["All", "Coffee", "Tea", "Cold Drinks", "Snacks"];

const Menu = ({ cartItems, onAddToCart, onClearCart }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [products, setProducts] = useState(initialProducts);

    const filteredProducts =
        selectedCategory === "All"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    const handleIncrement = (id) => {
        setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
        );
    };

    const handleDecrement = (id) => {
        setProducts((prev) =>
        prev.map((p) =>
            p.id === id && p.qty > 1 ? { ...p, qty: p.qty - 1 } : p // Changed from > 0 to > 1
        )
        );
    };

    const handleAddToCart = (product) => {
        // Removed the qty === 0 check since default is now 1
        if (product.qty < 1) {
            alert("Please select quantity first!");
            return;
        }
        
        onAddToCart(product);
        
        setProducts((prev) =>
            prev.map((p) =>
                p.id === product.id ? { ...p, qty: 1 } : p // Reset to 1 instead of 0
            )
        );
    };

    const getTotalItems = () => {
        return Object.values(cartItems).reduce((total, item) => total + item.cartQty, 0);
    };

    const getTotalPrice = () => {
        return Object.values(cartItems).reduce((total, item) => total + (item.price * item.cartQty), 0);
    };

    return (
        <>
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            {/* Cart Summary Bar */}
            <div className="bg-gray-100 rounded-lg p-4 mb-8 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center">
            <div>
                <span className="font-semibold">Cart Summary:  </span>
                <span>{getTotalItems()} item(s)</span>
            </div>
            <div>
                <span className="font-semibold">Total: </span>
                <span className="text-[#d4af37] font-bold">${getTotalPrice().toFixed(2)}</span>
            </div>
            {getTotalItems() > 0 && (
                <button 
                onClick={() => {
                    onClearCart();
                    alert("Order placed successfully!");
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition w-full sm:w-auto"
                >
                Checkout
                </button>
            )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-3 mb-8 flex-wrap">
            {categories.map((cat) => (
                <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full border font-medium ${
                    selectedCategory === cat
                    ? "bg-[#d4af37] text-black"
                    : "bg-white text-gray-700 border-gray-300"
                } transition text-sm sm:text-base`}
                >
                {cat}
                </button>
            ))}
            </div>

            {/* Products Grid - 2 columns on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.map((product) => (
                <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300"
                >
                {/* Best badge */}
                {product.best && (
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-1.5 py-0.5 text-[10px] sm:text-xs rounded font-semibold z-10">
                    BEST
                    </span>
                )}

                {/* Product Image with padding and square size */}
                <div className="p-1.5 sm:p-2 pb-0">
                    <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-2 sm:p-4">
                    {/* Category tag */}
                    <div className="text-[10px] sm:text-xs text-orange-400 font-semibold mb-1 sm:mb-2">
                    {product.category}
                    </div>

                    {/* Product Name */}
                    <h2 className="text-sm sm:text-xl font-bold text-gray-800 tracking-wide">
                    {product.name}
                    </h2>

                    {/* Subname - Hidden on mobile */}
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">
                    {product.subname}
                    </p>

                    {/* Price */}
                    <div className="mt-1.5 sm:mt-3">
                    <p className="text-base sm:text-2xl font-bold text-[#d4af37]">
                        ${product.price.toFixed(2)}
                    </p>
                    </div>

                    {/* Quantity and Add Button Row */}
                    <div className="mt-2 sm:mt-4 pt-1 sm:pt-2 border-t border-gray-100">
                    {/* Mobile: 2 column layout */}
                    <div className="block sm:hidden">
                        <div className="flex flex-col gap-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center bg-gray-50 rounded-lg px-2 py-1.5">
                            <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleDecrement(product.id)}
                                className="text-gray-600 hover:text-black font-bold text-base w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                                disabled={product.qty <= 1} // Disabled when qty is 1
                            >
                                -
                            </button>
                            <span className="font-semibold min-w-[30px] text-center text-gray-800 text-base">
                                {product.qty}
                            </span>
                            <button
                                onClick={() => handleIncrement(product.id)}
                                className="text-[#d4af37] hover:text-yellow-600 font-bold text-base w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
                            >
                                +
                            </button>
                            </div>
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#d4af37] text-black font-bold py-1.5 rounded-lg hover:bg-yellow-500 transition text-[11px] uppercase tracking-wide w-full"
                        >
                            ADD {product.qty > 0 && `(${product.qty})`}
                        </button>
                        </div>
                    </div>

                    {/* Desktop: Row layout */}
                    <div className="hidden sm:flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                        <button
                            onClick={() => handleDecrement(product.id)}
                            className="text-gray-600 hover:text-black font-bold text-xl w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition"
                            disabled={product.qty <= 1} // Disabled when qty is 1
                        >
                            -
                        </button>
                        <span className="font-semibold min-w-[30px] text-center text-gray-800">
                            {product.qty}
                        </span>
                        <button
                            onClick={() => handleIncrement(product.id)}
                            className="text-[#d4af37] hover:text-yellow-600 font-bold text-xl w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-200 transition"
                        >
                            +
                        </button>
                        </div>

                        {/* Add Button */}
                        <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#d4af37] text-black font-bold px-5 py-2 rounded-lg hover:bg-yellow-500 transition text-sm uppercase tracking-wide"
                        >
                        ADD {product.qty > 0 && `(${product.qty})`}
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </section>

        {/* Cart Sidebar - Responsive */}
        {/* {Object.keys(cartItems).length > 0 && (
            <div className="fixed right-0 sm:right-4 bottom-0 sm:top-20 bg-white rounded-t-xl sm:rounded-lg shadow-xl p-4 w-full sm:w-80 max-h-96 overflow-y-auto border sm:border">
            <h3 className="font-bold text-lg mb-3">Your Cart</h3>
            {Object.values(cartItems).map((item) => (
                <div key={item.id} className="mb-3 pb-3 border-b">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">
                    ${item.price.toFixed(2)} × {item.cartQty} = ${(item.price * item.cartQty).toFixed(2)}
                </div>
                </div>
            ))}
            <div className="mt-3 pt-3 border-t font-bold">
                Total: ${getTotalPrice().toFixed(2)}
            </div>
            </div>
        )} */}
        </>
    );
};

export default Menu;