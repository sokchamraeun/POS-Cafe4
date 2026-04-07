import React from 'react';

const StatsCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                            {stat.icon}
                        </div>
                        <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            {stat.change}
                        </span>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.label}</h3>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;