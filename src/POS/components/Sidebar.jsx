import React, { useState } from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'orders', label: 'Orders', icon: '📦' },
        { id: 'products', label: 'Products', icon: '☕' },
        { id: 'inventory', label: 'Inventory', icon: '📋' },
        { id: 'customers', label: 'Customers', icon: '👥' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' }
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {sidebarOpen && window.innerWidth < 768 && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                ${sidebarOpen ? 'w-72' : 'w-20'} 
                fixed md:relative
                bg-gradient-to-b from-gray-900 to-gray-800 
                text-white 
                transition-all duration-300 ease-in-out 
                flex flex-col 
                shadow-2xl z-20 
                h-full
                border-r border-gray-700
            `}>
                {/* Logo Section with Square Border */}
                <div className={`
                    p-4 border-b border-gray-700 
                    flex items-center 
                    ${sidebarOpen ? 'justify-between' : 'justify-center'}
                `}>
                    {sidebarOpen && (
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br rounded-lg flex items-center justify-center shadow-lg   border-amber-400/30">
                                <span className="text-xl"><img src="./public/image/cup.png" alt="" /></span>
                            </div>
                            <div>
                                <span className="font-bold text-base tracking-tight">CoffeePOS</span>
                                <p className="text-[10px] text-gray-400">Point of Sale</p>
                            </div>
                        </div>
                    )}
                    
                    {!sidebarOpen && (
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg border border-amber-400/30">
                            <span className="text-xl">☕</span>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`
                            p-1.5 rounded-lg 
                            hover:bg-white/10 
                            transition-all duration-200
                            border border-transparent hover:border-gray-600
                            ${!sidebarOpen && 'hidden md:block'}
                        `}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {sidebarOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Navigation with Square Borders */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            onMouseEnter={() => setHoveredItem(item.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className={`
                                w-full group
                                flex items-center 
                                ${sidebarOpen ? 'justify-start space-x-3' : 'justify-center'}
                                px-3 py-2.5
                                transition-all duration-200
                                border-2
                                ${activeTab === item.id 
                                    ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-500/20' 
                                    : 'text-gray-300 hover:bg-gray-800/50 border-transparent hover:border-gray-600'
                                }
                                focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-900
                            `}
                        >
                            <span className={`
                                text-xl transition-transform duration-200
                                ${hoveredItem === item.id && !sidebarOpen ? 'scale-110' : ''}
                            `}>
                                {item.icon}
                            </span>
                            
                            {sidebarOpen && (
                                <span className={`
                                    font-medium text-sm flex-1 text-left
                                    ${activeTab === item.id ? 'font-semibold' : ''}
                                `}>
                                    {item.label}
                                </span>
                            )}
                            
                            {/* Active Indicator Square */}
                            {activeTab === item.id && (
                                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* User Info Section with Square Borders */}
                <div className="p-4 border-t border-gray-700">
                    <div className={`
                        flex items-center 
                        ${sidebarOpen ? 'space-x-3' : 'justify-center'}
                        p-2 rounded-lg
                        hover:bg-white/5
                        transition-all duration-200
                        border border-transparent hover:border-gray-700
                    `}>
                        {/* Avatar with Square Border */}
                        <div className="relative">
                            <div className="
                                w-10 h-10 
                                bg-gradient-to-br from-amber-500 to-amber-600 
                                rounded-lg 
                                flex items-center justify-center 
                                shadow-lg
                                border-2 border-amber-400/50
                            ">
                                <span className="text-lg"><img src="./" alt="" /></span>
                            </div>
                            {/* Online Status Square */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-sm border border-gray-900"></div>
                        </div>
                        
                        {sidebarOpen && (
                            <div className="flex-1">
                                <p className="font-semibold text-sm text-white">Admin Visal</p>
                                <p className="text-[11px] text-gray-400">admin@coffeepos.com</p>
                                <div className="flex items-center gap-1.5 mt-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-sm"></div>
                                    <span className="text-[10px] text-gray-500">Active</span>
                                </div>
                            </div>
                        )}
                        
                        {sidebarOpen && (
                            <button className="
                                p-1.5 rounded-lg 
                                opacity-0 group-hover:opacity-100
                                hover:bg-white/10
                                transition-all duration-200
                                border border-transparent hover:border-gray-600
                            ">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        )}
                    </div>
                    
                    {/* Version Badge with Square Border */}
                    {sidebarOpen && (
                        <div className="mt-3 text-center">
                            <div className="inline-block px-2 py-0.5 bg-gray-800/50 rounded border border-gray-700">
                                <p className="text-[9px] text-gray-500">v2.0.0</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;