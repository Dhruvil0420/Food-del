import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast"

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [adminToken, setAdminToken] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdminToken(null);
    setShowLogin(true);
    navigate("/admin/login", { replace: true });
    toast.success("Admin Logout")
  };

  useEffect(() => {
    const saved = localStorage.getItem("adminToken");
    if (saved) {
      setAdminToken(saved);
      setShowLogin(false);
    }
  }, []);

  const contextValue = {
    adminToken,
    setAdminToken,
    showLogin,
    setShowLogin,
    handleLogout
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
