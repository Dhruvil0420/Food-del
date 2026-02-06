import './Header.css'
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate()
    return (
        <div
            style={{
                backgroundImage: `url(${assets.header_img})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
            className='header'
        >
            <div className='header-contents'>
                <h2>Order your favourite food here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes cratted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and and elevate your dining experience, one delicious meal at a time</p>
                <button
                    onClick={() =>
                        document
                            .getElementById("explore-menu")
                            ?.scrollIntoView({ behavior: "smooth" })
                    }
                >View menu</button>
            </div>
        </div>
    )
}

export default Header;
