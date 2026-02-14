import Navbar from "./componetes/Navbar/Navbar.jsx"
import Sidebar from "./componetes/sidebar/Sidebar.jsx"
import { Route,Routes } from "react-router-dom"
import AddItems from "./pages/Add-Items/AddItems.jsx"
import ListItems from "./pages/List-Items/ListItems.jsx"
import Orders from './pages/Orders/Orders.jsx'
import  { Toaster } from 'react-hot-toast';
import LoginPopup from "./componetes/LoginPopup/LoginPopup.jsx"
import { useContext } from "react"
import { AppContext } from "./context/AppContext.jsx"
import { useLocation } from "react-router-dom";

function App() {

  const { adminToken } = useContext(AppContext);
  const location = useLocation();

  const isLoginPage = location.pathname === "/admin/login";

  return (
    <div>
      <Toaster/>

      {/* Hide layout on login page */}
      {!isLoginPage && adminToken && (
        <>
          <hr />
          <Navbar />
        </>
      )}

      <div className="app-content">
        {!isLoginPage && adminToken && <Sidebar />}

        <Routes>
          <Route path="/admin/login" element={<LoginPopup />} />
          <Route path="/" element={<AddItems />} />
          <Route path="/add" element={<AddItems />} />
          <Route path="/list" element={<ListItems />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;