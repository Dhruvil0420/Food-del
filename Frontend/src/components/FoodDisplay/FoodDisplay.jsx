import { useContext } from 'react'
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css'
import { AppContext } from '../../context/AppContext';
import {useNavigate} from 'react-router-dom'

function FoodDisplay({category}) {
    const {food_list} = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='food-display'>
            <h2>Top dishes near you</h2>
            <div className='food-display-list'>
                {food_list
                    .filter(item => category === "All" || category === item.category)
                    .map(item => (
                        <div key={item._id} className="food-display-item" onClick={() => navigate(`/viewitem/${item._id}`)}>
                            <FoodItem item={item} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default FoodDisplay;
