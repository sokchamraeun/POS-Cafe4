    import React, { useState, useEffect } from "react";
    import { Link } from "react-router-dom";

    const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const bestSellerItems = [
        {
        id: 1,
        name: "Caramel Latte",
        description: "A rich, creamy caramel latte made with freshly brewed espresso and steamed milk. Perfect for a cozy morning or afternoon pick-me-up.",
        price: 4.5,
        image: "/image/cup.png",
        badge: "BEST SELLER #1"
        },
        {
        id: 2,
        name: "Espresso",
        description: "Strong and bold pure espresso shot, perfect for a quick energy boost. Made from premium Arabica beans.",
        price: 3.5,
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
        badge: "BEST SELLER #2"
        },
        {
        id: 3,
        name: "Cappuccino",
        description: "Perfect balance of espresso, steamed milk, and foam. Topped with a sprinkle of cocoa powder for extra flavor.",
        price: 4.0,
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
        badge: "BEST SELLER #3"
        },
        {
        id: 4,
        name: "Mocha",
        description: "Delicious combination of espresso, chocolate syrup, and steamed milk. Topped with whipped cream.",
        price: 4.8,
        image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
        badge: "BEST SELLER #4"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === bestSellerItems.length - 1 ? 0 : prevIndex + 1
        );
        }, 3000);

        return () => clearInterval(interval);
    }, [bestSellerItems.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? bestSellerItems.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
        prevIndex === bestSellerItems.length - 1 ? 0 : prevIndex + 1
        );
    };

    const currentItem = bestSellerItems[currentIndex];

    return (
        <section className="bg-[#f5f5f5] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-0">
            
            {/* Best Seller Badge */}
            <div className="text-center mb-8">
            <span className="bg-[#d4af37] text-black px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wide">
                ⭐ Best Sellers ⭐
            </span>
            </div>

            {/* Slider Container */}
            <div className="relative flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Column - Image with slider controls */}
            <div className="md:w-1/2 relative group">
                <div className="relative">
                {/* Square image container */}
                <div className="relative w-full aspect-square rounded-xl shadow-lg overflow-hidden bg-gray-100">
                    <img 
                    src={currentItem.image}
                    alt={currentItem.name}
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                    />
                </div>
                
                {/* Navigation Arrows */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <button
                    onClick={goToNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                {bestSellerItems.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex ? "w-8 bg-[#d4af37]" : "bg-gray-400 hover:bg-gray-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
                </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="md:w-1/2 text-center md:text-left">
                {/* Badge */}
                <div className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                {currentItem.badge}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-[#3e2c1c] mb-4">
                {currentItem.name}
                </h1>
                
                <p className="text-lg md:text-xl mb-4 text-gray-700">
                {currentItem.description}
                </p>
                
                <div className="mb-6">
                <span className="text-3xl font-bold text-[#d4af37]">
                    ${currentItem.price.toFixed(2)}
                </span>
                </div>
                
                <Link
                to="/menu"
                className="inline-block bg-[#d4af37] text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition"
                >
                Order Now
                </Link>
            </div>

            </div>
        </div>
        </section>
    );
    };

    export default HeroSection;