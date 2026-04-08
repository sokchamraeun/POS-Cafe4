// src/components/customer/Modals/CustomizeModal.jsx
import React, { useState } from 'react';

const CustomizeModal = ({ product, onClose, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Medium');
    const [selectedMilk, setSelectedMilk] = useState(product.milkOptions?.[0] || 'Whole Milk');
    const [selectedSweetness, setSelectedSweetness] = useState(product.sweetnessLevels?.[2] || '50%');
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [specialInstructions, setSpecialInstructions] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Size options with prices
    const sizeOptions = [
        { name: 'Small', price: 0 },
        { name: 'Medium', price: 0.50 },
        { name: 'Large', price: 1.00 }
    ];

    const milkOptions = ['Whole Milk', 'Almond Milk', 'Oat Milk', 'Soy Milk', 'Coconut Milk'];
    const sweetnessLevels = ['0%', '25%', '50%', '75%', '100%'];
    const addOnsOptions = [
        { name: 'Extra Espresso Shot', price: 0.75 },
        { name: 'Vanilla Syrup', price: 0.50 },
        { name: 'Caramel Drizzle', price: 0.50 },
        { name: 'Whipped Cream', price: 0.25 },
        { name: 'Chocolate Powder', price: 0.25 }
    ];

    const handleAddOnToggle = (addOn) => {
        setSelectedAddOns(prev => 
            prev.find(a => a.name === addOn.name)
                ? prev.filter(a => a.name !== addOn.name)
                : [...prev, addOn]
        );
    };

    // Calculate final price
    const calculateFinalPrice = () => {
        const sizePrice = sizeOptions.find(s => s.name === selectedSize)?.price || 0;
        const addOnsPrice = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
        return product.price + sizePrice + addOnsPrice;
    };

    const finalPrice = calculateFinalPrice();

    const handleAddToCart = () => {
        const customizedItem = {
            id: `${product.id}-${Date.now()}`, // Unique ID for customized item
            originalId: product.id,
            name: product.name,
            subname: product.subname,
            image: product.image,
            basePrice: product.price,
            finalPrice: finalPrice,
            cartQty: quantity,
            customizations: {
                size: selectedSize,
                milk: selectedMilk,
                sweetness: selectedSweetness,
                addOns: selectedAddOns.map(a => a.name),
                specialInstructions: specialInstructions
            },
            hasCustomizations: true
        };

        onAddToCart(customizedItem);
    };

    return (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Customize {product.name}</h2>
                        <p className="text-gray-500 text-sm">Make it your way!</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-3xl"
                    >
                        ×
                    </button>
                </div>

                {/* Product Image */}
                <div className="px-6 pt-4">
                    <div className="flex gap-4 items-center">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div>
                            <h3 className="font-bold text-lg">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.subname}</p>
                            <p className="text-[#d4af37] font-bold">Base: ${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                </div>

                {/* Customization Options */}
                <div className="px-6 py-4 space-y-6">
                    {/* Size Selection */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Select Size</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {sizeOptions.map(size => (
                                <button
                                    key={size.name}
                                    onClick={() => setSelectedSize(size.name)}
                                    className={`p-3 border-2 rounded-lg text-center transition ${
                                        selectedSize === size.name
                                            ? 'border-[#d4af37] bg-yellow-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <div className="font-semibold">{size.name}</div>
                                    {size.price > 0 && (
                                        <div className="text-xs text-gray-500">+${size.price.toFixed(2)}</div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Milk Selection */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Milk Type</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {milkOptions.map(milk => (
                                <button
                                    key={milk}
                                    onClick={() => setSelectedMilk(milk)}
                                    className={`px-3 py-2 border rounded-lg text-sm transition ${
                                        selectedMilk === milk
                                            ? 'border-[#d4af37] bg-yellow-50 text-[#d4af37]'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {milk}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sweetness Level */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Sweetness Level</h3>
                        <div className="flex gap-2 flex-wrap">
                            {sweetnessLevels.map(level => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedSweetness(level)}
                                    className={`px-4 py-2 border rounded-lg transition ${
                                        selectedSweetness === level
                                            ? 'border-[#d4af37] bg-yellow-50 text-[#d4af37] font-semibold'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add-ons */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Add-ons</h3>
                        <div className="space-y-2">
                            {addOnsOptions.map(addOn => (
                                <label key={addOn.name} className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedAddOns.find(a => a.name === addOn.name)}
                                            onChange={() => handleAddOnToggle(addOn)}
                                            className="w-4 h-4 text-[#d4af37]"
                                        />
                                        <span>{addOn.name}</span>
                                    </div>
                                    <span className="text-sm text-gray-500">+${addOn.price.toFixed(2)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Special Instructions */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-3">Special Instructions</h3>
                        <textarea
                            value={specialInstructions}
                            onChange={(e) => setSpecialInstructions(e.target.value)}
                            placeholder="e.g., Extra hot, less ice, etc."
                            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:border-[#d4af37]"
                            rows="2"
                        />
                    </div>
                </div>

                {/* Footer with Quantity and Price */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-gray-600">Quantity:</span>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="text-gray-600 hover:text-black font-bold text-xl w-8"
                                >
                                    -
                                </button>
                                <span className="font-semibold min-w-[30px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="text-[#d4af37] hover:text-yellow-600 font-bold text-xl w-8"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500">Total Price</div>
                            <div className="text-2xl font-bold text-[#d4af37]">
                                ${(finalPrice * quantity).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="flex-1 px-6 py-3 bg-[#d4af37] text-black rounded-lg hover:bg-yellow-500 transition font-semibold"
                        >
                            Add to Cart - ${(finalPrice * quantity).toFixed(2)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizeModal;