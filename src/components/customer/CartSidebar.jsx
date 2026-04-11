import React, { useState } from 'react';
import { FaTimes, FaTrash, FaPlus, FaMinus, FaShoppingBag, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomizeModal from '../Modals/CustomizeModal';

const CartSidebar = ({ 
    isOpen, 
    onClose, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice, 
    totalItems,
    onUpdateCartItem,
}) => {
    const [showMenuPanel, setShowMenuPanel] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);
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

    const handleEditItem = (item) => {
        // Prepare the product data for the customize modal
        const productForEdit = {
            id: item.originalId || item.id,
            name: item.name,
            subname: item.subname,
            price: item.basePrice || item.price,
            image: item.image,
            hasCustomizations: true,
            cartKey: item.uniqueKey || item.id, // Store the original cart key
            currentQuantity: item.cartQty,
            currentCustomizations: item.customizations,
            customizationOptions: {
                sizes: [
                    { name: 'Small', price: 0, ml: 250 },
                    { name: 'Medium', price: 0.50, ml: 350 },
                    { name: 'Large', price: 1.00, ml: 450 }
                ],
                milkOptions: [
                    { name: 'Whole Milk', price: 0 },
                    { name: 'Almond Milk', price: 0.75 },
                    { name: 'Oat Milk', price: 0.75 },
                    { name: 'Soy Milk', price: 0.75 },
                    { name: 'Coconut Milk', price: 0.75 }
                ],
                sweetnessLevels: [
                    { name: '0%', value: '0%' },
                    { name: '25%', value: '25%' },
                    { name: '50%', value: '50%' },
                    { name: '75%', value: '75%' },
                    { name: '100%', value: '100%' }
                ],
                addOns: [
                    { name: 'Extra Espresso Shot', price: 0.75 },
                    { name: 'Vanilla Syrup', price: 0.50 },
                    { name: 'Caramel Drizzle', price: 0.50 },
                    { name: 'Whipped Cream', price: 0.25 },
                    { name: 'Chocolate Powder', price: 0.25 },
                    { name: 'Cinnamon Powder', price: 0.25 }
                ],
                temperature: [
                    { name: 'Hot', price: 0 },
                    { name: 'Iced', price: 0 }
                ]
            }
        };
        
        setEditingItem(productForEdit);
        setShowCustomizeModal(true);
    };

    const handleUpdateCustomizedItem = (customizedItem) => {
        if (editingItem && editingItem.cartKey) {
            // Instead of removing and adding, update the existing item
            const updatedItem = {
                ...customizedItem,
                id: editingItem.id,
                originalId: editingItem.id,
                cartQty: customizedItem.cartQty,
                quantity: customizedItem.cartQty,
                uniqueKey: editingItem.cartKey, // Keep the same uniqueKey
                customizations: customizedItem.customizations,
                hasCustomizations: true
            };
            
            // Call update function if provided
            if (onUpdateCartItem) {
                onUpdateCartItem(editingItem.cartKey, updatedItem);
            } else {
                // Fallback: remove old and add new
                removeFromCart(editingItem.cartKey);
                const newItem = {
                    ...updatedItem,
                    uniqueKey: `${customizedItem.originalId || customizedItem.id}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`
                };
                if (onUpdateCartItem) {
                    onUpdateCartItem(newItem);
                }
            }
        }
        
        setShowCustomizeModal(false);
        setEditingItem(null);
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

                {/* Menu Panel */}
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
                            <div key={item.uniqueKey || item.id} className="bg-gray-50 rounded-lg p-3 flex gap-3 hover:shadow-md transition-all">
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
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => handleEditItem(item)}
                                                className="text-blue-500 hover:text-blue-700 transition p-1 flex-shrink-0"
                                                title="Edit item"
                                            >
                                                <FaEdit className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => handleRemoveItem(item)}
                                                className="text-red-500 hover:text-red-700 transition p-1 flex-shrink-0"
                                                title="Remove item"
                                            >
                                                <FaTrash className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-amber-600 font-bold">
                                            ${(item.finalPrice || item.price).toFixed(2)} each
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

                {/* Footer */}
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

            {/* Customize Modal for Editing */}
            {showCustomizeModal && editingItem && (
                <CustomizeModal
                    product={editingItem}
                    isEditing={true}
                    existingCustomizations={editingItem.currentCustomizations}
                    existingQuantity={editingItem.currentQuantity}
                    existingCartKey={editingItem.cartKey}
                    onClose={() => {
                        setShowCustomizeModal(false);
                        setEditingItem(null);
                    }}
                    onAddToCart={handleUpdateCustomizedItem}
                />
            )}

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