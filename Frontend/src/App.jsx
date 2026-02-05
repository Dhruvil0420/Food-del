import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer.jsx';
import Loginpopup from './components/Loginpopup/Loginpopup.jsx';
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify/Verify.jsx';


function App() {

  const [ShowLogin, setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
      {ShowLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
      </div>
        <Footer />
    </>
  )
}

export default App;