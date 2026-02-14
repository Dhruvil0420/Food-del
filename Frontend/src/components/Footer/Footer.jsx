import { assets } from '../../assets/assets';
import './Footer.css'

function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Delicious meals delivered straight to your door. Experience the taste of convenience with our wide range of cuisines and easy online ordering. Satisfaction guaranteed with every bite!</p>
                    <div className="footer-icon">
                        <a href="https://www.facebook.com/share/175xk9W5M8/">
                            <img src={assets.facebook_icon} alt="" />
                        </a>
                        <a href="https://www.linkedin.com/in/dhruvil-parmar-964b80346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                            <img src={assets.linkedin_icon} alt="" />
                        </a>
                        <a href="">
                            <img src={assets.twitter_icon} alt="" />
                        </a>
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 8160194331</li>
                        <li>dhruvilparmar1819@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p>Copyright 2026 © Parmar Dhruvil - All rights reserved.</p>
        </div>
    )
}

export default Footer;