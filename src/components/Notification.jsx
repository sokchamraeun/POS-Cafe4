// src/components/Notification.jsx
import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);
        
        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ';

    return (
        <div className="fixed top-4 right-4 z-50">
            <div className={`${bgColor} text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 min-w-[280px] max-w-md ${
                isVisible ? 'animate-slide-in-right' : 'animate-slide-out-right'
            }`}>
                <div className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold">
                    {icon}
                </div>
                <span className="flex-1 text-sm font-medium">{message}</span>
                <button 
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }} 
                    className="hover:bg-white hover:bg-opacity-20 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Notification;