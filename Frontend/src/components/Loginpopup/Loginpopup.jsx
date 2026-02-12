import { useState } from 'react'
import { assets } from '../../assets/assets';
import './Loginpopup.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function Loginpopup({ setShowLogin }) {

    const url = import.meta.env.VITE_BACKEND_URL;

    const { setToken } = useContext(AppContext);

    const [State, setState] = useState("Sign Up");

    const [userData, setuserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onchangehandler = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setuserData(data => ({ ...data, [name]: value }));
    }


    // Login Function
    const onLogin = async (event) => {
        event.preventDefault();
        let newurl = url;
        if (State === "Login") {
            newurl += "/api/user/login";
        }
        else {
            newurl += "/api/user/register"
        }

        try {
            const response = await axios.post(newurl, userData);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);
                setShowLogin(false);
                toast.success(response.data.message)
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{State}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <div className="login-popup-inputs">
                    {State === "Sign Up" && (
                        <input
                            type="text"
                            placeholder='name'
                            required
                            name='name'
                            value={userData.name}
                            onChange={onchangehandler}
                        />
                    )}
                    <input
                        type="text"
                        placeholder='email'
                        required
                        name='email'
                        value={userData.email}
                        onChange={onchangehandler}
                    />
                    <input
                        type="password"
                        placeholder='password'
                        required
                        name='password'
                        value={userData.password}
                        onChange={onchangehandler}
                    />
                </div>
                <button type='submit' >{State === "Sign Up" ? "create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the terms and conditions and privacy policy</p>
                </div>
                {State === "Sign Up" ?
                    <p>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
                    : <p>Create a new account? <span onClick={() => setState("Sign Up")}>Click here</span> </p>
                }

            </form>
        </div>
    )
}

export default Loginpopup;