import React, { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'
import { AppContext } from '../../context/AppContext';
function FoodDisplay({category}) {
    const {food_list} = useContext(AppContext);

    return (
        <div className='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list
                    .filter(item => category === "All" || category === item.category)
                    .map(item => (
                        <FoodItem key={item._id} item={item} />
                    ))
                }

            </div>
        </div>
    )
}

export default FoodDisplay;
