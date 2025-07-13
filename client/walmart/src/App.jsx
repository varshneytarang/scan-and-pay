import { useState,createContext } from 'react'
import ReactDOM from "react-dom/client"
import {Routes,Route,Link} from "react-router-dom"
import Add from './pages/Add'
import User from './pages/User'
import Home from './pages/Home'
import Auth from './pages/Auth'
import ScanGoDashboard from './pages/Dashboard'

export const walmartContext=createContext()

function App() {
  const [result, setResult] = useState("")
  const [totalCost, setTotalCost] = useState(0);
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  return (
      <walmartContext.Provider value={{result,setResult,totalCost,setTotalCost,products,setProducts,showPopup,setShowPopup}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth/>}/>
          <Route path='/add' element={<Add/>}/>
          <Route path="/about" element={<User/>}/>
          <Route path="/dashboard" element={<ScanGoDashboard/>}/>
        </Routes>
      </walmartContext.Provider>
  )
}

export default App
