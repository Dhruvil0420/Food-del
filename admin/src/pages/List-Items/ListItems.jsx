import axios from 'axios'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import "./ListItems.css"


function ListItems() {

    const [list, setList] = useState([]);

    const url = import.meta.env.VITE_BACKEND_URL;

    const ListItem = async () => {


        try {
            const respones = await axios.get(`${url}/api/food/list`);

            if (respones.data.success) {
                setList(respones.data.data);
                console.log(respones.data.data);
            }
            else {
                toast.error(respones.data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    const removeItem = async(FooId) => {
        try {
           const response = await axios.post(`${url}/api/food/remove`,{id:FooId});
           await ListItem();
           if(response.data.success){
            toast.success(response.data.message)
           }
           else{
            toast.error(response.data.message);
           }
        } 
        catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        ListItem();
    }, [])

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
                                <img src={item.image ? `${url}/images/${item.image}` : "/placeholder.png"} alt={item.name} />
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