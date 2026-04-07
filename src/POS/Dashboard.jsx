import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatsCards from './components/StatsCards';
import SalesChart from './components/SalesChart';
import TopProducts from './components/TopProducts';
import RecentOrders from './components/RecentOrders';
import OrdersTable from './components/OrdersTable';
import ProductsGrid from './components/ProductsGrid';
import InventoryTable from './components/InventoryTable';
import CustomersTable from './components/CustomersTable';
import AnalyticsTab from './components/AnalyticsTab';
import SettingsTab from './components/SettingsTab';
import { stats, recentOrders, topProducts, weeklySales, days, inventory, customers } from './data/dashboardData';

// Product Data with Real Coffee Images (Unsplash URLs)
const products = [
    { 
        id: 1, 
        name: "ESPRESSO", 
        description: "Mondulikiri Phum", 
        price: 3.50, 
        image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop",
        isBest: true 
    },
    { 
        id: 2, 
        name: "AMERICANO", 
        description: "Premium Blend", 
        price: 3.00, 
        image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 3, 
        name: "CAPPUCCINO", 
        description: "Italian Style", 
        price: 3.50, 
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 4, 
        name: "LATTE", 
        description: "Smooth & Creamy", 
        price: 3.80, 
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 5, 
        name: "MOCHA", 
        description: "Chocolate Espresso", 
        price: 4.00, 
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 6, 
        name: "MACCHIATO", 
        description: "Traditional Style", 
        price: 3.90, 
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 7, 
        name: "FLAT WHITE", 
        description: "Smooth & Rich", 
        price: 3.70, 
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 8, 
        name: "IRISH COFFEE", 
        description: "With Whiskey", 
        price: 5.50, 
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 9, 
        name: "VIENNA COFFEE", 
        description: "With Whipped Cream", 
        price: 4.20, 
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 10, 
        name: "CARAMEL LATTE", 
        description: "Sweet & Creamy", 
        price: 4.30, 
        image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 11, 
        name: "HAZELNUT LATTE", 
        description: "Nutty & Sweet", 
        price: 4.30, 
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
        isBest: false 
    },
    { 
        id: 12, 
        name: "VANILLA LATTE", 
        description: "Smooth Vanilla", 
        price: 4.30, 
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
        isBest: false 
    },
];

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // Cart state
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cart Functions
    const handleAddToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    };

    const handleUpdateQuantity = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = Math.max(1, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleQuantityInput = (productId, value) => {
        const numValue = parseInt(value) || 1;
        const newQuantity = Math.max(1, Math.min(999, numValue));
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const handleRemoveItem = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const handleCheckout = () => {
        if (cart.length === 0) {
            alert("Please add items to cart first!");
            return;
        }

        const newOrder = {
            id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
            customer: "Walk-in Customer",
            items: cart.length,
            total: `$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`,
            status: "Completed",
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        };

        setOrders([newOrder, ...orders]);
        setCart([]);
        alert(`✅ Order Completed!\nTotal: $${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'overview':
                return (
                    <>
                        <StatsCards stats={stats} />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            <SalesChart weeklySales={weeklySales} days={days} />
                            <TopProducts topProducts={topProducts} />
                        </div>
                        <RecentOrders recentOrders={recentOrders} setActiveTab={setActiveTab} />
                    </>
                );
            case 'orders':
                return <OrdersTable orders={recentOrders} />;
            case 'products':
                return (
                    <ProductsGrid 
                        products={products}
                        onAddToCart={handleAddToCart}
                        cart={cart}
                        onUpdateQuantity={handleUpdateQuantity}
                        onQuantityInput={handleQuantityInput}
                        onRemoveItem={handleRemoveItem}
                        onCheckout={handleCheckout}
                    />
                );
            case 'inventory':
                return <InventoryTable inventory={inventory} />;
            case 'customers':
                return <CustomersTable customers={customers} />;
            case 'analytics':
                return <AnalyticsTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar activeTab={activeTab} />
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;