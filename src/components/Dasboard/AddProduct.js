import axios from 'axios';
import React, { useState } from 'react'
import './AddProduct.css'
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../Urls';
import {BeatLoader } from 'react-spinners'

function AddProduct() {
  const [loading,setloading] = useState(false)
  const navigate = useNavigate()
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)[0]
  const [formdata,setformdata] = useState(new FormData)
  const [post,setpost] = useState()

  const handleClick =(e)=>{
    e.preventDefault()
    setloading(true)
        post['user_id'] = auth._id
        formdata.append('data',JSON.stringify(post))
        axios.post(`${baseUrl}/file-upload`,formdata, {
          headers: {
              'Content-Type': 'multipart/form-data'}
          })
          .then((response)=>{
            console.log(response.data)
            navigate('/seller-products')
          }).catch((error)=>{
            
          })
      } 

  const handleFileInput = (e) => {
    formdata.append('image', e.target.files[0], e.target.files[0].name);
  }

  const handleInput = (e) => { 
    setpost({...post,[e.target.name]:e.target.value})
  }  

  return (
    <>
      <form className='addproduct_container' onSubmit={handleClick}>
        <input type="text" placeholder='Product Name' name='productname' onChange={handleInput} required />
        <input type="number" placeholder='Price ₹' name='price' onChange={handleInput} required />
        <input type="number" placeholder='Discount %' name='discount' onChange={handleInput} required />
        <input type="number" placeholder='Quantity' name='qty' onChange={handleInput} required/>

        <select name="category" id="category" onChange={handleInput} required>
            <option >Select Product Category</option>
            <option value='Clothes' >Clothes</option>
            <option value='Electronics'>Electronics</option>
            <option value='Laptops'>Laptops</option>
            <option value='Mobiles'>Mobiles</option>
            <option value='Baby Products'>Baby Products</option>
            <option value='Toys/Games'>Toys</option>
        </select>

        <textarea name="description" id="" placeholder='Description' onChange={handleInput} required></textarea>
        <input type="file" id='file' onChange={handleFileInput} required/>
        <button>upload</button>
      </form>
      <div className='addproduct-propagate'>
        <BeatLoader loading={loading} />
      </div>
    </>
  )
}

export default AddProduct