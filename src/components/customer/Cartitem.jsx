// src/components/customer/Cartitem.jsx
import React from 'react';

const Cartitem = ({ item, onUpdateQuantity, onRemoveItem }) => {
    const handleQuantityChange = (delta) => {
        const newQty = Math.max(1, item.cartQty + delta);
        onUpdateQuantity(item.id, newQty);
    };

    const handleQuantityInput = (value) => {
        const numValue = parseInt(value) || 1;
        onUpdateQuantity(item.id, Math.max(1, Math.min(999, numValue)));
    };

    return (
        <div className="bg-gray-50 rounded-xl p-3 flex gap-3 hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => e.target.src = 'https://via.placeholder.com/80?text=Coffee'}
                />
            </div>
            
            {/* Product Details */}
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold text-gray-800">{item.name}</h3>
                        <p className="text-xs text-gray-500">{item.subname || item.description}</p>
                    </div>
                    <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition p-1"
                        aria-label="Remove item"
                    >
                        <i className="fas fa-trash-alt text-sm"></i>
                    </button>
                </div>
                
                <div className="mt-2 flex justify-between items-center">
                    <div className="text-[#d4af37] font-bold">
                        ${item.price.toFixed(2)}
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-white rounded-lg border px-2 py-1">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="text-gray-600 hover:text-black font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
                        >
                            -
                        </button>
                        <input 
                            type="number"
                            value={item.cartQty}
                            onChange={(e) => handleQuantityInput(e.target.value)}
                            className="w-10 text-center font-semibold text-sm bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            min="1"
                            max="999"
                        />
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="text-[#d4af37] hover:text-yellow-600 font-bold w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 transition"
                        >
                            +
                        </button>
                    </div>
                </div>
                
                <div className="text-right text-sm font-semibold mt-2 text-gray-700">
                    Subtotal: ${(item.price * item.cartQty).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Cartitem;