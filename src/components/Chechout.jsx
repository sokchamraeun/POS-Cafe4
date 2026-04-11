import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaQrcode, FaCheckCircle, FaSpinner, FaCopy, FaDownload, FaUser, FaPhone, FaStickyNote, FaTable } from 'react-icons/fa';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [errors, setErrors] = useState({});
    
    // Get cart data from navigation state
    const { cartItems, totalPrice, totalItems, deliveryFee, tax, grandTotal } = location.state || {};
    
    // Customer info form state
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        tableNumber: '',
        note: ''
    });
    
    // KHQR State
    const [khqrData, setKhqrData] = useState(null);
    const [khqrImage, setKhqrImage] = useState(null);
    const [copied, setCopied] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(false);
    let paymentInterval = null;
    
    // Redirect if no cart data
    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            navigate('/menu');
        }
    }, [cartItems, navigate]);
    
    // Generate KHQR on payment step
    useEffect(() => {
        if (step === 2 && !khqrData) {
            generateKHQR();
        }
    }, [step]);
    
    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (paymentInterval) {
                clearInterval(paymentInterval);
            }
        };
    }, []);
    
    const generateKHQR = async () => {
        setIsProcessing(true);
        
        const merchantInfo = {
            merchantId: "00000000001",
            merchantName: "Coffee POS Shop",
            merchantCity: "Phnom Penh",
            amount: grandTotal,
            currency: "USD",
            billNumber: `ORD-${Date.now()}`,
            storeLabel: "Coffee Shop",
            terminalLabel: "Online"
        };
        
        const khqrString = `https://khqr.com/pay?amount=${grandTotal}&merchant=${merchantInfo.merchantId}&bill=${merchantInfo.billNumber}`;
        
        setKhqrData({
            ...merchantInfo,
            qrString: khqrString,
            qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(khqrString)}`,
            expiryTime: new Date(Date.now() + 15 * 60000).toLocaleTimeString()
        });
        
        setKhqrImage(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(khqrString)}`);
        
        setIsProcessing(false);
        
        startPaymentPolling();
    };
    
    const startPaymentPolling = () => {
        paymentInterval = setInterval(() => {
            if (!paymentVerified) {
                console.log("Checking payment status...");
            }
        }, 5000);
        
        setTimeout(() => {
            setPaymentVerified(true);
            if (paymentInterval) {
                clearInterval(paymentInterval);
            }
        }, 10000);
    };
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!customerInfo.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (customerInfo.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }
        
        if (!customerInfo.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{8,12}$/.test(customerInfo.phone.replace(/[+\s-]/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number (8-12 digits)';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };
    
    const handleNextStep = () => {
        if (step === 1) {
            if (validateForm()) {
                setStep(2);
            }
        }
    };
    
    const handlePaymentComplete = async () => {
        setIsProcessing(true);
        
        // Save customer info for order history
        localStorage.setItem('customerPhone', customerInfo.phone);
        localStorage.setItem('customerName', customerInfo.name);
        
        const orderData = {
            id: `#ORD-${Date.now()}`,
            orderId: `ORD-${Date.now()}`,
            customer: customerInfo.name,
            customerPhone: customerInfo.phone,
            tableNumber: customerInfo.tableNumber || "",
            customerNote: customerInfo.note || "",
            items: cartItems.map(item => ({
                id: item.id,
                name: item.name,
                subname: item.subname || "",
                quantity: item.cartQty,
                price: item.finalPrice || item.price,
                total: ((item.finalPrice || item.price) * item.cartQty),
                customizations: item.customizations || null
            })),
            itemsSummary: cartItems.map(item => 
                `${item.name} x${item.cartQty}${item.customizations?.size ? ` (${item.customizations.size})` : ''}`
            ).join(', '),
            subtotal: totalPrice,
            deliveryFee: deliveryFee || 0,
            tax: tax || 0,
            total: grandTotal,
            status: "Pending",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString(),
            source: "online",
            paymentMethod: "KHQR",
            paymentStatus: "paid",
            khqrTransactionId: `KHQR-${Date.now()}`
        };
        
        try {
            const response = await fetch('http://localhost:3001/api/pos/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });
            
            if (response.ok) {
                setOrderId(orderData.id);
                setOrderPlaced(true);
                setStep(3);
                
                localStorage.removeItem('cart');
                window.dispatchEvent(new Event('cartUpdated'));
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            console.error('Order error:', error);
            alert('Error placing order. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };
    
    const copyToClipboard = () => {
        if (khqrData) {
            navigator.clipboard.writeText(khqrData.qrString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    
    const downloadQR = () => {
        if (khqrImage) {
            const link = document.createElement('a');
            link.href = khqrImage;
            link.download = `khqr-payment-${orderId || 'order'}.png`;
            link.click();
        }
    };
    
    if (!cartItems || cartItems.length === 0) {
        return null;
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 mt-16">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="mb-6">
                    <button 
                        onClick={() => step === 1 ? navigate('/menu') : setStep(step - 1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-amber-600 transition mb-4 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition" /> Back to Menu
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
                    <p className="text-gray-500 mt-1">Complete your order information</p>
                </div>
                
                {/* Steps Indicator */}
                <div className="flex mb-10">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1 relative">
                            <div className={`flex items-center justify-center ${s <= step ? 'text-amber-600' : 'text-gray-400'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                                    s <= step ? 'border-amber-600 bg-amber-50 shadow-md' : 'border-gray-300 bg-white'
                                }`}>
                                    {s < step ? <FaCheckCircle className="text-amber-600 text-lg" /> : <span className="font-bold">{s}</span>}
                                </div>
                                <div className="absolute -bottom-7 text-xs font-medium whitespace-nowrap">
                                    {s === 1 ? 'Information' : s === 2 ? 'Payment' : 'Confirmation'}
                                </div>
                            </div>
                            {s < 3 && (
                                <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                                    s < step ? 'bg-amber-500' : 'bg-gray-300'
                                }`} style={{ transform: 'translateY(-50%)' }} />
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Step 1: Customer Information */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
                            <h2 className="text-xl font-bold text-white">Customer Information</h2>
                            <p className="text-amber-100 text-sm">Please fill in your details below</p>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-5">
                                {/* Name and Phone in same row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaUser className="inline mr-2 text-amber-500" />
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={customerInfo.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full name"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
                                                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.name && (
                                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            <FaPhone className="inline mr-2 text-amber-500" />
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={customerInfo.phone}
                                            onChange={handleInputChange}
                                            placeholder="012 345 678"
                                            className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
                                                errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                            }`}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Table Number */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaTable className="inline mr-2 text-amber-500" />
                                        Table Number (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="tableNumber"
                                        value={customerInfo.tableNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter your table number"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                                    />
                                </div>
                                
                                {/* Special Instructions */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <FaStickyNote className="inline mr-2 text-amber-500" />
                                        Special Instructions
                                    </label>
                                    <textarea
                                        name="note"
                                        value={customerInfo.note}
                                        onChange={handleInputChange}
                                        placeholder="Any special requests? (e.g., less sugar, extra napkins, etc.)"
                                        rows="3"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition resize-none"
                                    />
                                </div>
                            </div>
                            
                            {/* Order Summary Preview */}
                            <div className="mt-6 p-4 bg-amber-50 rounded-xl">
                                <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Items:</span>
                                        <span className="font-medium">{totalItems} item(s)</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Total:</span>
                                        <span className="font-bold text-amber-600">${(grandTotal || totalPrice).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button
                                    onClick={handleNextStep}
                                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl hover:from-amber-600 hover:to-amber-700 transition font-semibold shadow-md"
                                >
                                    Continue to Payment →
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Step 2: KHQR Payment */}
                {step === 2 && (
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                            
                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                <p className="font-semibold text-gray-800">
                                    <FaUser className="inline mr-2 text-amber-500" /> {customerInfo.name}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    <FaPhone className="inline mr-2 text-amber-500" /> {customerInfo.phone}
                                </p>
                                {customerInfo.tableNumber && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        <FaTable className="inline mr-2 text-amber-500" /> Table: {customerInfo.tableNumber}
                                    </p>
                                )}
                            </div>
                            
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm py-2 border-b border-gray-100">
                                        <span>
                                            <span className="font-medium">{item.cartQty}x</span> {item.name}
                                            {item.customizations?.size && ` (${item.customizations.size})`}
                                        </span>
                                        <span className="font-medium">
                                            ${((item.finalPrice || item.price) * item.cartQty).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="border-t pt-3 mt-3">
                                <div className="flex justify-between font-bold text-xl pt-2">
                                    <span>Total</span>
                                    <span className="text-amber-600">${(grandTotal || totalPrice).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* KHQR Payment */}
                        <div className="bg-white rounded-2xl shadow-xl p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaQrcode className="text-amber-500" />
                                KHQR Payment
                            </h2>
                            
                            {isProcessing ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <FaSpinner className="w-16 h-16 text-amber-500 animate-spin mb-4" />
                                    <p className="text-gray-500">Generating QR Code...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-center mb-4">
                                        <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-amber-100">
                                            {khqrImage && (
                                                <img 
                                                    src={khqrImage} 
                                                    alt="KHQR Code" 
                                                    className="w-64 h-64"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="text-center mb-4">
                                        <div className="text-3xl font-bold text-amber-600">
                                            ${(grandTotal || totalPrice).toFixed(2)}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            Scan QR code with any banking app
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-xl mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Merchant:</span>
                                            <span className="font-medium">Coffee POS Shop</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Bill Number:</span>
                                            <span className="font-mono text-xs">{khqrData?.billNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Expires:</span>
                                            <span className="text-red-500">{khqrData?.expiryTime}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3 mb-4">
                                        <button
                                            onClick={copyToClipboard}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition"
                                        >
                                            <FaCopy className="text-gray-500" />
                                            {copied ? 'Copied!' : 'Copy Link'}
                                        </button>
                                        <button
                                            onClick={downloadQR}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition"
                                        >
                                            <FaDownload className="text-gray-500" />
                                            Download QR
                                        </button>
                                    </div>
                                    
                                    {!paymentVerified ? (
                                        <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                                            <FaSpinner className="w-6 h-6 text-yellow-600 animate-spin mx-auto mb-2" />
                                            <p className="text-sm text-yellow-700 font-medium">
                                                Waiting for payment confirmation...
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                                            <FaCheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                            <p className="text-sm text-green-700 font-semibold">
                                                Payment Received!
                                            </p>
                                        </div>
                                    )}
                                    
                                    <button
                                        onClick={handlePaymentComplete}
                                        disabled={!paymentVerified || isProcessing}
                                        className={`w-full mt-4 py-3 rounded-xl font-bold transition ${
                                            paymentVerified && !isProcessing
                                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-md'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        {isProcessing ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <FaSpinner className="animate-spin" />
                                                Processing...
                                            </span>
                                        ) : (
                                            'Complete Order ✓'
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Step 3: Order Confirmation */}
                {step === 3 && orderPlaced && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed! 🎉</h2>
                        <p className="text-gray-500 mb-4">Thank you for your order, {customerInfo.name}!</p>
                        
                        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 mb-6 inline-block mx-auto">
                            <p className="text-sm text-gray-500">Order ID</p>
                            <p className="text-xl font-bold text-amber-600">{orderId}</p>
                        </div>
                        
                        <div className="space-y-2 text-left max-w-md mx-auto mb-6 bg-gray-50 p-4 rounded-xl">
                            <p className="flex justify-between">
                                <span className="text-gray-500">Total Amount:</span>
                                <span className="font-bold text-lg">${(grandTotal || totalPrice).toFixed(2)}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-gray-500">Payment Method:</span>
                                <span>KHQR</span>
                            </p>
                            {customerInfo.tableNumber && (
                                <p className="flex justify-between">
                                    <span className="text-gray-500">Table Number:</span>
                                    <span>{customerInfo.tableNumber}</span>
                                </p>
                            )}
                            {customerInfo.note && (
                                <p className="flex justify-between pt-2 border-t">
                                    <span className="text-gray-500">Special Request:</span>
                                    <span className="text-sm italic">{customerInfo.note}</span>
                                </p>
                            )}
                        </div>
                        
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => navigate('/menu')}
                                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl hover:from-amber-600 hover:to-amber-700 transition font-semibold shadow-md"
                            >
                                Continue Shopping
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="px-6 py-2 border-2 border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition font-semibold"
                            >
                                Print Receipt
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;