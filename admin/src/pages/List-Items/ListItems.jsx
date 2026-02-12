import axios from 'axios'
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import "./ListItems.css"
import Loading from '../../componetes/Loading/Loading.jsx';
import { AppContext } from '../../context/AppContext.jsx';


function ListItems() {

    const [list, setList] = useState([]);
    const [loading,setLoading] = useState(true);

    const url = import.meta.env.VITE_BACKEND_URL;

    const {adminToken} = useContext(AppContext);
    
    const ListItem = async () => {
        try {
            const respones = await axios.get(`${url}/api/admin/list`,{
                headers: {token: adminToken}
            });

            if (respones.data.success) {
                setList(respones.data.data);
            }
            else {
                toast.error(respones.data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

    const removeItem = async(FooId) => {
        setLoading(true);
        try {
           const response = await axios.post(`${url}/api/admin/remove`,{id:FooId},{
            headers: {token:adminToken}
           });
           if(response.data.success){
               toast.success(response.data.message)
               await ListItem();
           }
           else{
            toast.error(response.data.message,{
                toastId: "remove-error"
            });
           }
        } 
        catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(adminToken) {
            ListItem();
        }
    }, [adminToken])

    if(loading) return <Loading/>
    
    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <table className='list-table'>

                <thead>
                    <tr className='list-table-format title'>
                        <th>Image</th>
                        <th className='thead-name'>Name</th>
                        <th className='thead-category'>Category</th>
                        <th>price</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={item._id} className='list-table-format'>
                            <td className=''>
                                <img src={item.image ? item.image : "/placeholder.png"} alt={item.name} />
                            </td>
                            <td className='tbody-name'>{item.name}</td>
                            <td className='tbody-category'>{item.category}</td>
                            <td>{item.price}</td>
                            <td onClick = {() => removeItem(item._id)} className='cursor'>X</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListItems;