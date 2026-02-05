import { useContext } from 'react'
import './PlaceOrder.css'
import { AppContext } from '../../context/AppContext';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {

  const { getTotalPrice, DeliveryFee, food_list, cartItem, token } = useContext(AppContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  }

  const placedorder = async (event) => {
  event.preventDefault();

  const order_items = [];

  food_list.map((food) => {

    const quantity = cartItem[food._id];

    if (quantity && quantity > 0) {
      order_items.push({
        foodId: food._id,
        quantity: quantity
      });
    }
  });

  try {

    const response = await axios.post(
      `${backendUrl}/api/order/place`,
      {
        items: order_items,
        address: data
      },
      {
        headers: { token }
      }
    );

    if (response.data.success) {
      window.location.replace(response.data.session_url);
    } else {
      toast.error("Order rejected by server");
    }

  } catch (err) {
    toast.error(err.response?.data?.message || "Order failed");
  }
};


  return (
    <form onSubmit={placedorder} className='place-order'>
      <div className="place-order-left">
        <p>Delivery Information</p>
        <div className='multi-field'>

          <input
            required
            name='firstname' value={data.firstname}
            onChange={onChangeHandler}
            type="text"
            placeholder='First Name'
          />

          <input
            required
            name='lastname'
            value={data.lastname}
            type="text"
            placeholder='Last Name'
            onChange={onChangeHandler}
          />
        </div>

        <input
          required
          name='email'
          value={data.email}
          type="email"
          placeholder='Email Address'
          onChange={onChangeHandler}
        />

        <input
          required
          name='street'
          value={data.street}
          type="text"
          placeholder='Street'
          onChange={onChangeHandler}
        />

        <div className='multi-field'>

          <input
            required
            name='city'
            value={data.city}
            type="text"
            placeholder='City'
            onChange={onChangeHandler}
          />

          <input
            required
            name='state'
            value={data.state}
            type="text"
            placeholder='State'
            onChange={onChangeHandler}
          />

        </div>

        <div className='multi-field'>

          <input
            required
            name='zipcode'
            value={data.zipcode}
            type="text"
            placeholder='Zip Code'
            onChange={onChangeHandler}
          />

          <input
            required
            name='country'
            value={data.country}
            type="text"
            placeholder='Country'
            onChange={onChangeHandler}
          />

        </div>

        <input
          required
          name='phone'
          value={data.phone}
          type="text"
          placeholder='Phone'
          onChange={onChangeHandler}
        />

      </div>
      <div className="place-order-right">
        <div className="cart-total">

          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalPrice()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${DeliveryFee}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalPrice() + DeliveryFee}</b>
            </div>
          </div>
          <button type='submit' >Proceed to Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
