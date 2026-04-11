import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dashboard from "./POS/Dashboard";
import CartSidebar from "./components/customer/CartSidebar";
import Checkout from "./components/Chechout";
import useCart from "./hooks/useCart";
import Location from "./components/Location";
import CustomizeModal from "./components/Modals/CustomizeModal";
import Notification from './components/Notification';
import { useState } from "react";

// Move wrapper OUTSIDE the App component
const CartSidebarWrapper = ({ 
    isOpen, 
    onClose, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice, 
    totalItems, 
    onCheckout 
}) => (
    <CartSidebar 
        isOpen={isOpen}
        onClose={onClose}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onCheckout={onCheckout}
    />
);

function App() {
    const {
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
    } = useCart();

    // State for customize modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showCustomizeModal, setShowCustomizeModal] = useState(false);

    // Handle product customization
    const handleCustomizeProduct = (product) => {
        setSelectedProduct(product);
        setShowCustomizeModal(true);
    };

    // Handle add customized product to cart
    const handleAddCustomizedToCart = (customizedProduct) => {
        const finalProduct = {
            ...customizedProduct,
            id: customizedProduct.id || `${customizedProduct.originalId}-${Date.now()}`,
            cartQty: customizedProduct.cartQty || 1,
            hasCustomizations: true,
            addedAt: new Date().toISOString()
        };
        
        addToCart(finalProduct);
        setShowCustomizeModal(false);
        setSelectedProduct(null);
        
        setTimeout(() => {
            openCart();
        }, 500);
    };

    // Handle checkout navigation
    const handleCheckout = () => {
        closeCart();
    };

    return (
        <BrowserRouter>
            <div className="min-h-screen flex flex-col relative">
                <Routes>
                    {/* Home page */}
                    <Route path="/" element={
                        <>
                            <Navbar 
                                cartCount={totalItems} 
                                onCartClick={openCart}
                            />
                            <Hero />
                            <Menu 
                                cartItems={cartItems}
                                onAddToCart={addToCart}
                                onClearCart={clearCart}
                                onCustomizeProduct={handleCustomizeProduct}
                            />
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {showCustomizeModal && selectedProduct && (
                                <CustomizeModal
                                    product={selectedProduct}
                                    onClose={() => setShowCustomizeModal(false)}
                                    onAddToCart={handleAddCustomizedToCart}
                                />
                            )}
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                    
                    {/* Menu page */}
                    <Route path="/menu" element={
                        <>
                            <Navbar 
                                cartCount={totalItems} 
                                onCartClick={openCart}
                            />
                            <Menu 
                                cartItems={cartItems}
                                onAddToCart={addToCart}
                                onClearCart={clearCart}
                                onCustomizeProduct={handleCustomizeProduct}
                            />
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {showCustomizeModal && selectedProduct && (
                                <CustomizeModal
                                    product={selectedProduct}
                                    onClose={() => setShowCustomizeModal(false)}
                                    onAddToCart={handleAddCustomizedToCart}
                                />
                            )}
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                    
                    {/* Checkout page */}
                    <Route path="/checkout" element={
                        <>
                            <Navbar 
                                cartCount={totalItems} 
                                onCartClick={openCart}
                                hideCartIcon={true}
                            />
                            <Checkout />
                            <Footer />
                        </>
                    } />
                    
                    {/* Dashboard page */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    
                    {/* Login page */}
                    <Route path="/login" element={
                        <>
                            <Navbar cartCount={totalItems} onCartClick={openCart} />
                            <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
                                <div className="max-w-md w-full mx-4">
                                    <div className="bg-white rounded-lg shadow-xl p-8">
                                        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back! 👋</h1>
                                        <p className="text-center text-gray-500 mb-8">Sign in to continue</p>
                                        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                                <input 
                                                    type="email" 
                                                    placeholder="your@email.com"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                                                <input 
                                                    type="password" 
                                                    placeholder="••••••••"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                                </label>
                                                <a href="#" className="text-sm text-amber-600 hover:text-amber-700">Forgot password?</a>
                                            </div>
                                            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2.5 rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-md font-semibold">
                                                Sign In
                                            </button>
                                        </form>
                                        <p className="text-center text-sm text-gray-600 mt-6">
                                            Don't have an account? <a href="#" className="text-amber-600 hover:underline font-semibold">Sign up</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                    
                    {/* Location page */}
                    <Route path="/location" element={
                        <>
                            <Navbar cartCount={totalItems} onCartClick={openCart} />
                            <Location/>
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                    
                    {/* Profile page */}
                    <Route path="/profile" element={
                        <>
                            <Navbar cartCount={totalItems} onCartClick={openCart} />
                            <div className="flex-1 bg-gray-50 py-12">
                                <div className="max-w-4xl mx-auto px-4">
                                    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-8">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h1 className="text-3xl font-bold text-white">Guest User</h1>
                                                    <p className="text-amber-100">Member since 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="p-6">
                                            <div className="border-b pb-4 mb-4">
                                                <h2 className="text-xl font-bold text-gray-800 mb-3">Account Information</h2>
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                                        <input type="text" value="Guest User" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                        <input type="email" value="guest@coffeeshop.com" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-800 mb-3">Order History</h2>
                                                <div className="text-center py-8">
                                                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                    </svg>
                                                    <p className="text-gray-500">No orders yet</p>
                                                    <p className="text-sm text-gray-400 mt-1">Start shopping to see your orders here</p>
                                                    <a href="/menu" className="inline-block mt-4 bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition">
                                                        Browse Menu
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                    
                    {/* 404 page */}
                    <Route path="*" element={
                        <>
                            <Navbar cartCount={totalItems} onCartClick={openCart} />
                            <div className="flex-1 flex items-center justify-center bg-gray-50">
                                <div className="text-center px-4">
                                    <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
                                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
                                    <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
                                    <a href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg hover:from-amber-600 hover:to-amber-700 transition shadow-md">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Go Back Home
                                    </a>
                                </div>
                            </div>
                            <Footer />
                            <CartSidebarWrapper 
                                isOpen={isCartOpen}
                                onClose={closeCart}
                                cartItems={cartItems}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                totalPrice={totalPrice}
                                totalItems={totalItems}
                                onCheckout={handleCheckout}
                            />
                            {notification && (
                                <Notification 
                                    message={notification.message} 
                                    type={notification.type}
                                />
                            )}
                        </>
                    } />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;