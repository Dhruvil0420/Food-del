import './LoginPopup.css'
import { useState } from 'react';
import axios from "axios"
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
function LoginPopup() {

    const [email, setEmail] = useState('dhruvilparmar@gmail.com');
    const [password, setPassword] = useState('Dhruvil@20');

    const url = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const { setShowLogin, setAdminToken } = useContext(AppContext);

    const onLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${url}/api/admin/login`, {
                email: email,
                password: password
            });

            if (response.data.success) {
                setAdminToken(response.data.token);
                localStorage.setItem("adminToken", response.data.token);
                navigate("/")
                setShowLogin(false);
                toast.success(response.data.message);
            }
            else {
                toast.error(response.data.message);
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
                    <h2>Admin Login</h2>
                </div>
                <div className="login-popup-inputs">
                    <input
                        type="email"
                        placeholder='email'
                        required
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        required
                        placeholder='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button type='submit' >Login</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>I agree to the terms and conditions and privacy policy</p>
                </div>
            </form>
        </div>
    )
}

export default LoginPopup;
