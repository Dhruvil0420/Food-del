import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';

function Navbar({ setShowLogin }) {

    const [menu, setMenu] = useState("home");
    const { getTotalPrice, setCartItem } = useContext(AppContext);

    const { token, setToken } = useContext(AppContext)

    const navigate = useNavigate();

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
                <a href="#explore-menu" onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile app</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-basket-icon'>
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /> </Link>
                    <div className={getTotalPrice() === 0 ? "" : "dot"}></div>
                </div>
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