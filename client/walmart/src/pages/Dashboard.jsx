import React from 'react';

export default function ScanGoDashboard() {
  return (
    <div className="min-h-screen bg-[#F5FAFF] font-inter text-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#6A5AE0] to-[#19C4D6] text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">📱 Scan & Go</h1>
        <nav className="space-x-6 font-medium">
          <a href="#" className="hover:underline">Dashboard</a>
          <a href="#" className="hover:underline">History</a>
          <a href="#" className="hover:underline">Offers</a>
          <a href="#" className="hover:underline">Help</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="bg-gradient-to-r from-[#6A5AE0] to-[#19C4D6] text-white rounded-2xl p-8 shadow-xl max-w-xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Shopping Instantly</h2>
          <button className="bg-white text-[#6A5AE0] hover:bg-gray-100 font-semibold px-6 py-3 rounded-full transition-all">
            📷 Scan & Pay
          </button>
        </div>
      </section>

      {/* Cards Section */}
      <section className="px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Purchases */}
        {/* Receipt-style Purchases */}
<div className="bg-white rounded-2xl shadow-md p-6 font-mono">
  <h3 className="text-lg font-semibold mb-4 font-sans">🧾 Your Receipt</h3>

  <div className="border border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
    {/* Header Line */}
    <div className="flex justify-between text-sm border-b border-gray-300 pb-2 mb-2">
      <span>Item</span>
      <span>Price</span>
    </div>

    {/* Items */}
    <ul className="text-sm space-y-1">
      <li className="flex justify-between">
        <span>Milk</span>
        <span>₹60</span>
      </li>
      <li className="flex justify-between">
        <span>Bread</span>
        <span>₹40</span>
      </li>
      <li className="flex justify-between">
        <span>Shampoo</span>
        <span>₹150</span>
      </li>
    </ul>

    {/* Divider */}
    <div className="border-t border-dashed border-gray-300 mt-4 mb-2" />

    {/* Total */}
    <div className="flex justify-between font-bold text-base">
      <span>Total</span>
      <span>₹250</span>
    </div>
  </div>

  <button className="mt-4 w-full text-sm font-medium text-blue-600 hover:underline">
    View Full Purchase History →
  </button>
</div>


        {/* Enhanced & Aligned Recommendations */}
<div className="bg-white rounded-2xl shadow-md p-6">
  <h3 className="text-lg font-semibold mb-4">✨ Recommended For You</h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Product Card */}
    {[
      {  name: "Toothpaste", price: "₹45" },
      {  name: "Detergent", price: "₹120" },
      {  name: "Energy Drink", price: "₹90" },
    ].map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-between border border-gray-200 rounded-xl p-3 hover:shadow-md transition"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">{item.icon}</div>
          <div>
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-xs text-gray-500">{item.price}</p>
          </div>
        </div>
        <button className="bg-[#6A5AE0] hover:bg-[#5745c4] text-white px-4 py-1 rounded-full text-xs whitespace-nowrap">
          + Scan
        </button>
      </div>
    ))}
  </div>

  <button className="mt-4 w-full text-sm text-blue-600 hover:underline font-medium">
    Explore More Suggestions →
  </button>
</div>


        {/* Deals */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">🔥 Best Deals Today</h3>
          <ul className="space-y-1">
            <li>Buy 1 Get 1 on Snacks</li>
            <li>10% Off on Groceries</li>
          </ul>
          <button className="mt-4 text-blue-600 hover:underline text-sm">See Deals</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#EAF2FF] py-4 text-center text-sm text-gray-600">
        © 2025 Scan & Go — Shop. Scan. Save Time.
      </footer>
    </div>
  );
}
