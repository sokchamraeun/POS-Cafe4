import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/HeroSection";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Dashboard from "./POS/Dashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home page */}
                <Route path="/" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar/>
                        <Hero/>
                        <Menu/>
                        <Footer/>
                    </div>
                } />
                
                {/* Dashboard page - No Navbar/Footer because Dashboard has its own layout */}
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Menu page */}
                <Route path="/menu" element={
                    <div className="min-h-screen flex flex-col">
                        <Navbar/>
                        <Menu/>
                        <Footer/>
                    </div>
                } />
                
                {/* Optional: Add a 404 Not Found route */}
                <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                            <p className="text-xl text-gray-600 mb-8">Page not found</p>
                            <a href="/" className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition">
                                Go Back Home
                            </a>
                        </div>
                    </div>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;