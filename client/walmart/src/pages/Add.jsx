import React, { useState, useEffect } from 'react';
import Barcode from "react-barcode";
import axios from 'axios';

const Add = () => {
  const [productName, setProductName] = useState("");
  const [productCost, setProductCost] = useState(0);
  const [productQuantity, setProductQuantity] = useState(0);
  const [hash, setHash] = useState("");
  const [location,setLocation]=useState("");

  const generator = async () => {
    const cost = Number(productCost);
    const qty = Number(productQuantity);
    if (!productName || isNaN(cost) || isNaN(qty)) return;

    const input = `${productName}-${cost}-${qty}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const num = BigInt('0x' + hashHex.slice(0, 15)).toString();
    const id = num.slice(0, 11).padStart(11, '0');
    setHash(id);
  };

  const Submit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:6790/api/products", {
      Hash: hash,
      productName: productName,
      cost: Number(productCost),
      quantity: Number(productQuantity),
      location:location
    });
    if (response.success) {
      console.log("Successful addition");
    }
  };

  useEffect(() => {
    const cost = Number(productCost);
    const qty = Number(productQuantity);
    if (productName && !isNaN(cost) && !isNaN(qty)) {
      generator();
    }
  }, [productCost, productName, productQuantity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10 px-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-900 text-center mb-6">Add a New Product</h1>

        <form onSubmit={Submit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Cost</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              value={productCost}
              onChange={(e) => setProductCost(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Generate Barcode
            </button>
          </div>
        </form>

        {hash && (
          <div className="mt-10 text-center">
            <h3 className="text-xl font-bold mb-2">Barcode for <span className="text-blue-700">{productName}</span></h3>
            <div className="inline-block p-4 bg-gray-50 rounded-xl border border-dashed border-blue-400">
              <Barcode
                value={hash}
                width={2}
                height={150}
                fontSize={20}
                format="UPC"
                displayValue={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Add;
