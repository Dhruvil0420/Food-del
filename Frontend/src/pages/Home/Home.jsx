import {useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header.jsx';
import Exploremenu from '../../components/Exploremenu/Exploremenu.jsx';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AppDownload.jsx';

function Home() {

    const [category,setCategory] = useState("All");

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