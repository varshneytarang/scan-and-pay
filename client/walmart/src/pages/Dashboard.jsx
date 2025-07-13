import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Scan,
  ShoppingCart,
  History,
  Star,
  Gift,
  TrendingUp,
  Clock,
  MapPin,
  ArrowRight,
  Zap,
  Shield,
  Heart,
  Eye,
  Sparkles,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function ScanGoDashboard() {
  const navigate = useNavigate();
  
  const recommendedItems = [
    { name: "Organic Milk", price: "₹85", category: "Dairy", icon: "🥛", discount: "10% OFF" },
    { name: "Whole Wheat Bread", price: "₹45", category: "Bakery", icon: "🍞", discount: null },
    { name: "Fresh Bananas", price: "₹60", category: "Fruits", icon: "🍌", discount: "20% OFF" },
    { name: "Greek Yogurt", price: "₹120", category: "Dairy", icon: "🥛", discount: null },
  ];

  const recentPurchases = [
    { name: "Zandu Balm", price: "₹123", time: "2 hours ago", status: "completed" },
    { name: "Shampoo", price: "₹150", time: "Yesterday", status: "completed" },
    { name: "Bread", price: "₹40", time: "2 days ago", status: "completed" },
  ];

  const quickActions = [
    { icon: History, label: "Purchase History", color: "from-purple-500 to-pink-500" },
    { icon: Gift, label: "Offers & Deals", color: "from-green-500 to-emerald-500" },
    { icon: MapPin, label: "Store Locator", color: "from-orange-500 to-red-500" },
    { icon: Star, label: "Favorites", color: "from-yellow-500 to-amber-500" },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-cyan-500/80"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Scan & Go</h1>
                <p className="text-blue-100 text-sm">Welcome back, Shopper!</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8 font-medium text-white">
              <button className="hover:text-blue-200 transition-colors flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                Dashboard
              </button>
              <button className="hover:text-blue-200 transition-colors">History</button>
              <button className="hover:text-blue-200 transition-colors">Offers</button>
              <button className="hover:text-blue-200 transition-colors">Help</button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Main Scan Button */}
      <section className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-cyan-500/5"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <Scan className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent mb-6">
              Ready to Shop?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start scanning items as you shop and experience the future of retail
            </p>
            
            <button 
              onClick={() => navigate("/about")}
              className="group bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-4 mx-auto"
            >
              <Scan className="w-6 h-6" />
              Start Scanning
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Instant Checkout</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Save Time</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-medium text-gray-800 text-sm">{action.label}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Purchases */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <History className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Purchases</h3>
              </div>
              
              <div className="space-y-4">
                {recentPurchases.map((purchase, index) => (
                  <div key={index} className="border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{purchase.name}</h4>
                      <span className="font-semibold text-blue-600">{purchase.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{purchase.time}</span>
                      <div className="flex items-center gap-1 ml-auto">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600 capitalize">{purchase.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 py-3 rounded-xl font-medium hover:from-purple-100 hover:to-pink-100 transition-all flex items-center justify-center gap-2">
                <Eye className="w-4 h-4" />
                View All History
              </button>
            </div>
          </div>

          {/* Recommended Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recommended for You</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedItems.map((item, index) => (
                  <div key={index} className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
                    {item.discount && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {item.discount}
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">{item.price}</span>
                      <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-600 transition-all flex items-center gap-2 group-hover:scale-105">
                        <Plus className="w-4 h-4" />
                        Add to Scan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-600 py-3 rounded-xl font-medium hover:from-yellow-100 hover:to-amber-100 transition-all flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Explore More Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Your Shopping Stats</h2>
            <p className="text-xl text-gray-600">Track your progress and savings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">47</h3>
              <p className="text-gray-600">Items Scanned</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">2.5</h3>
              <p className="text-gray-600">Hours Saved</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">₹580</h3>
              <p className="text-gray-600">Money Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">© 2025 Scan & Go — Shop smart, checkout faster</p>
        </div>
      </footer>
    </div>
  );
}
