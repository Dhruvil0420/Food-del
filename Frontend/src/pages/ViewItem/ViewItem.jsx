import { useEffect, useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import "./Viewitem.css"
import FoodItem from '../../components/FoodItem/FoodItem';
import { url } from '../../../../admin/src/assets/assets';
import toast from 'react-hot-toast';
import axios from "axios"
import Loading from '../../components/Loading/Loading';
function ViewItem({ setShowLogin }) {
    const { id } = useParams();
    const url = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    const { food_list, addToCart, token, loading, setLoading } = useContext(AppContext);
    const [relatedItems, setrelatedItems] = useState([]);
    const [item, setItem] = useState([]);


    useEffect(() => {
        const fetchFood = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    `${url}/api/food/get/${id}`
                );

                if (response.data.success) {
                    setItem(response.data.data);
                }

            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFood();
        window.scrollTo(0, 0);

    }, [id]);

    useEffect(() => {

        if (!item) return;
        const filtered = food_list
            .filter(food => food.category === item.category)
            .slice(0, 5);

        setrelatedItems(filtered);

    }, [food_list, item]);

    const handleAddToCart = (itemId, e) => {
        if (e) e.stopPropagation();
        if (!token) {
            setShowLogin(true);
            return;
        }
        addToCart(itemId);
    };


    if (loading) {
        return <div className='view-item-loading'><Loading /></div>
    }

    return (
        <div className="product-page">

            <div className="product-container">

                {/* LEFT SIDE - Images */}
                <div className="image-gallery">
                    <div className="thumbnail-list">
                        <img src={item.image} alt="" />
                    </div>

                    <div className="main-image">
                        <img src={item.image} alt={item.name} />
                    </div>
                </div>

                {/* RIGHT SIDE - Info */}
                <div className="product-info">

                    <h2 className="product-title">{item.name}</h2>

                    <div className="product-rating">
                        <img src={assets.rating_starts} alt="" />
                        <span>(4)</span>
                    </div>

                    <h3 className="product-price">${item.price}</h3>

                    <p className="product-description">{item.description}</p>
                    <div className='product-category'>
                        <li>Category</li>
                        <h2>{item.category}</h2>
                    </div>
                    <div className="product-buttons">
                        <button className="add-btn" onClick={() => handleAddToCart(item._id)}>
                            Add to Cart
                        </button>
                        <button onClick={() => handleAddToCart(item._id)} className="buy-btn">
                            Buy Now
                        </button>
                    </div>

                </div>

            </div>
            <div className="related-section">
                <h3>Related Products</h3>

                <div className="related-grid">
                    {relatedItems.map(food => (
                        <div
                            key={food._id}
                            className="related-card"
                            onClick={() => navigate(`/viewitem/${food._id}`)}
                        >
                            <FoodItem item={food} showCategory />
                        </div>
                    ))}
                </div>
            </div>


        </div>
    );

}

export default ViewItem;
