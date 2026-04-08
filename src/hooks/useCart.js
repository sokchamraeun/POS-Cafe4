// src/hooks/useCart.js
import { useState, useEffect, useRef, useCallback } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : {};
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    
    const addTimeoutRef = useRef(null);
    const lastAddedRef = useRef(null);

    // Auto-hide notification after 2 seconds
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Calculate total items
    const totalItems = Object.values(cartItems).reduce((total, item) => total + (item.cartQty || 0), 0);

    // Calculate total price
    const totalPrice = Object.values(cartItems).reduce((total, item) => {
        const price = item.finalPrice || item.price || 0;
        const quantity = item.cartQty || 0;
        return total + (price * quantity);
    }, 0);

    // Generate unique key for customized items
    const getItemKey = (item) => {
        if (item.customizations) {
            const { size, milk, sweetness, addOns } = item.customizations;
            const custString = `${size || ''}|${milk || ''}|${sweetness || ''}|${addOns ? [...addOns].sort().join(',') : ''}`;
            return `${item.originalId || item.id}_${custString}`;
        }
        return item.id.toString();
    };

    // Remove from cart (defined first so it can be used in updateQuantity)
    const removeFromCart = useCallback((itemId) => {
        const item = cartItems[itemId];
        
        setCartItems(prevItems => {
            const newItems = { ...prevItems };
            delete newItems[itemId];
            return newItems;
        });
        
        if (item) {
            setNotification({
                message: `✓ ${item.name} removed from cart`,
                type: 'info'
            });
            setTimeout(() => setNotification(null), 1500);
        }
    }, [cartItems]);

    // Update quantity
    const updateQuantity = useCallback((itemId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(itemId);
            return;
        }
        
        setCartItems(prevItems => {
            const item = prevItems[itemId];
            if (!item) return prevItems;
            
            setNotification({
                message: `✓ ${item.name} quantity updated to ${newQuantity}`,
                type: 'info'
            });
            setTimeout(() => setNotification(null), 1500);
            
            return {
                ...prevItems,
                [itemId]: {
                    ...item,
                    cartQty: newQuantity,
                    lastUpdated: Date.now()
                }
            };
        });
    }, [removeFromCart]); // ✅ Added dependency

    // Add to cart
    const addToCart = useCallback((item) => {
        if (addTimeoutRef.current) {
            clearTimeout(addTimeoutRef.current);
        }
        
        const itemKey = getItemKey(item);
        const addQuantity = item.cartQty || 1;
        
        const now = Date.now();
        if (lastAddedRef.current === itemKey && now - lastAddedRef.current.time < 300) {
            console.log('Duplicate add prevented');
            return;
        }
        
        lastAddedRef.current = { key: itemKey, time: now };
        
        addTimeoutRef.current = setTimeout(() => {
            setCartItems(prevItems => {
                const existingItem = prevItems[itemKey];
                
                if (existingItem) {
                    const newQuantity = existingItem.cartQty + addQuantity;
                    
                    setNotification({
                        message: `✓ ${item.name} quantity updated to ${newQuantity}!`,
                        type: 'success'
                    });
                    
                    return {
                        ...prevItems,
                        [itemKey]: {
                            ...existingItem,
                            cartQty: newQuantity,
                            lastUpdated: Date.now()
                        }
                    };
                }
                
                setNotification({
                    message: `✓ ${item.customizations ? item.name + ' (Customized)' : item.name} added to cart!`,
                    type: 'success'
                });
                
                return {
                    ...prevItems,
                    [itemKey]: {
                        ...item,
                        uniqueKey: itemKey,
                        cartQty: addQuantity,
                        addedAt: Date.now()
                    }
                };
            });
        }, 100);
    }, []);

    // Clear cart
    const clearCart = useCallback(() => {
        setCartItems({});
        setNotification({
            message: `✓ Cart cleared successfully`,
            type: 'info'
        });
        setTimeout(() => setNotification(null), 1500);
    }, []);

    // Checkout
    const checkout = useCallback(() => {
        if (Object.keys(cartItems).length === 0) {
            setNotification({
                message: `⚠ Your cart is empty!`,
                type: 'error'
            });
            setTimeout(() => setNotification(null), 2000);
            return;
        }
        setNotification({
            message: `🎉 Order placed successfully! Total: $${totalPrice.toFixed(2)}`,
            type: 'success'
        });
        clearCart();
        setIsCartOpen(false);
        setTimeout(() => setNotification(null), 3000);
    }, [cartItems, totalPrice, clearCart]);

    // Open/Close cart
    const openCart = useCallback(() => {
        setIsCartOpen(true);
    }, []);

    const closeCart = useCallback(() => {
        setIsCartOpen(false);
    }, []);

    return {
        cartItems,
        isCartOpen,
        totalItems,
        totalPrice,
        notification,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        closeCart,
        openCart,
        checkout,
    };
};

export default useCart;