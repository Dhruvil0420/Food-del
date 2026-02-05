import { useEffect, useState } from 'react'
import './Cart.css'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom'
function Cart() {

  const { food_list, cartItem, removeToCart, getTotalPrice, DeliveryFee } = useContext(AppContext);

  const url = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  return (
    <div className='cart'>

      <div className="cart-items">

        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item,index) =>
          cartItem[item._id] > 0 && (
            <div key={item._id}>
              <div className="cart-items-title cart-items-item" >
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>${item.price * cartItem[item._id]}</p>
                <p className='cross' onClick={() => removeToCart(item._id)}>x</p>
              </div>
              <hr />
            </div>
            
          )
        )}

      </div>
      <div className="cart-bottom">

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
          <button onClick={() => navigate("/order")}>Proceed to Checkout</button>
        </div>

        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart;
