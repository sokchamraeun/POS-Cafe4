import React, { useState } from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ 
    isOpen, 
    onClose, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice, 
    totalItems,
}) => {
    const [showMenuPanel, setShowMenuPanel] = useState(false);
    const navigate = useNavigate();
    
    if (!isOpen) return null;

    const getCustomizationsDisplay = (item) => {
        if (!item.customizations) return null;
        
        const { size, milk, sweetness, addOns, specialInstructions } = item.customizations;
        const customizations = [];
        
        if (size) customizations.push(`Size: ${size}`);
        if (milk) customizations.push(`Milk: ${milk}`);
        if (sweetness) customizations.push(`Sweetness: ${sweetness}`);
        if (addOns && addOns.length > 0) customizations.push(`Add-ons: ${addOns.join(', ')}`);
        if (specialInstructions) customizations.push(`Note: ${specialInstructions}`);
        
        return customizations;
    };

    const deliveryFee = 0;
    const tax = 0;
    const grandTotal = totalPrice;

    const handleRemoveItem = (item) => {
        const removeKey = item.uniqueKey || item.id;
        removeFromCart(removeKey);
    };

    const handleCheckoutClick = () => {
        onClose();
        navigate('/checkout', {
            state: {
                cartItems: Object.values(cartItems),
                totalPrice: totalPrice,
                totalItems: totalItems,
                deliveryFee: deliveryFee,
                tax: tax,
                grandTotal: grandTotal
            }
        });
    };

    return (
        <>
            {/* NO OVERLAY - Menu remains fully interactive */}
            {/* Removed the overlay div completely */}
            
            {/* Sidebar only - slides in from right */}
            <div className="fixed right-0 top-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col animate-slideIn">
                {/* Header */}
                <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-gradient-to-r from-amber-500 to-amber-600 text-white">
                    <div>
                        <h2 className="text-xl font-bold">Your Cart</h2>
                        <p className="text-sm opacity-90">{totalItems} item(s)</p>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setShowMenuPanel(!showMenuPanel)}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
                            title="Browse Menu"
                        >
                            <FaShoppingBag className="w-5 h-5" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
                            <FaTimes className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Menu Panel - Shows hint */}
                {showMenuPanel && (
                    <div className="flex-shrink-0 border-b bg-gradient-to-r from-amber-50 to-yellow-50 p-4">
                        <div className="text-center">
                            <FaShoppingBag className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                            <h3 className="font-bold text-gray-800 mb-2">Add More Items</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Click on any product in the main menu to add it to your cart
                            </p>
                            <button
                                onClick={() => setShowMenuPanel(false)}
                                className="bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition text-sm"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}

                {/* Body - Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {Object.keys(cartItems).length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 18v3" />
                            </svg>
                            <p className="text-gray-500 text-lg">Your cart is empty</p>
                            <p className="text-gray-400 text-sm mt-2">Add some delicious items from the menu!</p>
                        </div>
                    ) : (
                        Object.values(cartItems).map((item) => (
                            <div key={item.uniqueKey || item.id} className="bg-gray-50 rounded-lg p-3 flex gap-3">
                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-white flex-shrink-0">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/80?text=Product';
                                        }}
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.subname}</p>
                                            
                                            {item.customizations && (
                                                <div className="mt-2 text-xs space-y-0.5">
                                                    {getCustomizationsDisplay(item).map((custom, idx) => (
                                                        <div key={idx} className="text-gray-600 flex items-start gap-1">
                                                            <span className="text-amber-500">•</span>
                                                            <span>{custom}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button 
                                            onClick={() => handleRemoveItem(item)}
                                            className="text-red-500 hover:text-red-700 transition p-1 flex-shrink-0"
                                        >
                                            <FaTrash className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-amber-600 font-bold">
                                            ${(item.finalPrice || item.price).toFixed(2)}
                                        </div>
                                        
                                        <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1">
                                            <button 
                                                onClick={() => updateQuantity(item.uniqueKey || item.id, item.cartQty - 1)}
                                                className="text-gray-600 hover:text-amber-600 transition p-1 w-6 h-6 flex items-center justify-center rounded"
                                                disabled={item.cartQty <= 1}
                                            >
                                                <FaMinus className="w-3 h-3" />
                                            </button>
                                            <span className="font-semibold min-w-[30px] text-center text-sm">{item.cartQty}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.uniqueKey || item.id, item.cartQty + 1)}
                                                className="text-gray-600 hover:text-amber-600 transition p-1 w-6 h-6 flex items-center justify-center rounded"
                                            >
                                                <FaPlus className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <div className="text-gray-800 font-semibold text-sm">
                                            ${((item.finalPrice || item.price) * item.cartQty).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer - Simplified without promo code */}
                {Object.keys(cartItems).length > 0 && (
                    <div className="flex-shrink-0 bg-white border-t p-4 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-800 text-lg">Total</span>
                            <span className="font-bold text-2xl text-amber-600">${grandTotal.toFixed(2)}</span>
                        </div>

                        <div className="space-y-2">
                            <button 
                                onClick={handleCheckoutClick} 
                                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-md"
                            >
                                Checkout
                            </button>
                            <button onClick={onClose} className="w-full text-gray-600 hover:text-amber-600 transition text-sm font-semibold py-2">
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default CartSidebar;