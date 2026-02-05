import {  useSearchParams } from 'react-router-dom';
import './Verify.css'
function Verify (){

    const [searchParams,setsearchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");  
    const url = process.env.FRONTEND_URL;

    console.log(success,orderId);

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify;
