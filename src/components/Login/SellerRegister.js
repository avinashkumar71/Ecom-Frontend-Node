import React, { useState,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SellerRegister.css'
import { UserContext } from '../../App'
import baseUrl from '../../Urls'
import {BarLoader,BeatLoader } from 'react-spinners'

function SellerRegister() {
  const navigate = useNavigate()
  const [loading,setloading] = useState(false)
  const {setseller} = useContext(UserContext)
  const [option,setoption] = useState('Login')
  const [data,setdata] = useState({})
  const [is_created_Buyer_account,set_is_created_Buyer_account] = useState(false)
  const [message,setmessage] = useState(null)
  const [click,setclick] = useState(null)

  function Timer(sec){
    setTimeout(() => {
      setmessage(null)
    }, sec);
  }

  function PageReload(){
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
  
  const Login =(e)=>{
    e.preventDefault()
    setloading(true)
    console.log(data)
    axios.post(`${baseUrl}/seller-login`,data)
           .then((response)=>{
             if(response.data.user){
              setseller({user:response.data.user,jwttoken:response.data.auth})
              localStorage.setItem('user',JSON.stringify([response.data.user]))
              localStorage.setItem('jwttoken',JSON.stringify([response.data.auth]))
              navigate('/seller')
             }
             else{
                setmessage('Credential are Incorrect')
                Timer(2000)
             }
            
           }).catch((error)=>{
              console.log('----====>',error)
           })
  }
  const Register =(e)=>{
    e.preventDefault()
    setloading(true)
    data['is_seller'] = true
    data['is_created_Buyer_account'] = is_created_Buyer_account
    console.log(data)
    axios.post(`${baseUrl}/seller-register`,data)
         .then((response)=>{
            setmessage('Register Successfully !')
          //  PageReload()
          }).catch((error)=>{
            
       })
  }
  const HandleInput =(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  return (
    <>
        <div className='heading_sellerRegister'>
          <p onClick={()=>{setoption('Login')}}>Login</p>
          <p onClick={()=>{setoption('Registration')}}>registration</p>
        </div>
        {message===null?<></>:<>{message}</>}
        {option==='Login'?<form className='form' onSubmit={Login} >
          <input type="email" placeholder='Email Id' name='email' onChange={HandleInput} required />
          <input type="password" placeholder='Password' name='password' onChange={HandleInput} required />
          <button>Login</button>
        </form>:<form className='form' onSubmit={Register}>
          <input type="text" placeholder='User Name' name='name' onChange={HandleInput} required/>
          <input type="email" placeholder='Email Id' name='email' onChange={HandleInput} required />
          <input type="password" placeholder='Password' name='password' onChange={HandleInput} required />
          <input type="text" placeholder='Bussiness or Company Name' name='company' onChange={HandleInput} required/>
          <input type="text" placeholder='GST Number' name='gst' onChange={HandleInput} required/>
          <input type="text" placeholder='Phone Number' name='phone' onChange={HandleInput} required/>
          <input type="text" placeholder='Aaddhar Number' name='aadhar' onChange={HandleInput} required/>
          <input type="text" placeholder='PAN Number' name='pan' onChange={HandleInput} required/>

          <select name="domain" id="" onChange={HandleInput} required>
            <option value='Clothes'>Select Your Selling Domain</option>
            <option value='Clothes' >Clothes</option>
            <option value='Electronics/Gadgets'>Electronics/Gadgets</option>
            <option value='Mobiles/Laptops'>Mobiles/Laptops</option>
            <option value='Baby Products'>Baby Products</option>
            <option value='Toys/Games'>Toys/Games</option>
            <option value='Others'>Others</option>
          </select>
          <div className='checkbox-account'><input type="checkbox" id='user' onClick={()=>set_is_created_Buyer_account(!is_created_Buyer_account)}/><label for='user'>Create Account as Buyer</label></div>
          <button>Register</button>
        </form>}
        <div className='seller-propagate'>
          <BeatLoader loading={loading} />
      </div>
    </>
  )
}

export default SellerRegister