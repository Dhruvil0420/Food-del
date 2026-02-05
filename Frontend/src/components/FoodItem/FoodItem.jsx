import { useContext } from 'react'
import { assets } from '../../assets/assets';
import './FoodItem.css'
import { AppContext } from '../../context/AppContext';

function FoodItem({ item }) {

   
    const { cartItem, addToCart, removeToCart } = useContext(AppContext);
    
    return (
        <div className='food-item'>
            <div className="food-item-container">
                <img className='food-item-container-image' src={ item.image} alt="" />
                {!cartItem[item._id]
                    ? <img className="add" onClick={() => addToCart(item._id)} src={assets.add_icon_white} alt="" />
                    : <div className='food-item-counter'>
                        <img onClick={() => removeToCart(item._id)} src={assets.remove_icon_red} alt="" />
                        <p>{cartItem[item._id]}</p>
                        <img onClick={() => addToCart(item._id)} src={assets.add_icon_green} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{item.name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className='food-item-dec'>{item.description}</p>
                <h3 className='food-item-price'>${item.price}</h3>
            </div>
        </div>
    )
}

export default FoodItem;