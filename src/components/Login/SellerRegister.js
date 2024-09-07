import React, { useState,useContext} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './SellerRegister.css'
import { UserContext } from '../../App'
import baseUrl from '../../Urls'

function SellerRegister() {
  const navigate = useNavigate()
  const {setseller} = useContext(UserContext)
  
  const [option,setoption] = useState('Login')
  const [data,setdata] = useState({})
  // const [name,setname] = useState(null)
  // const [email,setemail] = useState(null)
  // const [password,setpassword] = useState(null)
  // const [gst,setgst] = useState(null)
  // const [pan,setpan] = useState(null)
  // const [aadhar,setaadhar] = useState(null)
  // const [phone,setphone] = useState(null)
  // const [company,setcompany] = useState(null)
  // const [domain,setdomain] = useState(null)
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
  

  // const Submit =(type)=>{
  //   if(type==='Login'){
  //     if(email!==null && password!==null){
  //       axios.post(`${baseUrl}/seller-login`,{email:email,password:password})
  //         .then((response)=>{
  //           console.log(response.data) 
  //           setseller({user:response.data.user,jwttoken:response.data.auth})
  //           localStorage.setItem('user',JSON.stringify([response.data.user]))
  //           localStorage.setItem('jwttoken',JSON.stringify([response.data.auth]))
  //           navigate('/seller')
            
  //         }).catch((error)=>{
              
  //             setmessage('Something went wrong ! please try again later')
  //         })
  //     }else{
  //       setmessage('All Fields are Mandatory !')
  //       Timer(2000)
  //     }  
  //   }else{
  //     const data ={
  //       name:name,
  //       email:email,
  //       password:password,
  //       gst:gst,
  //       pan:pan,
  //       aadhar:aadhar,
  //       phone:phone,
  //       company:company,
  //       domain:domain,
  //       is_seller:true,
  //       is_created_Buyer_account:is_created_Buyer_account
  //     }

  //     if(name!==null && email!==null && password!==null&& gst!==null && pan!==null && phone!==null && company!==null && domain!==null){
  //       setclick('click')
  //       axios.post(`${baseUrl}/seller-register`,data)
  //       .then((response)=>{
  //         setmessage('Register Successfully !')
  //         PageReload()
  //       }).catch((error)=>{
          
  //       })
  //     }else{
  //       setmessage('All Fields are Mandatory !')
  //       Timer(2000)
  //     }  
  //   }
  // }
  // const ValueSelect =(e)=>{
  //   setdomain(e.target.value)
  // }
  const Login =(e)=>{
    e.preventDefault()
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

        

        

        {/* <div className='form'>
          {message && <p className='info-message' >{message}</p>}
          {option==='Login'?<></>:<input type="text" placeholder='User Name' value={name} onChange={(e)=>setname(e.target.value)}/>}

          <input type="email" placeholder='Email Id' value={email} onChange={(e)=>{setemail(e.target.value)}} required />

          <input type="password" placeholder='Password' value={password} onChange={(e)=>{setpassword(e.target.value)}} required />

          {option==='Login'?<></>:<input type="text" placeholder='Bussiness or Company Name' value={company} onChange={(e)=>{setcompany(e.target.value)}}/>}

          {option==='Login'?<></>:<input type="text" placeholder='GST Number' value={gst} onChange={(e)=>{setgst(e.target.value)}}/>}

          {option==='Login'?<></>:<input type="text" placeholder='Phone Number' value={phone} onChange={(e)=>{setphone(e.target.value)}}/>}

          {option==='Login'?<></>:<input type="text" placeholder='Aaddhar Number' value={aadhar} onChange={(e)=>{setaadhar(e.target.value)}}/>}

          {option==='Login'?<></>:<input type="text" placeholder='PAN Number' value={pan} onChange={(e)=>{setpan(e.target.value)}}/>}

          {option==='Login'?<></>:<select name="" id="" onChange={ValueSelect}>
            <option >Select Your Selling Domain</option>
            <option value='Clothes' >Clothes</option>
            <option value='Electronics/Gadgets'>Electronics/Gadgets</option>
            <option value='Mobiles/Laptops'>Mobiles/Laptops</option>
            <option value='Baby Products'>Baby Products</option>
            <option value='Toys/Games'>Toys/Games</option>
            <option value='Others'>Others</option>
          </select>}
          {option==='Login'?<></>:<div className='checkbox-account'><input type="checkbox" onChange={()=>set_is_created_Buyer_account(!is_created_Buyer_account)} id='user'/><label for='user'>Create Account as Buyer</label></div>}
          {click==='click'?<button>{`Seller `}{option }</button>:<button onClick={()=>Submit(option)}>{`Seller `}{option }</button>}
          
        </div> */}

    </>
  )
}

export default SellerRegister