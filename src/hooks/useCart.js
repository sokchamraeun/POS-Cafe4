// src/hooks/useCart.js
import { useState, useEffect } from 'react';

const useCart = () => {
    // Cart state management
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('coffeeShopCart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('coffeeShopCart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Calculate total items
    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, item) => total + item.cartQty, 0);
    };

    // Calculate total price
    const getTotalPrice = () => {
        return Object.values(cartItems).reduce((total, item) => total + (item.price * item.cartQty), 0);
    };

    // Add to cart
    const addToCart = (product) => {
        setCartItems(prev => {
            const existingItem = prev[product.id];
            return {
                ...prev,
                [product.id]: {
                    ...product,
                    cartQty: existingItem ? existingItem.cartQty + product.qty : product.qty,
                },
            };
        });
    };

    // Add to cart and open sidebar
    const addToCartAndOpen = (product) => {
        addToCart(product);
        setIsCartOpen(true);
    };

    // Update quantity
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            const newCart = { ...cartItems };
            delete newCart[id];
            setCartItems(newCart);
        } else {
            setCartItems(prev => ({
                ...prev,
                [id]: {
                    ...prev[id],
                    cartQty: newQuantity,
                },
            }));
        }
    };

    // Remove from cart
    const removeFromCart = (id) => {
        const newCart = { ...cartItems };
        delete newCart[id];
        setCartItems(newCart);
    };

    // Clear cart
    const clearCart = () => {
        setCartItems({});
    };

    // Close cart sidebar
    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Open cart sidebar
    const openCart = () => {
        setIsCartOpen(true);
    };

    // Toggle cart sidebar
    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    // Checkout
    const checkout = () => {
        if (Object.keys(cartItems).length > 0) {
            const subtotal = getTotalPrice();
            const deliveryFee = 2.00;
            const tax = subtotal * 0.1;
            const grandTotal = subtotal + deliveryFee + tax;
            
            alert(`✅ Order placed successfully!\n\n📋 Order Summary:\n━━━━━━━━━━━━━━━━━━━━\n🛒 Subtotal: $${subtotal.toFixed(2)}\n🚚 Delivery Fee: $${deliveryFee.toFixed(2)}\n📊 Tax (10%): $${tax.toFixed(2)}\n━━━━━━━━━━━━━━━━━━━━\n💰 Total: $${grandTotal.toFixed(2)}\n\nThank you for your order! ☕`);
            
            setCartItems({});
            setIsCartOpen(false);
            return true;
        }
        return false;
    };

    return {
        // State
        cartItems,
        isCartOpen,
        
        // Computed values
        totalItems: getTotalCartItems(),
        totalPrice: getTotalPrice(),
        
        // Actions
        addToCart,
        addToCartAndOpen,
        updateQuantity,
        removeFromCart,
        clearCart,
        closeCart,
        openCart,
        toggleCart,
        checkout,
    };
};

export default useCart;