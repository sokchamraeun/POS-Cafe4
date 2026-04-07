// src/components/customer/Shoppingcart.jsx
import React, { useState, useEffect } from 'react';
import CartItem from './Cartitem';

const Shoppingcart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onCheckout, isFullPage = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [animated, setAnimated] = useState(false);

    // Convert cartItems object to array
    const cartItemsArray = Object.values(cartItems);

    // Calculate totals
    const subtotal = cartItemsArray.reduce((sum, item) => sum + (item.price * item.cartQty), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    const totalItems = cartItemsArray.reduce((sum, item) => sum + item.cartQty, 0);

    // Animation when cart updates
    useEffect(() => {
        if (cartItemsArray.length > 0) {
            const startTimer = setTimeout(() => setAnimated(true), 0);
            const endTimer = setTimeout(() => setAnimated(false), 300);
            return () => {
                clearTimeout(startTimer);
                clearTimeout(endTimer);
            };
        }
    }, [cartItemsArray]);

    return (
        <>
            {/* Floating Cart Button - Only show when not full page */}
            {!isFullPage && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-4 right-4 z-40 bg-[#d4af37] text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-all hover:scale-110"
                >
                    <div className="relative">
                        <i className="fas fa-shopping-cart text-2xl"></i>
                        {totalItems > 0 && (
                            <span className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${animated ? 'scale-150' : 'scale-100'} transition-transform`}>
                                {totalItems}
                            </span>
                        )}
                    </div>
                </button>
            )}

            {/* Cart Sidebar */}
            {(isOpen || isFullPage) && (
                <>
                    {/* Overlay - Only for sidebar mode */}
                    {!isFullPage && (
                        <div 
                            className="fixed inset-0 bg-black bg-opacity-50 z-50"
                            onClick={() => setIsOpen(false)}
                        ></div>
                    )}

                    <div className={`fixed ${isFullPage ? 'inset-0 top-20' : 'right-0 top-0 h-full'} w-full ${isFullPage ? 'max-w-4xl mx-auto' : 'sm:w-96'} bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-[#d4af37] to-yellow-500 text-white">
                            <div>
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <i className="fas fa-shopping-cart"></i>
                                    My Cart
                                </h2>
                                <p className="text-sm opacity-90">{totalItems} item(s)</p>
                            </div>
                            {!isFullPage && (
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Cart Items */}
                        {cartItems.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8">
                                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <i className="fas fa-shopping-cart text-5xl text-gray-400"></i>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
                                <p className="text-gray-500 text-center mb-6">Looks like you haven't added any items yet</p>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="bg-[#d4af37] text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition"
                                >
                                    Browse Menu
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {cartItemsArray.map((item) => (
                                        <CartItem 
                                            key={item.id}
                                            item={item}
                                            onUpdateQuantity={onUpdateQuantity}
                                            onRemoveItem={onRemoveItem}
                                        />
                                    ))}
                                </div>

                                {/* Footer Summary */}
                                <div className="border-t p-4 bg-gray-50">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span className="font-medium">${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tax (10%):</span>
                                            <span className="font-medium">${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-base font-bold pt-2 border-t">
                                            <span>Total:</span>
                                            <span className="text-[#d4af37] text-xl">${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={onClearCart}
                                            className="flex-1 bg-red-500 text-white py-2.5 rounded-lg hover:bg-red-600 transition font-semibold"
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => {
                                                onCheckout();
                                                setIsOpen(false);
                                            }}
                                            className="flex-1 bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition font-semibold"
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Shoppingcart;