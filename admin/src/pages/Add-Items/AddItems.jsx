import React, { useEffect, useState } from 'react'
import { assets, Product_Category } from '../../assets/assets';
import axios from 'axios'
import "./AddItems.css"
import { toast } from 'react-toastify';


function AddItems() {

  const url = import.meta.env.VITE_BACKEND_URL;

  const [image, setImage] = useState(false);

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: ""
  })

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data => ({ ...data, [name]: value }))
  }

  const onsubmithandler = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    try {
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image",image);
  
      const response = await axios.post(`${url}/api/food/add`,formData);
  
      if(response.data.success){
        setData({
          name: "",
          description: "",
          category: "Salad",
          price: ""
        })
        setImage(false);
        toast.success(response.data.message);
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
    console.log(data)
  }, [onchangehandler])


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onsubmithandler}>

        <div className="add-img-upload flex-col">

          <p>Text Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            hidden
            required
          />

        </div>

        <div className="add-product-name flex-col">

          <p>Product Name</p>
          <input
            type="text"
            name='name'
            placeholder='Type here'
            onChange={onchangehandler}
            value={data.name}
          />

        </div>

        <div className="add-product-description flex-col">

          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            required
            placeholder="Write Content Here"
            onChange={onchangehandler}
            value={data.description}
          />

        </div>
        <div className="add-product-categroy-price">

          <div className="add-product-categroy flex-col">

            <p>Product Category</p>
            <select onChange={onchangehandler} name="category" >
              {Product_Category.map((item, index) => (
                <option key={index} value={item.name} >{item.name}</option>
              ))}
            </select>

          </div>

          <div className="add-product-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              placeholder='$20'
              name='price'
              onChange={onchangehandler}
              value={data.price}
            />
          </div>
        </div>
        <button className='add-btn' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddItems;
