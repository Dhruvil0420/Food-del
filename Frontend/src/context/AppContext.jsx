import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

    const [cartItem, setCartItem] = useState({});
    const cartCount = Object.values(cartItem)
    .reduce((total, qty) => total + qty, 0);
    const [token, setToken] = useState("");

    const [food_list, setfoodList] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;

    const addToCart = async (itemId) => {  
        if(!token){
            toast.error("Please Login");
            return;
        }
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        try {
            const respones = await axios.post(`${url}/api/cart/add`, { itemId }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if(respones.data.success){
                toast.success(respones.data.message);
            }
            else{
                toast.error(respones.data.message);
            }
        } 
        catch (error) {
            toast.error(error.message);
        }
        
    }

    const removeToCart = async(itemId) => {
        if(!token){
            toast.error("Please Login");
            return;
        }
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(token){
            try {
                const respones = await axios.post(`${url}/api/cart/remove`, { itemId }, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                if(respones.data.success){
                    toast.success(respones.data.message);
                }
                else{
                    toast.error(respones.data.message);
                }
            } 
            catch (error) {
                toast.error(error.message);
            }
        }
    }

    
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setfoodList(response.data.data);
        }
        else {
            toast.error(response.data.message);
        }
    }

    const featchFoodcartData = async() => {

        const response = await axios.get(`${url}/api/cart/get`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if(response.data.success){
            setCartItem(response.data.cartData);
        }
        else{
            toast.error(response.data.message);
        }
    }

    const getTotalPrice = () => {
        let price = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                const itemInfo = food_list.find(
                    product => product._id === item
                );
                if (!itemInfo) continue; 
                price += itemInfo.price * cartItem[item];
            }
        }
        return price;
    };

    useEffect(() => {

        fetchFoodList();

        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            featchFoodcartData();
        }
    }, [token]);


    const contextValue = {
        food_list,
        cartItem, setCartItem,
        addToCart,
        removeToCart,
        getTotalPrice,
        token, setToken,
        cartCount
    }
    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;