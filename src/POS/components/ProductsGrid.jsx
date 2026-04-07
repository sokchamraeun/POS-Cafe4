import React, { useState } from 'react';
import CheckoutSidebar from './CheckoutSidebar';

const ProductsGrid = ({ products, onAddToCart, cart, onUpdateQuantity, onQuantityInput, onRemoveItem, onCheckout }) => {
    const [quantities, setQuantities] = useState(() => {
        const initialQuantities = {};
        products.forEach(product => {
            initialQuantities[product.id] = 1;
        });
        return initialQuantities;
    });

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, (prev[productId] || 1) + delta)
        }));
    };

    const handleQuantityInput = (productId, value) => {
        const numValue = parseInt(value) || 1;
        setQuantities(prev => ({
            ...prev,
            [productId]: Math.max(1, Math.min(999, numValue))
        }));
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        onAddToCart(product, quantity);
        setQuantities(prev => ({ ...prev, [product.id]: 1 }));
    };

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/400x400/e2e8f0/64748b?text=Coffee';
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Products Grid Section - Responsive for 1194px and below */}
            <div className="flex-1 min-w-0">
                {/* Responsive grid: 
                    - mobile: 1 column (min-width: 0)
                    - small tablets: 2 columns (sm: 640px)
                    - tablets: 3 columns (md: 768px)
                    - desktop: 3 columns (lg: 1024px)
                    - large desktop: 4 columns (xl: 1280px)
                    - 1194px falls into lg range, so shows 3 columns
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    {products.map((product) => (
                        <div 
                            key={product.id} 
                            className="bg-white  shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-amber-200 group"
                        >
                            {/* Product Image - Square with coffee styling */}
                            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 ">
                                <img 
                                    src={product.image || 'https://placehold.co/400x400/e2e8f0/64748b?text=Coffee'}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={handleImageError}
                                />
                                {product.isBest && (
                                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md z-10">
                                        BEST
                                    </div>
                                )}
                                {/* Dark overlay on hover for better interaction feedback */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 rounded-t-2xl"></div>
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-4">
                                <div className="mb-2">
                                    <h3 className="font-bold text-gray-800 text-base uppercase tracking-wide">{product.name}</h3>
                                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                                </div>
                                
                                <div className="text-amber-600 font-bold text-xl mb-3">
                                    ${product.price.toFixed(2)}
                                </div>
                                
                                {/* Quantity + Add Button - Responsive layout */}
                                <div className="flex items-center justify-between gap-2">
                                    {/* Quantity Controls - Compact but usable */}
                                    <div className="flex items-center bg-gray-100 px-1 overflow-hidden">
                                        <button 
                                            onClick={() => handleQuantityChange(product.id, -1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors font-bold text-lg hover:bg-gray-200"
                                            aria-label="Decrease quantity"
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number"
                                            value={quantities[product.id] || 1}
                                            onChange={(e) => handleQuantityInput(product.id, e.target.value)}
                                            className="w-10 text-center font-semibold text-gray-800 text-sm bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            min="1"
                                            max="999"
                                        />
                                        <button 
                                            onClick={() => handleQuantityChange(product.id, 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors font-bold text-lg hover:bg-gray-200"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="bg-amber-500 text-white px-4 py-2   font-semibold text-sm hover:bg-amber-600 transition-all hover:scale-105 active:scale-95 shadow-sm hover:shadow-md whitespace-nowrap"
                                    >
                                        <i className="fas fa-plus mr-1 text-xs"></i> ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checkout Sidebar Section - Fixed width on desktop */}
            <div className="md:w-[260px] xl:w-[370px]  w-full  md:sticky md:top-6">
                <CheckoutSidebar 
                    cart={cart}
                    onUpdateQuantity={onUpdateQuantity}
                    onQuantityInput={onQuantityInput}
                    onRemoveItem={onRemoveItem}
                    onCheckout={onCheckout}
                />
            </div>
        </div>
    );
};

export default ProductsGrid;