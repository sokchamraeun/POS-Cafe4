import React from 'react';

const TopProducts = ({ topProducts }) => {
    return (
        <div className="bg-white shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Selling Products</h2>
            <div className="space-y-4">
                {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-amber-50 transition-all">
                        <div className="flex items-center gap-3">
                            <span className="text-amber-500 font-bold text-lg">#{index + 1}</span>
                            <div>
                                <p className="font-semibold text-gray-800">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.sales} sales</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-amber-600">{product.revenue}</p>
                            <p className="text-xs text-green-600">{product.trend}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopProducts;