import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dashboard from "./POS/Dashboard";
import CartSidebar from "./components/customer/CartSidebar";
import useCart from "./hooks/useCart";

function App() {
    const {
        cartItems,
        isCartOpen,
        totalItems,
        totalPrice,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        closeCart,
        openCart,
        checkout,
    } = useCart();

    return (
        <BrowserRouter>
            <Routes>
                {/* Home page */}
                <Route path="/" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar 
                            cartCount={totalItems} 
                            onCartClick={openCart}
                        />
                        <Hero />
                        <Menu 
                            cartItems={cartItems}
                            onAddToCart={addToCart}
                            onClearCart={clearCart}
                        />
                        <Footer />
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
                
                {/* Menu page */}
                <Route path="/menu" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar 
                            cartCount={totalItems} 
                            onCartClick={openCart}
                        />
                        <Menu 
                            cartItems={cartItems}
                            onAddToCart={addToCart}
                            onClearCart={clearCart}
                        />
                        <Footer />
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
                
                {/* Dashboard page */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Login page */}
                <Route path="/login" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar cartCount={totalItems} onCartClick={openCart} />
                        <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
                            <div className="max-w-md w-full mx-4">
                                <div className="bg-white rounded-lg shadow-xl p-8">
                                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Welcome Back! 👋</h1>
                                    <p className="text-center text-gray-500 mb-8">Sign in to continue</p>
                                    <form className="space-y-5">
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
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
                
                {/* Location page */}
                <Route path="/location" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar cartCount={totalItems} onCartClick={openCart} />
                        <div className="flex-1">
                            <div className="max-w-7xl mx-auto px-4 py-12">
                                <h1 className="text-4xl font-bold text-center mb-4">Our Location 📍</h1>
                                <p className="text-center text-gray-600 mb-8">Visit us at our cozy coffee shop</p>
                                
                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Coffee Shop Main Store</h2>
                                        <div className="space-y-3 text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                123 Coffee Street, Downtown District
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                (555) 123-4567
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                hello@coffeeshop.com
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white rounded-lg shadow-md p-6">
                                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Opening Hours 🕐</h2>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="font-semibold">Monday - Friday</span>
                                                <span className="text-gray-600">7:00 AM - 10:00 PM</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="font-semibold">Saturday</span>
                                                <span className="text-gray-600">8:00 AM - 11:00 PM</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="font-semibold">Sunday</span>
                                                <span className="text-gray-600">8:00 AM - 9:00 PM</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center shadow-inner">
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        <p className="text-gray-500 text-lg">Interactive Map Coming Soon</p>
                                        <p className="text-gray-400 text-sm">Google Maps integration will be available here</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer />
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
                
                {/* Profile page */}
                <Route path="/profile" element={
                    <div className="min-h-screen flex flex-col">
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
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
                
                {/* 404 page */}
                <Route path="*" element={
                    <div className="min-h-screen flex flex-col">
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
                        <CartSidebar 
                            isOpen={isCartOpen}
                            onClose={closeCart}
                            cartItems={cartItems}
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                            totalPrice={totalPrice}
                            totalItems={totalItems}
                            onCheckout={checkout}
                        />
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;