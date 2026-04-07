import React, { useEffect, useRef } from 'react';

const CheckoutSidebar = ({ cart, onUpdateQuantity, onQuantityInput, onRemoveItem, onCheckout }) => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const scrollContainerRef = useRef(null);

    // Auto-scroll to bottom when new items are added
    useEffect(() => {
        if (scrollContainerRef.current && cart.length > 0) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [cart]);

    const handleImageError = (e) => {
        e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
    };

    // Prevent scroll from propagating to body
    const handleWheel = (e) => {
        const container = scrollContainerRef.current;
        if (container) {
            const isAtTop = container.scrollTop === 0;
            const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
            
            if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    // Handle remove item - only if quantity > 0
    const handleRemoveItem = (itemId, currentQuantity) => {
        if (currentQuantity > 0) {
            onRemoveItem(itemId);
        }
    };

    // Handle update quantity - prevent going below 0
    const handleUpdateQuantity = (itemId, currentQuantity, delta) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity >= 0) {
            if (newQuantity === 0) {
                onRemoveItem(itemId);
            } else {
                onUpdateQuantity(itemId, delta);
            }
        }
    };

    // Prevent touch move on body when scrolling inside sidebar
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleTouchMove = (e) => {
            const isAtTop = container.scrollTop === 0;
            const isAtBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
            const touchY = e.touches[0].clientY;
            const previousTouchY = container.dataset.previousTouchY;
            
            if (previousTouchY) {
                const delta = touchY - previousTouchY;
                if ((isAtTop && delta > 0) || (isAtBottom && delta < 0)) {
                    e.preventDefault();
                }
            }
            container.dataset.previousTouchY = touchY;
        };

        const handleTouchEnd = () => {
            delete container.dataset.previousTouchY;
        };

        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);

        return () => {
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return (
        <div className="w-full xl:w-[400px] md:w-[290px] bg-white mt-21 shadow-2xl flex flex-col h-auto lg:h-screen max-h-[calc(100vh-80px)] lg:fixed lg:right-0 lg:top-0 border-t lg:border-t-0 lg:border-l border-gray-200 z-50">
            {/* Header */}
            <div className="p-5 border-b bg-gradient-to-r from-amber-500 to-amber-600 text-white flex-shrink-0">
                <h2 className="text-xl lg:text-xl font-bold flex items-center gap-3">
                    🛒 Current Order
                    {totalItems > 0 && (
                        <span className="bg-white text-amber-600 text-sm px-3 py-1 rounded-full">
                            {totalItems} items
                        </span>
                    )}
                </h2>
                <p className="text-sm text-white/80 mt-1">Review and checkout your order</p>
            </div>

            {/* Cart Items - Scrollable Area with fixed scrolling */}
            <div 
                ref={scrollContainerRef}
                onWheel={handleWheel}
                className="flex-1 overflow-y-auto p-4 lg:p-5 space-y-3"
                style={{ 
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                    maxHeight: 'calc(100vh - 280px)'
                }}
            >
                {cart.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                        <span className="text-7xl mb-4 block">🛒</span>
                        <p className="text-base font-medium">No items in cart</p>
                        <p className="text-sm mt-2">Add items from the menu</p>
                    </div>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-xl p-3 hover:shadow-md transition-all">
                            <div className="flex gap-3">
                                {/* Product Image */}
                                <div className="flex-shrink-0 text-center">
                                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg overflow-hidden bg-amber-100 mb-2">
                                        <img 
                                            src={item.image || 'https://via.placeholder.com/64x64?text=Coffee'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                        />
                                    </div>
                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-center space-x-1">
                                        <button 
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                            className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors font-bold text-sm lg:text-base rounded hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <input 
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => onQuantityInput(item.id, e.target.value)}
                                            className="w-8 lg:w-10 text-center font-semibold text-gray-800 text-sm bg-transparent focus:outline-none"
                                            min="0"
                                            max="999"
                                        />
                                        <button 
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                            className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-gray-600 hover:text-amber-600 transition-colors font-bold text-sm lg:text-base rounded hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Product Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-800 text-xs lg:text-sm uppercase truncate">{item.name}</h3>
                                            <p className="text-xs text-gray-500 truncate">{item.description}</p>
                                            <div className="text-amber-600 font-bold text-xs lg:text-sm mt-1">
                                                ${item.price.toFixed(2)}
                                            </div>
                                        </div>
                                        {/* Remove button - only show when quantity > 0 */}
                                        {item.quantity > 0 && (
                                            <button 
                                                onClick={() => handleRemoveItem(item.id, item.quantity)}
                                                className="text-red-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                                                title="Remove item"
                                            >
                                                <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* Total Price */}
                                    <div className="text-right mt-2">
                                        <p className="font-bold text-amber-600 text-sm lg:text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Order Summary - Fixed at bottom */}
            {cart.length > 0 && (
                <div className="border-t p-4 lg:p-5 space-y-3 lg:space-y-4 bg-gray-50 flex-shrink-0 shadow-lg">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal:</span>
                            <span className="font-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base lg:text-lg font-bold pt-2 border-t">
                            <span>Total:</span>
                            <span className="text-amber-600">${total.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                        <button 
                            onClick={() => alert('Cash payment selected. Total: $' + total.toFixed(2))}
                            className="bg-green-500 text-white py-2 lg:py-2.5 rounded-xl font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2 text-xs lg:text-sm"
                        >
                            💵 Cash
                        </button>
                        <button 
                            onClick={() => alert('KHQR payment selected. Total: $' + total.toFixed(2))}
                            className="bg-purple-500 text-white py-2 lg:py-2.5 rounded-xl font-semibold hover:bg-purple-600 transition flex items-center justify-center gap-2 text-xs lg:text-sm"
                        >
                            📱 KHQR
                        </button>
                    </div>
                    
                    {/* Checkout Button */}
                    <button 
                        onClick={onCheckout}
                        disabled={cart.length === 0}
                        className={`w-full py-3 lg:py-3.5 rounded-xl font-bold text-sm lg:text-base transition-all duration-200 shadow-md ${
                            cart.length === 0 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-amber-500 text-white hover:bg-amber-600 hover:scale-[1.02]'
                        }`}
                    >
                        Complete Order 🚀
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckoutSidebar;