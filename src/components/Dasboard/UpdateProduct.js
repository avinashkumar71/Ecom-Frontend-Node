import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './UpdateProduct.css'
import baseUrl from '../../Urls'

function UpdateProduct() {
    const navigate = useNavigate()
    const product_id = useParams()
    const [formdata,setformdata] = useState(new FormData())
    const [post,setpost] = useState({})
    const [productname,setproductname] = useState()
    const [price,setprice] = useState()
    const [discount,setdiscount] = useState()
    const [qty,setqty] = useState()
    const [description,setdescription] = useState()
    const [category,setcategory] = useState()
    const [ImageUrl,setImageUrl] = useState()
    const [img,setimg] = useState(false)
    
    useEffect(()=>{
        axios.get(`${baseUrl}/get-update-product-details/${product_id.id}`)
        .then((response)=>{
            const data = response.data[0]
            setproductname(data.productname)
            setprice(data.price)
            setdiscount(data.discount)
            setqty(data.qty)
            setdescription(data.description)
            setcategory(data.category)
            setImageUrl(data.ImageUrl)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    // console.log('price',price)
    // console.log('discount',discount)
    // console.log('qty',qty)

    

    const handleClick =(e)=>{
        e.preventDefault()
        post['productname'] = productname
        post['price'] = price
        post['qty'] = qty
        post['discount'] = discount
        post['category'] = category
        post['description'] = description
        if(img===false){
            post['ImageUrl'] = ImageUrl
        } 
        
        
        formdata.append('data',JSON.stringify(post))

        axios.post(`${baseUrl}/update-product/${product_id.id}`,formdata,{
            headers: {
                'Content-Type': 'multipart/form-data'}
            })
        .then((response)=>{
            
            navigate('/seller-products')
            
        }).catch((error)=>{
            
        })  
    }

    const handleFileInput = (e) => {
        formdata.append('image', e.target.files[0], e.target.files[0].name);
        setimg(true)
      }

    // const handleInput = (e) => { 
    //     setpost({...post,[e.target.name]:e.target.value})
    //   }  

  return (
    <>
        <div className='update_container'>
            <form onSubmit={handleClick}>
                <div className='input_container'>
                    <label htmlFor="">Product Name</label>
                    <input type="text" placeholder='Product Name' name='productname' value={productname} onChange={(e)=>setproductname(e.target.value)} required/>
                </div>
                <div className='input_container'>
                    <label htmlFor="" >Price</label>
                    <input type="number" placeholder='Price ₹ Mandatory' name='price' value={price} onChange={(e)=>setprice(e.target.value)} required />
                </div>
                <div className='input_container'>
                    <label htmlFor="">Discount</label>
                    <input type="number" placeholder='Discount % Mandatory' name='discount' value={discount} onChange={(e)=>setdiscount(e.target.value)} required />
                </div>
                <div className='input_container'>
                    <label htmlFor="">Qty</label>
                    <input type="number" placeholder='Quantity' name="qty" value={qty} onChange={(e)=>setqty(e.target.value)} />
                </div>
                <div className='input_container'>
                    <label htmlFor="">Category</label>
                    <select name="category" id="categorys" value={category} onChange={(e)=>setcategory(e.target.value)}>
                        <option >Select Product Category</option>
                        <option value='Clothes' >Clothes</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Laptops'>Laptops</option>
                        <option value='Mobiles'>Mobiles</option>
                        <option value='Baby Products'>Baby Products</option>
                        <option value='Toys/Games'>Toys</option>
                    </select>
                </div>
                <div className='input_container'>
                    <label htmlFor="">Description</label>
                    <textarea  id="" placeholder='Description' name='description' value={description} onChange={(e)=>{setdescription(e.target.value)}}></textarea>
                </div>
                <input type="file" id='file' onChange={handleFileInput} />
                <button>Confirm</button>
            </form>
        </div>
    </>
  )
}

export default UpdateProduct