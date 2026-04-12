import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes, FaSave, FaImage, FaTag, FaDollarSign, FaBox, FaStar } from 'react-icons/fa';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        price: 0,
        quantity: 0,
        image: '',
        category: 'Coffee',
        best: false,
        description: ''
    });

    // Load products from localStorage
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            setProducts(JSON.parse(savedProducts));
        } else {
            // Sample initial data
            const initialProducts = [
                {
                    id: 1,
                    name: "Caramel Latte",
                    price: 4.50,
                    quantity: 50,
                    image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=100&h=100&fit=crop",
                    category: "Coffee",
                    best: true,
                    description: "Smooth espresso with vanilla and caramel drizzle"
                },
                {
                    id: 2,
                    name: "Espresso",
                    price: 3.00,
                    quantity: 100,
                    image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=100&h=100&fit=crop",
                    category: "Coffee",
                    best: false,
                    description: "Strong and bold pure espresso shot"
                },
                {
                    id: 3,
                    name: "Cappuccino",
                    price: 4.00,
                    quantity: 75,
                    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=100&h=100&fit=crop",
                    category: "Coffee",
                    best: true,
                    description: "Perfect balance of espresso, steamed milk, and foam"
                },
                {
                    id: 4,
                    name: "Croissant",
                    price: 3.50,
                    quantity: 30,
                    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&h=100&fit=crop",
                    category: "Pastries",
                    best: false,
                    description: "Butter, flaky pastry"
                },
                {
                    id: 5,
                    name: "Matcha Latte",
                    price: 5.00,
                    quantity: 40,
                    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=100&h=100&fit=crop",
                    category: "Tea",
                    best: true,
                    description: "Premium Japanese matcha with steamed milk"
                }
            ];
            setProducts(initialProducts);
            localStorage.setItem('products', JSON.stringify(initialProducts));
        }
    };

    const saveProducts = (updatedProducts) => {
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    // Filter products based on search
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddProduct = () => {
        setIsEditing(false);
        setFormData({
            id: Date.now(),
            name: '',
            price: 0,
            quantity: 0,
            image: '',
            category: 'Coffee',
            best: false,
            description: ''
        });
        setShowModal(true);
    };

    const handleEditProduct = (product) => {
        setIsEditing(true);
        setSelectedProduct(product);
        setFormData(product);
        setShowModal(true);
    };

    const handleDeleteProduct = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const updatedProducts = products.filter(p => p.id !== productId);
            saveProducts(updatedProducts);
        }
    };

    const handleSaveProduct = () => {
        if (!formData.name || formData.price <= 0) {
            alert('Please fill in product name and price');
            return;
        }

        let updatedProducts;
        if (isEditing) {
            updatedProducts = products.map(p =>
                p.id === formData.id ? formData : p
            );
        } else {
            updatedProducts = [...products, { ...formData, id: Date.now() }];
        }

        saveProducts(updatedProducts);
        setShowModal(false);
        setFormData({
            id: null,
            name: '',
            price: 0,
            quantity: 0,
            image: '',
            category: 'Coffee',
            best: false,
            description: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageError = (e) => {
        e.target.src = 'https://placehold.co/100x100/e2e8f0/64748b?text=No+Image';
    };

    // Modal Component
    const Modal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl">
                        <FaTimes />
                    </button>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                <FaTag className="inline mr-2 text-amber-500" />
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                required
                            />
                        </div>

                        {/* Price and Quantity Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    <FaDollarSign className="inline mr-1 text-amber-500" />
                                    Price <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    <FaBox className="inline mr-1 text-amber-500" />
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                            >
                                <option value="Coffee">Coffee</option>
                                <option value="Tea">Tea</option>
                                <option value="Pastries">Pastries</option>
                                <option value="Sandwiches">Sandwiches</option>
                                <option value="Smoothies">Smoothies</option>
                            </select>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">
                                <FaImage className="inline mr-2 text-amber-500" />
                                Image URL
                            </label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                            />
                            {formData.image && (
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="mt-2 w-16 h-16 object-cover rounded-lg border"
                                    onError={handleImageError}
                                />
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows="2"
                                placeholder="Product description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                            />
                        </div>

                        {/* Best Seller Checkbox */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="best"
                                checked={formData.best}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-amber-500 rounded focus:ring-amber-500"
                            />
                            <label className="text-sm text-gray-700">
                                <FaStar className="inline mr-1 text-yellow-500" />
                                Mark as Best Seller
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveProduct}
                            className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition font-semibold"
                        >
                            <FaSave className="w-4 h-4" />
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
                    <p className="text-gray-500 mt-1">Manage your products (CRUD operations)</p>
                </div>
                <button
                    onClick={handleAddProduct}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                >
                    <FaPlus className="w-4 h-4" />
                    Add New Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products by name or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                                        No products found. Click "Add New Product" to create one.
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            #{product.id}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={product.image || 'https://placehold.co/40x40/e2e8f0/64748b?text=No+Img'}
                                                alt={product.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                                onError={handleImageError}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-gray-800">{product.name}</p>
                                                {product.best && (
                                                    <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                                                        Best Seller
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-amber-600">${product.price.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`font-semibold ${product.quantity <= 10 ? 'text-red-500' : product.quantity <= 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                                                {product.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditProduct(product)}
                                                    className="text-blue-500 hover:text-blue-700 transition p-1"
                                                    title="Edit product"
                                                >
                                                    <FaEdit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="text-red-500 hover:text-red-700 transition p-1"
                                                    title="Delete product"
                                                >
                                                    <FaTrash className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Statistics Footer */}
            <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Total Stock</p>
                    <p className="text-2xl font-bold text-gray-800">
                        {products.reduce((sum, p) => sum + p.quantity, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Avg Price</p>
                    <p className="text-2xl font-bold text-amber-600">
                        ${(products.reduce((sum, p) => sum + p.price, 0) / products.length || 0).toFixed(2)}
                    </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Best Sellers</p>
                    <p className="text-2xl font-bold text-yellow-500">
                        {products.filter(p => p.best).length}
                    </p>
                </div>
            </div>

            {/* Modal */}
            {showModal && <Modal />}
        </div>
    );
};

export default ProductManagement;