import React from 'react';

const SalesChart = ({ weeklySales, days }) => {
    const maxSale = Math.max(...weeklySales);
    
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Sales Overview</h2>
            <div className="h-80">
                <div className="flex items-end justify-between h-64 gap-2">
                    {weeklySales.map((sale, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                            <div 
                                className="w-full bg-gradient-to-t from-amber-500 to-amber-400 rounded-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-500"
                                style={{ height: `${(sale / maxSale) * 100}%` }}
                            ></div>
                            <span className="text-xs text-gray-600">{days[i]}</span>
                            <span className="text-xs font-semibold text-amber-600">${sale}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SalesChart;