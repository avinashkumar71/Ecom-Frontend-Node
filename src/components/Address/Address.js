import React, { useState } from 'react'
import './Address.css'
function Address(props) {
  const [data,setdata] = useState()
  const [fetchAddress,setfetchAddress] = useState(undefined)
  const Handler =(e)=>{
    e.preventDefault()
    setfetchAddress(data)
    props.GetAddress(data)
  }
  const HandleInput =(e)=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  return (
    <>
        <div className='address'>
          <h3>Your Address</h3>
          <form onSubmit={Handler}>
              <input type="text" placeholder='Name' name='name' onChange={HandleInput}  required/>
              <input type="text" placeholder='Flat / Street / Landmark' name='landmark' onChange={HandleInput} required/>
              <input type="text" placeholder='city' name='city' onChange={HandleInput} required/>
              <input type="text" placeholder='state' name='state' onChange={HandleInput} required/>
              <input type="text" placeholder='pincode' name='pincode' onChange={HandleInput} required/>
              <input type="text" placeholder='Phone' name='phone' onChange={HandleInput} required/>
              <button>Save Address</button>
          </form>
          {fetchAddress!==undefined?<div className='print-address-div'><h3>Your Delivery Address</h3><p className='print-address'>{`${fetchAddress.name}, ${fetchAddress.landmark}, ${fetchAddress.city}, ${fetchAddress.state}, ${fetchAddress.pincode}, +91 ${fetchAddress.phone} `}</p></div>:<></>}
        </div>
    </>
  )
}

export default Address