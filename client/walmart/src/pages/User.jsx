import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from "react-router"
import axios from 'axios'
import BarcodeScanner from '../components/BarCodeScanner.jsx'
import { walmartContext } from '../App.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import Approve from './approve.jsx'

const User = () => {
  const { result, setResult,totalCost,setTotalCost,products,setProducts,showPopup,setShowPopup } = useContext(walmartContext);
  const [success, setSuccess] = useState(false);

  const navigate=useNavigate();

  const approve=()=>{
    navigate("/approve")
  }
  
  const communicator = async () => {
    try {
      const response = await axios.get("http://localhost:6790/api/search", {
        params: { hash: result }
      });

      const { success, productName, cost, quantity } = response.data;

      let newProducts;

      if (success) {
        // Do not clear result here! Let the user click Start Scanning again
        if(products.find(name=>name.name==productName)){
          newProducts=products.map(product=>
            product.name==productName?{...product,quantity:product.quantity+1}
            :product
          )

          setProducts(newProducts);
        }
        else setProducts(newProducts = [...products, { name: productName, cost:cost, quantity:quantity }]);

        let amount=newProducts.reduce(
          (acc,product)=>acc+product.cost*product.quantity,0
        );
        console.log(amount)
        setTotalCost(amount)
        setSuccess(true);
      } else {
        setSuccess(false);
      }

    } catch (error) {
      console.error("Error fetching product:", error);
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (result!=="" && result !== "Scanning...")communicator();
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-6 flex flex-col lg:flex-row">

      {/* Scanner Section */}
      <div className="w-full lg:w-1/2 p-4">
        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-6 border border-blue-200 flex flex-col items-center justify-center min-h-[400px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-blue-800 mb-4">Smart Scanner</h1>
          <p className="text-gray-500 mb-6">Point your camera at any barcode to add products</p>
          <div className="w-80 h-80 border-4 border-dashed rounded-xl border-blue-400 flex items-center justify-center">
            <BarcodeScanner />
          </div>
        </motion.div>
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-1/2 p-4">
        <AnimatePresence>
          {success && products.length > 0 ? (
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-6 border border-green-200"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Cart</h2>
                <span className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full">
                  Total Items: {products.length}
                </span>
              </div>

              {products.map((prod, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl mb-3">
                  <div>
                    <p className="text-lg font-medium text-gray-900">{prod.name}</p>
                    <p className="text-sm text-gray-500">Qty: {prod.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold text-lg">₹{prod.cost}</p>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <p className="text-xl font-bold text-blue-900 mb-2">Total Amount</p>
                <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-xl p-4 flex items-center justify-between">
                  <span className="text-2xl font-semibold">₹{totalCost}</span>
                  <button className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-xl shadow hover:bg-blue-50 transition" onClick={() => setShowPopup(true)}>
                    Checkout →
                  </button>
                  {showPopup && <Approve />}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center text-gray-500 text-lg mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Scan a product to begin checkout.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default User;