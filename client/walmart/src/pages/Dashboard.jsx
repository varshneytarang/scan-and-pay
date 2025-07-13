import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scan, 
  ShoppingCart, 
  TrendingUp, 
  Star, 
  Gift, 
  ArrowRight, 
  Zap, 
  Clock, 
  CheckCircle,
  Plus,
  Sparkles,
  Calendar,
  Receipt,
  Badge,
  Camera,
  Timer,
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2
} from 'lucide-react';
import { walmartContext } from '../App.jsx';

export default function ScanGoDashboard() {
  const navigate = useNavigate();
  const { products, totalCost } = useContext(walmartContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Chatbot state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "Hi! I'm your shopping assistant. How can I help you find the perfect products today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScanClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate('/about');
    }, 300);
  };

  // Chatbot functions
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('birthday') && input.includes('father')) {
      return "Great! For a father's birthday, I'd recommend: 1) Premium grooming kit 2) Gourmet coffee or tea 3) Tech accessories like wireless chargers 4) Books or magazines 5) Specialty snacks. What's his main interest?";
    } else if (input.includes('birthday') && input.includes('mother')) {
      return "Perfect! For mom's birthday: 1) Skincare or beauty products 2) Scented candles 3) Gourmet chocolates 4) Fresh flowers 5) Cozy items like soft throws. What does she enjoy most?";
    } else if (input.includes('groceries') || input.includes('grocery')) {
      return "I can help you plan your grocery trip! Would you like suggestions for: 1) Weekly meal planning 2) Healthy options 3) Budget-friendly choices 4) Quick meal ingredients? What's your priority?";
    } else if (input.includes('gift') || input.includes('present')) {
      return "I'd love to help you find the perfect gift! Tell me: 1) Who is it for? 2) What's the occasion? 3) What's your budget range? 4) Any specific interests they have?";
    } else if (input.includes('deal') || input.includes('discount') || input.includes('sale')) {
      return "Today's best deals: 1) Buy 1 Get 1 on snacks 2) 25% off groceries 3) 15% off health & beauty 4) Special prices on electronics. Want me to show you specific categories?";
    } else if (input.includes('healthy') || input.includes('nutrition')) {
      return "Great choice for healthy options! I recommend: 1) Fresh fruits & vegetables 2) Whole grain products 3) Lean proteins 4) Nuts & seeds 5) Low-fat dairy. Looking for anything specific?";
    } else {
      return "I'm here to help you shop smarter! I can assist with gift ideas, meal planning, finding deals, or product recommendations. What would you like help with today?";
    }
  };

  const quickPrompts = [
    "Birthday gift for father",
    "Weekly grocery list",
    "Healthy meal ideas",
    "Today's best deals"
  ];

  const quickActions = [
    { icon: Scan, label: 'Scan Items', color: 'from-blue-500 to-cyan-500', action: () => navigate('/about') },
    { icon: Receipt, label: 'View History', color: 'from-purple-500 to-pink-500', action: () => {} },
    { icon: Gift, label: 'Offers', color: 'from-green-500 to-emerald-500', action: () => {} },
    { icon: Plus, label: 'Add Product', color: 'from-orange-500 to-red-500', action: () => navigate('/add') }
  ];

  const recommendations = [
    { name: "Toothpaste", price: "₹45", discount: "20% OFF", category: "Health", icon: "🦷" },
    { name: "Detergent", price: "₹120", discount: "15% OFF", category: "Home", icon: "🧽" },
    { name: "Energy Drink", price: "₹90", discount: "Buy 2 Get 1", category: "Beverages", icon: "⚡" },
    { name: "Chocolate", price: "₹65", discount: "10% OFF", category: "Snacks", icon: "🍫" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-6">
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Scan & Go</h1>
                <p className="text-blue-100 text-sm">Welcome back! Ready to shop?</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6 font-medium">
              <a href="#" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <Badge className="w-4 h-4" />
                Dashboard
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <Clock className="w-4 h-4" />
                History
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Offers
              </a>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">👤</span>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Scan Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-cyan-500/90"></div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl mb-6 animate-pulse">
                <Camera className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Start Shopping Instantly
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Scan products as you shop and skip the checkout lines forever
              </p>
              
              <button 
                onClick={handleScanClick}
                className={`group relative bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto ${isAnimating ? 'scale-95' : ''}`}
              >
                <Scan className="w-6 h-6" />
                <span className="text-lg">📷 Scan & Pay</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            Quick Actions
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{action.label}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Enhanced Stats & Receipt Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Current Cart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Current Cart</h3>
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white">
                {products && products.length > 0 ? (
                  <>
                    <div className="flex justify-between text-sm font-medium border-b border-gray-200 pb-3 mb-4">
                      <span className="text-gray-600">Item</span>
                      <span className="text-gray-600">Price</span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {products.slice(0, 3).map((product, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium text-gray-800">{product.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">₹{product.cost}</span>
                        </div>
                      ))}
                      {products.length > 3 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                          +{products.length - 3} more items
                        </div>
                      )}
                    </div>

                    <div className="border-t-2 border-dashed border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg text-gray-800">Total</span>
                        <span className="font-bold text-xl text-green-600">₹{totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-2">Start scanning items to begin shopping</p>
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigate('/about')}
                className="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {products && products.length > 0 ? 'Continue Shopping' : 'Start Scanning'}
              </button>
            </div>
          </div>

          {/* Enhanced Recommendations */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Recommended For You</h3>
                </div>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Based on your shopping
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{item.icon}</div>
                        <div>
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.price}</p>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          {item.discount}
                        </span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-2 rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add to Scan List
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full text-blue-600 hover:text-blue-700 font-semibold py-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                Explore More Suggestions 
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Today's Deals */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">🔥 Today's Hot Deals</h3>
                  <p className="text-orange-100">Limited time offers just for you</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-2xl font-bold">Buy 1</p>
                  <p className="text-sm text-orange-100">Get 1 Free</p>
                </div>
                <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-2xl font-bold">25%</p>
                  <p className="text-sm text-orange-100">Off Groceries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Time & Status Bar */}
        <section className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 text-gray-600">
              <Timer className="w-5 h-5" />
              <span className="font-medium">{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Store Open</span>
            </div>
          </div>
        </section>
      </main>

      {/* Shopping Assistant Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-96 h-96 bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Shopping Assistant</h3>
                  <p className="text-xs text-blue-100">Here to help you shop better</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/30 to-white">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    }`}>
                      {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.message}</p>
                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompts */}
            {chatMessages.length === 1 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(prompt)}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about shopping..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full flex items-center justify-center hover:from-blue-700 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center hover:scale-105"
        >
          {isChatOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
          ) : (
            <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
          )}
          
          {/* Notification Badge */}
          {!isChatOpen && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              💬
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Shopping Assistant
            <div className="absolute top-1/2 left-full w-0 h-0 border-4 border-transparent border-l-gray-800 transform -translate-y-1/2"></div>
          </div>
        </button>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-gray-800">Scan & Go</span>
          </div>
          <p className="text-gray-600">© 2025 Scan & Go — Shop Smart. Scan Fast. Save Time.</p>
        </div>
      </footer>
    </div>
  );
}
