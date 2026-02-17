import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import "./MyOrders.css"
import toast from 'react-hot-toast';
import Loading from '../../components/Loading/Loading';

function MyOrders() {

    const url = import.meta.env.VITE_BACKEND_URL;
    const { token ,loading, setLoading } = useContext(AppContext);
    const [data, setData] = useState([]);

    const fetchorders = async () => {
        setLoading(true);
       try {
            const response = await axios.get(`${url}/api/order/getorders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            setData(response.data.data);
        } 
       catch (error) {
        toast.error(error.message);
       }
       finally{
        setLoading(false);
       }
    }

    useEffect(() => {
        if (token) {
            fetchorders();
        }
    }, [token])

    if(loading) return <div className='my-order-loading'><Loading/></div>
    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="order-container">
                {data.map((order, index) => (
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item, index) => (
                            <span key={index}>
                                {item.foodId.name} X {item.quantity}
                                {order.items.length - 1 !== index && " , "}
                            </span>
                        ))}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p className='my-order-status' ><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={() => fetchorders()} >Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders;
