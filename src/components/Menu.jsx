import React, { useState } from "react";
import CustomizeModal from "./Modals/CustomizeModal";
import { products, categories } from "../data/products";
import CartSidebar from "./CartSidebar";

const Menu = ({ cartItems, onAddToCart, onClearCart, onUpdateCartItem, onRemoveFromCart }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [productsList, setProductsList] = useState(() => 
        products.map(product => ({
            ...product,
            qty: 1
        }))
    );
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);

    const filteredProducts =
        selectedCategory === "All"
            ? productsList
            : productsList.filter((p) => p.category === selectedCategory);

    const handleIncrement = (id) => {
        setProductsList((prev) =>
            prev.map((p) => (p.id === id ? { ...p, qty: (p.qty || 1) + 1 } : p))
        );
    };

    const handleDecrement = (id) => {
        setProductsList((prev) =>
            prev.map((p) =>
                p.id === id && (p.qty || 1) > 1 ? { ...p, qty: (p.qty || 1) - 1 } : p
            )
        );
    };

    const handleCustomizeClick = (product) => {
        setSelectedProduct(product);
        setShowCustomizeModal(true);
    };

    const handleAddCustomizedToCart = (customizedProduct) => {
        onAddToCart(customizedProduct);
        setShowCustomizeModal(false);
        setSelectedProduct(null);
        setIsCartOpen(true);
    };

    const handleAddToCart = (product) => {
        const currentQty = product.qty || 1;
        if (currentQty < 1) {
            alert("Please select quantity first!");
            return;
        }
        
        const regularItem = {
            id: product.id,
            name: product.name,
            subname: product.subname,
            price: product.price,
            image: product.image,
            cartQty: currentQty,
            customizations: null,
            hasCustomizations: false,
            finalPrice: product.price,
            // uniqueKey: `${product.id}-${Date.now()}-${Math.random()}`
        };
        
        onAddToCart(regularItem);
        
        setProductsList((prev) =>
            prev.map((p) =>
                p.id === product.id ? { ...p, qty: 1 } : p
            )
        );
        
        setIsCartOpen(true);
        
        showNotification(`${product.name} added to cart!`);
    };

    const getTotalItems = () => {
        return Object.values(cartItems).reduce((total, item) => total + (item.cartQty || 0), 0);
    };

    const getTotalPrice = () => {
        return Object.values(cartItems).reduce((total, item) => total + ((item.finalPrice || item.price) * (item.cartQty || 0)), 0);
    };

    const updateQuantity = (key, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(key);
            return;
        }
        
        if (onUpdateCartItem) {
            onUpdateCartItem(key, newQuantity);
        }
    };

    const removeFromCart = (key) => {
        if (onRemoveFromCart) {
            onRemoveFromCart(key);
        }
    };

    const showNotification = (message) => {
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in';
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    };

    const handleCheckout = () => {
        onClearCart();
        setIsCartOpen(false);
        alert("Order placed successfully!");
    };

    return (
        <>
        <header className="sticky top-0 z-30 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#d4af37]">Coffee Shop</h1>
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-2 hover:bg-gray-100 rounded-full transition"
                >
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                    </svg>
                    {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            {getTotalItems()}
                        </span>
                    )}
                </button>
            </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            {/* Cart Summary Bar */}
            <div 
                onClick={() => setIsCartOpen(true)}
                className="bg-gray-100 rounded-lg p-4 mb-8 flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-center cursor-pointer hover:bg-gray-200 transition"
            >
                <div>
                    <span className="font-semibold">Cart Summary: </span>
                    <span>{getTotalItems()} item(s)</span>
                </div>
                <div>
                    <span className="font-semibold">Total: </span>
                    <span className="text-[#d4af37] font-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                {getTotalItems() > 0 && (
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCheckout();
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
                        className={`px-4 py-2 rounded-lg border font-medium ${
                            selectedCategory === cat
                                ? "bg-[#d4af37] text-black"
                                : "bg-white text-gray-700 border-gray-300"
                        } transition text-sm sm:text-base`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid - Always interactive even when sidebar is open */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white shadow-md overflow-hidden relative group hover:shadow-xl transition-shadow duration-300 flex flex-col"
                    >
                        {product.best && (
                            <span className="absolute top-2 left-2 bg-orange-500 text-white px-1.5 py-0.5 text-[10px] sm:text-xs rounded font-semibold z-10">
                                BEST
                            </span>
                        )}

                        <div className="p-1.5 sm:p-2 pb-0">
                            <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </div>

                        <div className="p-2 sm:p-4 flex-1 flex flex-col">
                            <div className="text-[10px] sm:text-xs text-orange-400 font-semibold mb-1 sm:mb-2">
                                {product.category}
                            </div>

                            <h2 className="text-sm sm:text-xl font-bold text-gray-800 tracking-wide">
                                {product.name}
                            </h2>

                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">
                                {product.subname}
                            </p>

                            <div className="mt-1.5 sm:mt-3 flex items-center justify-between">
                                <p className="text-base sm:text-2xl font-bold text-[#d4af37]">
                                    ${product.price.toFixed(2)}
                                </p>
                                
                                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-2 py-1">
                                    <button
                                        onClick={() => handleDecrement(product.id)}
                                        className="text-gray-600 hover:text-black font-bold text-sm sm:text-xl w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded hover:bg-gray-200 transition"
                                        disabled={(product.qty || 1) <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="font-semibold min-w-[20px] sm:min-w-[30px] text-center text-gray-800 text-sm sm:text-base">
                                        {product.qty || 1}
                                    </span>
                                    <button
                                        onClick={() => handleIncrement(product.id)}
                                        className="text-[#d4af37] hover:text-yellow-600 font-bold text-sm sm:text-xl w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded hover:bg-gray-200 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-gray-100">
                                <div className="flex gap-2">
                                    {product.hasCustomizations ? (
                                        <>
                                            <button
                                                onClick={() => handleCustomizeClick(product)}
                                                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 hover:bg-gray-200 transition text-xs uppercase tracking-wide"
                                            >
                                                CUSTOMIZE
                                            </button>
                                            <button
                                                onClick={() => handleAddToCart(product)}
                                                className="flex-1 bg-[#d4af37] text-black font-bold py-2 hover:bg-yellow-500 transition text-xs uppercase tracking-wide"
                                            >
                                                ADD
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-[#d4af37] text-black font-bold py-2 hover:bg-yellow-500 transition text-xs uppercase tracking-wide"
                                        >
                                            ADD TO CART
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* Customize Modal */}
        {showCustomizeModal && selectedProduct && (
            <CustomizeModal
                product={selectedProduct}
                onClose={() => setShowCustomizeModal(false)}
                onAddToCart={handleAddCustomizedToCart}
            />
        )}

        {/* Cart Sidebar - No overlay, menu remains fully interactive */}
        <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            totalPrice={getTotalPrice()}
            totalItems={getTotalItems()}
            onCheckout={handleCheckout}
        />

        <style>{`
            @keyframes slide-in {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .animate-slide-in {
                animation: slide-in 0.3s ease-out;
            }
        `}</style>
        </>
    );
};

export default Menu;