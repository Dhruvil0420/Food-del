import { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"
import {toast} from 'react-toastify'
import { assets } from '../../assets/assets';
import "./Orders.css"

function Orders() {

    const [order,setOrder] = useState([]);
    const url = import.meta.env.VITE_BACKEND_URL;

    const fetchAlluserorders = async() => {
       try {
            const response = await axios(`${url}/api/order/list`);
            if(response.data.success){
                setOrder(response.data.data);
                console.log(response.data.data);
            }
            else{
                toast.error(response.data.message)
            }
       } 
       catch (error) {
            toast.error(error.message);
       }
    }

    const statusHandler = async(event,orderId) => {
        const value = event.target.value;
        const response = await axios.post(`${url}/api/order/change-status`,{status:value,orderId:orderId});
        if(response.data.success){
            console.log(response.data);
            toast.success(response.data.message);
            fetchAlluserorders();
        }
        else{
            toast.error(response.data.message);
        }
    }
    useEffect(() => {
        fetchAlluserorders();
    },[])

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {order.map((order,index) => (
                    <div key={order._id} className="order-item">
                        <img src={assets.parcel_icon} alt="" />
                        <div>
                            <p className='order-item-food'>
                                {order.items.map((item,index) => (
                                    <span key={index}>
                                        {item.foodId.name }
                                        {order.items.length -1 !== index &&  " , "}
                                    </span>
                                ))}
                            </p>
                            <p className='order-item-name'>{order.address.firstname+ " " + order.address.lastname}</p>
                            <div className='order-item-address'>
                                <p>{order.address.street}</p>
                                <p>{order.address.city + ", " + order.address.state + ", "+ order.address.country + ", " + order.address.zipcode}</p>
                            </div>
                            <p className='item-phone'>{order.address.phone}</p>
                        </div>
                    <p>Item:{order.items.length}</p>
                    <p>${order.amount}</p>
                    <select onChange={(event) => statusHandler(event,order._id)} value={order.status} >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out Of Delivery">Out Of Delivery</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders;