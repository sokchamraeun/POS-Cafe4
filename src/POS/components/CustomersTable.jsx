import React from 'react';

const CustomersTable = ({ customers }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Customer Management</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Spent</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.id}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{customer.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{customer.orders}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-amber-600">{customer.total}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{customer.joinDate}</td>
                                <td className="px-6 py-4">
                                    <button className="text-amber-600 hover:text-amber-700 text-sm font-semibold">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CustomersTable;