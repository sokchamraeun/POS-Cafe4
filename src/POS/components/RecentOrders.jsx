import React from 'react';

const getStatusColor = (status) => {
    switch(status) {
        case 'Completed': return 'bg-green-100 text-green-600';
        case 'Processing': return 'bg-blue-100 text-blue-600';
        case 'Pending': return 'bg-yellow-100 text-yellow-600';
        default: return 'bg-gray-100 text-gray-600';
    }
};

const RecentOrders = ({ recentOrders, setActiveTab }) => {
    return (
        <div className="bg-white  shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Recent Orders</h2>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-sm"
                >
                    View All →
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {recentOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-amber-600">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentOrders;