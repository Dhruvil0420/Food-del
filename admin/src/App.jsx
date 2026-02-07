import Navbar from "./componetes/Navbar/Navbar.jsx"
import Sidebar from "./componetes/sidebar/Sidebar.jsx"
import { Route,Routes } from "react-router-dom"
import AddItems from "./pages/Add-Items/AddItems.jsx"
import ListItems from "./pages/List-Items/ListItems.jsx"
import Orders from './pages/Orders/Orders.jsx'
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element = {<AddItems/>}/>
          <Route path="/list" element = {<ListItems/>}/>
          <Route path="/orders" element= {<Orders/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
