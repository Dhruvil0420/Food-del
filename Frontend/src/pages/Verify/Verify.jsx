import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const Verify = () => {

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { setCartItem } = useContext(AppContext);

  useEffect(() => {
    if (!orderId) {
      toast.error("Invalid order");
      navigate("/");
      return;
    }

    // Backend (Stripe webhook) already cleared the cart in DB.
    // Keep frontend cart in sync by clearing local state too.
    setCartItem({});

    const timer = setTimeout(() => {
      navigate("/myorders");
    }, 2000);

    return () => clearTimeout(timer);

  }, [orderId, navigate, setCartItem]);

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
