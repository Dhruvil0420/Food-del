import React from 'react';
import { assets } from '../../assets/assets.js';
import './navbar.css'
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext.jsx';

  function Navbar() {

    const { handleLogout ,adminToken } = useContext(AppContext);

    return (
      <div className="navbar">
        <img className="logo" src={assets.logo} alt="App logo" />

        <div className="nav-right">
          <img
            className="profile"
            src={assets.profile_image}
            alt="Admin profile"
          />

          {adminToken && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    );
  }

export default Navbar;