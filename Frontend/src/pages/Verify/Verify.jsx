import { useNavigate, useSearchParams } from 'react-router-dom';
import './Verify.css'
import axios from 'axios';
import { useEffect } from 'react';
import { toast }  from "react-toastify"
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function Verify() {

  const [searchParams, setsearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const {token} = useContext(AppContext);
  const verifyPayment = async () => {
    try {

      if (!success || !orderId) {
      toast.error("Invalid payment response");
      navigate("/");
      return;
    }
      const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/myorders");
      }
      else {
        toast.error(response.data.message);
        navigate("/");
      }
    } 
    catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifyPayment()
  },[])
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify;
