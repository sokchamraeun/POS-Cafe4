import { useState } from 'react';

const Location = () => {
    const [selectedStore, setSelectedStore] = useState(0);
    const [directionInput, setDirectionInput] = useState('');

    const stores = [
        {
            id: 1,
            name: "Phnom Penh",
            address: "123 Coffee Avenue",
            city: "Phnom Penh",
            phone: "+1 (555) 123-4567",
            email: "downtown@poscafe.com",
            hours: {
                monday: "7:00 AM - 10:00 PM",
                tuesday: "7:00 AM - 10:00 PM",
                wednesday: "7:00 AM - 10:00 PM",
                thursday: "7:00 AM - 10:00 PM",
                friday: "7:00 AM - 11:00 PM",
                saturday: "8:00 AM - 11:00 PM",
                sunday: "8:00 AM - 9:00 PM"
            },
            coordinates: { lat: 11.5564, lng: 104.9282 },
            features: ["Free WiFi", "Outdoor Seating", "Drive-Thru", "Parking"],
            isOpen24h: false
        },
    ];

    const getCurrentDay = () => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        return days[new Date().getDay()];
    };

    const isStoreOpen = (store) => {
        if (store.isOpen24h) return true;
        const today = getCurrentDay();
        const hours = store.hours[today];
        if (hours === "Closed") return false;
        
        const now = new Date();
        const currentTime = now.getHours() + now.getMinutes() / 60;
        
        const parseTime = (timeStr) => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            if (modifier === 'PM' && hours !== '12') hours = parseInt(hours) + 12;
            if (modifier === 'AM' && hours === '12') hours = 0;
            return parseInt(hours) + (parseInt(minutes) || 0) / 60;
        };
        
        const [openTime, closeTime] = hours.split(' - ');
        const open = parseTime(openTime);
        let close = parseTime(closeTime);
        if (close <= open) close += 24;
        
        return currentTime >= open && currentTime < close;
    };

    const getDirections = (e) => {
        e.preventDefault();
        if (directionInput.trim()) {
            const destination = `${stores[selectedStore].address}, ${stores[selectedStore].city}`;
            const url = `https://www.google.com/maps/dir/${encodeURIComponent(directionInput)}/${encodeURIComponent(destination)}`;
            window.open(url, '_blank');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Our Locations</h1>
                    <p className="text-gray-600 mt-2">Find a store near you</p>
                </div>

                {/* Store Selector Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {stores.map((store, index) => (
                        <button
                            key={store.id}
                            onClick={() => setSelectedStore(index)}
                            className={`px-6 py-2 rounded-full font-medium transition-all ${
                                selectedStore === index
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                            }`}
                        >
                            {store.name}
                        </button>
                    ))}
                </div>

                {/* 2-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* LEFT COLUMN - MAP, DIRECTIONS, AMENITIES & CONTACT */}
                    <div className="space-y-6">
                        {/* Map Card */}
                        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                            {/* Map */}
                            <div className="h-96 w-full">
                                <iframe
                                    title="store-map"
                                    src={`https://maps.google.com/maps?q=${stores[selectedStore].coordinates.lat},${stores[selectedStore].coordinates.lng}&z=15&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            
                            {/* Directions */}
                            <div className="p-4 border-t">
                                <h3 className="font-semibold text-gray-900 mb-2">Get Directions</h3>
                                <form onSubmit={getDirections} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={directionInput}
                                        onChange={(e) => setDirectionInput(e.target.value)}
                                        placeholder="Enter your starting location"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                                    >
                                        Get Directions
                                    </button>
                                </form>
                                <button
                                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${stores[selectedStore].coordinates.lat},${stores[selectedStore].coordinates.lng}`, '_blank')}
                                    className="mt-2 w-full text-center text-blue-600 text-sm hover:underline"
                                >
                                    Open in Google Maps →
                                </button>
                            </div>
                        </div>

                        {/* Amenities Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gray-800 px-5 py-3">
                                <h2 className="text-lg font-semibold text-white">Amenities</h2>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-2">
                                    {stores[selectedStore].features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                                        >
                                            ✓ {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gray-800 px-5 py-3">
                                <h2 className="text-lg font-semibold text-white">Contact</h2>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">📞</span>
                                    <a href={`tel:${stores[selectedStore].phone}`} className="text-blue-600 hover:underline">
                                        {stores[selectedStore].phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">✉️</span>
                                    <a href={`mailto:${stores[selectedStore].email}`} className="text-blue-600 hover:underline">
                                        {stores[selectedStore].email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">📍</span>
                                    <span className="text-gray-600">{stores[selectedStore].address}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - HOURS & INFO */}
                    <div className="space-y-6">
                        {/* Open Status Card */}
                        <div className={`rounded-xl shadow-lg p-5 ${
                            isStoreOpen(stores[selectedStore]) 
                                ? 'bg-green-50 border border-green-200' 
                                : 'bg-red-50 border border-red-200'
                        }`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Current Status</p>
                                    <p className={`text-2xl font-bold ${
                                        isStoreOpen(stores[selectedStore]) ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {isStoreOpen(stores[selectedStore]) ? '● Open Now' : '● Closed'}
                                    </p>
                                </div>
                                <div className="text-4xl">
                                    {isStoreOpen(stores[selectedStore]) ? '🟢' : '🔴'}
                                </div>
                            </div>
                        </div>

                        {/* Hours Card */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="bg-gray-800 px-5 py-3">
                                <h2 className="text-lg font-semibold text-white">Business Hours</h2>
                            </div>
                            <div className="p-5">
                                <div className="space-y-2">
                                    {Object.entries(stores[selectedStore].hours).map(([day, hours]) => {
                                        const today = getCurrentDay();
                                        const isToday = day === today;
                                        return (
                                            <div 
                                                key={day} 
                                                className={`flex justify-between items-center py-2 ${
                                                    isToday ? 'bg-blue-50 -mx-2 px-2 rounded-lg' : ''
                                                }`}
                                            >
                                                <span className={`capitalize font-medium ${
                                                    isToday ? 'text-blue-700' : 'text-gray-700'
                                                }`}>
                                                    {day}
                                                    {isToday && <span className="ml-2 text-xs text-blue-600">(Today)</span>}
                                                </span>
                                                <span className={`${
                                                    isToday ? 'font-semibold text-blue-700' : 'text-gray-600'
                                                }`}>
                                                    {hours}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;