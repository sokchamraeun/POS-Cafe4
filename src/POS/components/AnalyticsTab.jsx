import React from 'react';

const AnalyticsTab = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Analytics</h2>
                <div className="h-96 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                    <div className="text-center">
                        <span className="text-6xl">📊</span>
                        <p className="text-gray-500 mt-2">Analytics Chart Coming Soon</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-gray-800 mb-3">Top Categories</h3>
                    <div className="space-y-2">
                        <CategoryBar label="Coffee" percentage={60} />
                        <CategoryBar label="Tea" percentage={25} />
                        <CategoryBar label="Pastries" percentage={15} />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="font-bold text-gray-800 mb-3">Peak Hours</h3>
                    <div className="space-y-2">
                        <CategoryBar label="Morning (8-12)" percentage={45} />
                        <CategoryBar label="Afternoon (12-5)" percentage={35} />
                        <CategoryBar label="Evening (5-9)" percentage={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CategoryBar = ({ label, percentage }) => (
    <div className="flex justify-between items-center">
        <span>{label}</span>
        <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
        <span>{percentage}%</span>
    </div>
);

export default AnalyticsTab;