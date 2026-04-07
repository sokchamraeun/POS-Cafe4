import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Dashboard from '../POS/Dashboard';

const Navbar = ({ cartCount = 0, onCartClick }) => {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

const isLoggedIn = false;

return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' : 'bg-white shadow-md py-5'
    }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile: 2 columns | Desktop: 3 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">
            
            {/* Column 1: Logo and Name */}
            <div className="flex justify-start">
            <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
                <div className="relative">
                <img 
                    width={56} 
                    height={56} 
                    src="https://imgs.search.brave.com/XeSe3YQPGRPl7gtGLff25V3PxH34gtCeZn3AaU_vSNU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXN0/ZXJidW5kbGVzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8xMS9wcmV2aWV3/LTQ3LTQ5MHg0OTAu/anBn" 
                    alt="Logo"
                    className="rounded-full transition-transform group-hover:scale-105"
                />
                </div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent hidden sm:inline-block">
                Coffee Shop
                </span>
            </Link>
            </div>

            {/* Column 2: Navigation Links (Centered) - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-center space-x-10">
            <Link to="/" className="relative text-gray-700 hover:text-amber-600 transition font-semibold text-base group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/menu" className="relative text-gray-700 hover:text-amber-600 transition font-semibold text-base group">
                Menu
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/dashboard" className="relative text-gray-700 hover:text-amber-600 transition font-semibold text-base group">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/location" className="relative text-gray-700 hover:text-amber-600 transition font-semibold text-base group">
                Location
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </Link>
            </div>

            {/* Column 3: Cart Icon and Login Button (Right aligned) */}
            <div className="flex justify-end items-center space-x-4 sm:space-x-5">
            {/* Modern Cart Icon with Badge */}
            <button 
                onClick={onCartClick}
                className="relative group p-2 rounded-full bg-gray-50 group-hover:bg-amber-50 transition-all duration-300 border-0 cursor-pointer"
            >
                <FaShoppingCart className="w-6 h-6 sm:w-6 sm:h-6 text-gray-700 group-hover:text-amber-600 transition" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center shadow-lg animate-pulse">
                    {cartCount} {/* Always show 0 if cart is empty */}
                </span>
            </button>

            {/* Modern Login / Profile Button - Hidden on mobile, shown on tablet/desktop */}
            <div className="hidden sm:block">
                {isLoggedIn ? (
                <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition font-semibold text-base group"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span>Profile</span>
                </Link>
                ) : (
                <Link 
                    to="/login" 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2.5 rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 font-semibold text-base shadow-md hover:shadow-lg"
                >
                    Sign In
                </Link>
                )}
            </div>

            {/* Modern Mobile Menu Toggle Button */}
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="md:hidden relative w-11 h-11 rounded-full bg-gray-50 hover:bg-amber-50 transition-all duration-300 flex items-center justify-center focus:outline-none"
                aria-label="Toggle menu"
            >
                <div className="relative w-6 h-6">
                <span className={`absolute left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : 'top-0'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
                <span className={`absolute left-0 w-full h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : 'top-5'}`}></span>
                </div>
            </button>
            </div>
        </div>
        </div>

        {/* Mobile Menu - Modern Design */}
        {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t mt-3 shadow-xl animate-slideDown">
            <div className="px-4 py-5 space-y-3">
            <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center space-x-3 py-4 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold text-base"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                <span>Home</span>
            </Link>
            <Link 
                to="/menu" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center space-x-3 py-4 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold text-base"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>Menu</span>
            </Link>
            <Link 
                to="/dashboard" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center space-x-3 py-4 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold text-base"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3v18M21 3v18M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
                <span>Dashboard</span>
            </Link>
            <Link 
                to="/location" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center space-x-3 py-4 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold text-base"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>Location</span>
            </Link>
            
            {/* Login option in mobile menu */}
            {isLoggedIn ? (
                <Link 
                to="/profile" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center space-x-3 py-4 px-4 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-200 font-semibold text-base"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span>Profile</span>
                </Link>
            ) : (
                <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)} 
                className="flex items-center justify-center space-x-2 py-4 px-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-semibold shadow-md mt-3 text-base"
                >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Sign In</span>
                </Link>
            )}
            
            {/* Store Info */}
            <div className="pt-4 mt-2 border-t text-sm text-gray-500">
                <p className="flex items-center gap-2 px-4 py-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                7:00 AM - 10:00 PM
                </p>
                <p className="flex items-center gap-2 px-4 py-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                123 Coffee Street, NY
                </p>
            </div>
            </div>
        </div>
        )}
    </nav>

    {/* Spacer to prevent content from hiding under navbar */}
    <div className="h-20 sm:h-24"></div>

    {/* Animation styles */}
    <style>{`
        @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        }
        .animate-slideDown {
        animation: slideDown 0.3s ease-out;
        }
    `}</style>
    </>
);
};

export default Navbar;