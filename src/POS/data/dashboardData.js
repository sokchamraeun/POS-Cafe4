// Add this to your existing dashboardData.jsx or create it

export const stats = [
    { label: "Total Revenue", value: "$12,345", change: "+15%", icon: "💰", color: "bg-green-500" },
    { label: "Total Orders", value: "1,234", change: "+12%", icon: "📦", color: "bg-blue-500" },
    { label: "Total Customers", value: "890", change: "+8%", icon: "👥", color: "bg-purple-500" },
    { label: "Products Sold", value: "3,456", change: "+23%", icon: "☕", color: "bg-amber-500" }
];

export const recentOrders = [
    { id: "#ORD-001", customer: "John Doe", items: "Caramel Latte, Croissant", total: "$12.50", status: "Completed", time: "10:30 AM" },
    { id: "#ORD-002", customer: "Jane Smith", items: "Espresso, Muffin", total: "$8.50", status: "Processing", time: "11:15 AM" },
    { id: "#ORD-003", customer: "Mike Johnson", items: "Cappuccino", total: "$4.50", status: "Completed", time: "11:45 AM" },
    { id: "#ORD-004", customer: "Sarah Williams", items: "Latte, Sandwich", total: "$15.50", status: "Pending", time: "12:00 PM" },
    { id: "#ORD-005", customer: "David Brown", items: "Mocha, Brownie", total: "$11.00", status: "Completed", time: "12:30 PM" }
];

export const topProducts = [
    { name: "Caramel Latte", sales: 234, revenue: "$1,053", stock: 45, trend: "+12%" },
    { name: "Espresso", sales: 189, revenue: "$661.50", stock: 32, trend: "+8%" },
    { name: "Cappuccino", sales: 156, revenue: "$546", stock: 28, trend: "+15%" },
    { name: "Mocha", sales: 145, revenue: "$696", stock: 41, trend: "+5%" }
];

export const weeklySales = [650, 450, 780, 550, 890, 720, 940];
export const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const inventory = [
    { id: 1, name: "Coffee Beans", stock: 50, minStock: 20, status: "In Stock", price: "$25.99", supplier: "Local Roasters" },
    { id: 2, name: "Milk", stock: 30, minStock: 15, status: "In Stock", price: "$3.99", supplier: "Dairy Farm" },
    { id: 3, name: "Sugar", stock: 8, minStock: 10, status: "Low Stock", price: "$2.49", supplier: "Sugar Co." },
    { id: 4, name: "Cups", stock: 100, minStock: 30, status: "In Stock", price: "$0.50", supplier: "Eco Cups" },
    { id: 5, name: "Chocolate Syrup", stock: 5, minStock: 10, status: "Low Stock", price: "$4.99", supplier: "Sweet Factory" }
];

export const customers = [
    { id: 1, name: "John Doe", email: "john@email.com", orders: 45, total: "$450", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", orders: 32, total: "$320", joinDate: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@email.com", orders: 28, total: "$280", joinDate: "2024-03-10" }
];