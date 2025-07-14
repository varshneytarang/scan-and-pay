import React ,{useContext,useState} from 'react'
import {useNavigate} from "react-router"
import axios from "axios"
import {walmartContext} from "../App.jsx"
const Approve = () => {
  const { result, setResult,totalCost,setTotalCost,products,setProducts,setShowPopup } = useContext(walmartContext);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const navigate=useNavigate();

  function getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }


  const transfer=async()=>{
    try{
      const position = await getPosition();
      const location=`${position.coords.latitude} and ${position.coords.longitude}`
      const response=await axios.post("http://localhost:6790/api/approve",{
        products:products,
        user_id:1,
        totalCost:totalCost,
        location:location
      })
      if(response.statusText==="OK"){
          setPaymentSuccess(true); // Show tick
          setTimeout(() => {
            setShowPopup(false); // Close popup after showing tick
            setPaymentSuccess(false); // Reset for next time
            navigate("/dashboard")
          }, 2000);
      }
      console.log(response)
      
    }
    catch(err){
      console.log(err);
    }
  }

  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center">
      {paymentSuccess ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-green-500 text-5xl">✔</div>
          <p className="text-xl font-semibold text-green-700">Payment Successful!</p>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-bold text-blue-900 mb-3">Confirm Transaction</h2>
          <p className="text-gray-700 mb-4">Are you sure you want to proceed with payment of ₹{totalCost}?</p>

          <input
            type="password"
            placeholder="Enter your PIN"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex justify-between gap-3">
            <button
              className="w-full py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
            <button
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700"
              onClick={() => {
                transfer(); // only transfer here
              }}
            >
              Confirm & Pay
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)

}

export default Approve
