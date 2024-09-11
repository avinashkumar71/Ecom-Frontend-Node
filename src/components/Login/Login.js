import React,{useState,useContext} from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
import baseUrl from '../../Urls'


function Login() {
  console.log('login component')
  const {setcustomer} = useContext(UserContext)
  const [data,setdata] = useState()
  const [login,setlogin] = useState(false)
  const [message,setmessage] = useState('')
  const navigate = useNavigate()
  console.log('------------>',data)
  function Timer(){
    setTimeout(()=>{
      setmessage('')
    },2000)
  }
  const ClickSubmit =(e)=>{
    e.preventDefault()
    if(login===true){
        axios.post(`${baseUrl}/customer-login`,data)
        .then((response)=>{
          console.log('********>',response.data)
          localStorage.setItem('customer_user',JSON.stringify([response.data.user]))
          localStorage.setItem('jwttoken',JSON.stringify([response.data.auth]))
          setcustomer({customer_user:response.data.user,jwttoken:response.data.auth})
          navigate('/')
          window.location.reload()
        }).catch((error)=>{
          console.log(error)
        })
        setmessage('credential are incorrect')
        Timer()
        setdata(data)
    }else{
        data['is_seller'] = false
        axios.post(`${baseUrl}/customer-register`,data)
        .then((response)=>{
          localStorage.setItem('customer_user',JSON.stringify([response.data.user]))
          localStorage.setItem('jwttoken',JSON.stringify([response.data.auth]))
          setcustomer({customer_user:response.data.user,jwttoken:response.data.auth})
          navigate('/')
        }).catch((error)=>{

        })
        setdata({})
    }
  }
    
  const HandleInput =(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }

  return (
    <>
      <div className='login_container'>
        {login===true?<h2>Sign In</h2>:<h2>Sign Up</h2>}
        {message===''?<></>:<>{message}</>}
        <form onSubmit={ClickSubmit}>
          {login===true?<></>:<input type="text" placeholder='Enter Your Name' name='name'onChange={HandleInput} required /> }
          {login===true?<></>:<input type="number" placeholder='Enter Your Phone' name='phone' onChange={HandleInput} required />}
          
          <input type="email" placeholder='Enter Your Email' name='email' onChange={HandleInput} required />
          <input type="password" placeholder='Password' name='password' onChange={HandleInput} required/>
          <button>Submit</button>  
        </form> 

        {login===true?<p>Don't Have Account ? <span id='login' onClick={()=>setlogin(!login)}>Register</span></p>:<p>Already Have Account ? <span id='login' onClick={()=>setlogin(!login)}>Login</span></p>}
        
      </div>
    </>
  )
}

export default Login