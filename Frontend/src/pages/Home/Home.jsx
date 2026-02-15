import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Home.css'
import Header from '../../components/Header/Header.jsx';
import Exploremenu from '../../components/Exploremenu/Exploremenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx';

function Home() {

    const [category, setCategory] = useState("All");
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    return (
        <div>
            <Header/>
            <Exploremenu category={category} setCategory = {setCategory}/>
            <FoodDisplay category = {category} />
            <AppDownload/>
        </div>
    )
}

export default  Home;