import axios from 'axios';
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import "./MyOrders.css"

function MyOrders() {

    const url = import.meta.env.VITE_BACKEND_URL;
    const { token } = useContext(AppContext);
    const [data,setData] = useState([]);

    const fetchorders = async () => {

        const response = await axios.get(`${url}/api/order/getorders`, {
            headers: { token }
        });
        setData(response.data.data);
    }

    useEffect(() => {
        if(token){
            fetchorders();
        }
    },[token])

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order,index) => (
                    <div key = {index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) => (
                            <span>
                                {item.foodId.name} X {item.quantity}
                                {order.items.length- 1 !== index && " , "}
                            </span>
                        ))}</p>
                        <p>${order.amount}.00</p>
                        <p>Items:{order.items.length}</p>
                        <p className='my-order-status' ><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyOrders;
