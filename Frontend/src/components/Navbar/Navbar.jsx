import { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

function Navbar({ setShowLogin }) {

    const [menu, setMenu] = useState("home");
    const { cartCount ,setCartItem } = useContext(AppContext);
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const goToAdmin = () => {
        localStorage.removeItem("adminToken"); // clear admin auth
        window.location.href = import.meta.env.VITE_ADMIN_URL + "/admin/login";
    };




    const logout = () => {
        setToken("");
        setCartItem({});
        localStorage.removeItem("token");
        navigate("/")
    }

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
            <ul className='navbar-menu'>
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <Link to="/#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</Link>
                <Link to="/#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</Link>
                <Link to="/#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</Link>
            </ul>
            <div className='navbar-right'>
                <div className='navbar-basket-icon'>
                    <Link to='/cart'><img src= {assets.Store} alt="" /> </Link>
                    {cartCount > 0 && (
                        <span className="cart-count">{cartCount}</span>
                    )}
                </div>

                {/* SELLER BUTTON HERE */}
                <button onClick={() => goToAdmin()} className="seller-btn">
                    Admin Panel
                </button>

                {!token
                    ? <button onClick={() => setShowLogin(true)}> sign in</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate("/myorders")} > <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}> <img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                </div>}

            </div>
        </div>
    )
}

export default Navbar;