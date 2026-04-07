import React from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartSidebar = ({ 
    isOpen, 
    onClose, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice, 
    totalItems,
    onCheckout 
}) => {
    if (!isOpen) return null;

    return (
        <>
            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 animate-slideIn">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    <div>
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <p className="text-sm opacity-90">{totalItems} item(s)</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {Object.keys(cartItems).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                            </svg>
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <p className="text-gray-400 text-sm mt-2">Add some delicious items from the menu!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {Object.values(cartItems).map((item) => (
                                <div key={item.id} className="bg-gray-50 rounded-lg p-3 flex gap-3">
                                    {/* Product Image */}
                                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-gray-800">{item.name}</h3>
                                                <p className="text-xs text-gray-500">{item.subname}</p>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 transition p-1"
                                            >
                                                <FaTrash className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="text-amber-600 font-bold">
                                                ${item.price.toFixed(2)}
                                            </div>
                                            
                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.cartQty - 1)}
                                                    className="text-gray-600 hover:text-amber-600 transition p-1"
                                                    disabled={item.cartQty <= 1}
                                                >
                                                    <FaMinus className="w-3 h-3" />
                                                </button>
                                                <span className="font-semibold min-w-[30px] text-center text-sm">
                                                    {item.cartQty}
                                                </span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.cartQty + 1)}
                                                    className="text-gray-600 hover:text-amber-600 transition p-1"
                                                >
                                                    <FaPlus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-gray-800 font-semibold text-sm">
                                                ${(item.price * item.cartQty).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {Object.keys(cartItems).length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 space-y-3">
                        {/* Promo Code */}
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Promo code"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-amber-500 focus:border-amber-500"
                            />
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-semibold">
                                Apply
                            </button>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold text-lg text-gray-800">${totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Delivery Fee */}
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Delivery Fee</span>
                            <span className="text-gray-600">$2.00</span>
                        </div>

                        {/* Tax */}
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Tax (10%)</span>
                            <span className="text-gray-600">${(totalPrice * 0.1).toFixed(2)}</span>
                        </div>

                        {/* Grand Total */}
                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="font-bold text-gray-800">Total</span>
                            <span className="font-bold text-xl text-amber-600">
                                ${(totalPrice + 2 + (totalPrice * 0.1)).toFixed(2)}
                            </span>
                        </div>

                        {/* Checkout Button */}
                        <button 
                            onClick={() => {
                                onCheckout();
                                onClose();
                            }}
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-md"
                        >
                            Checkout
                        </button>

                        {/* Continue Shopping */}
                        <button 
                            onClick={onClose}
                            className="w-full text-gray-600 hover:text-amber-600 transition text-sm font-semibold"
                        >
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default CartSidebar;