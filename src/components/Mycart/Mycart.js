import React, { useState } from 'react'
import './Mycart.css'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../Urls'
import axios from 'axios'
import Address from '../Address/Address'
import {PulseLoader } from 'react-spinners'
function Mycart() {
  const {state,QuantityCounter,customer,setorder_id,order_id} = useContext(UserContext)
  const [loading,setloading] = useState(false)
  const [checkout,setcheckout] = useState(false)
  const [fetchAddress,setfetchAddress] = useState(undefined)
  const [IsAddress,setIsAddress] = useState(undefined)
  const [PaymentMethod,setPaymentMethod] = useState(undefined)
  const navigate = useNavigate()
  const [longurl,setlongurl] = useState(false)
  const [error,seterror] = useState()

  let jsonObject = state.map(JSON.stringify);
  let uniqueSet = new Set(jsonObject);
  const updated_state = Array.from(uniqueSet).map(JSON.parse);

  function grandTotal(){
    let s = 0
    updated_state.forEach((item)=>{
      s = s + item.selling_price*QuantityCounter(state)[item._id]
    })
    return s
  }

  const BookOrder =(AD)=>{
    // console.log('payment start....')
    setcheckout(true)
    const data = {
      user_id:customer.customer_user._id,
      name:customer.customer_user.name,
      email:customer.customer_user.email,
      phone:customer.customer_user.phone,
      amount:grandTotal(),
      order_products:QuantityCounter(state),
      address:AD,
      payment_mode:PaymentMethod
    }
    axios.post(`${baseUrl}/pay`,data)
    .then((response)=>{
      // console.log(response)
      // console.log(response.data.id)
     
      setlongurl(response.data.longurl)
      setorder_id(response.data.id)
    }).catch((error)=>{
      // console.log(error)
    })
  }

  // console.log('order id -->',order_id)
  // console.log('longurl-->',longurl)
  // console.log('qtycounter-->',QuantityCounter(state))
  // console.log('state ---->',state.length)

  const JumpToLogin =()=>{
    navigate('/login')
  }

  const GetAddress =(AD)=>{
    // console.log('mycart',AD)
    setfetchAddress(AD)
    setIsAddress(true)
  }

  const PlacedOrder =(e)=>{
    e.preventDefault()
    // console.log('placed order')
    BookOrder(fetchAddress)
  }

  function Error(){
    seterror('Something is missing Address or Payment Option')
    setTimeout(()=>{
      seterror('')
    },3000)
  }

  function COD(e){
    e.preventDefault()
    
    const coddetails = {
      user_id:customer.customer_user._id,
      amount:grandTotal(),
      products:QuantityCounter(state),
      address:fetchAddress,
      payment_status:'pending'
    }
    axios.post(`${baseUrl}/codorder`,coddetails)
    .then((response)=>{
      navigate('/cod')
    }).catch((error)=>{
      
    })
  }  
  return (
    <div className='mycart_container'>
        <div className='mycart_wrapper'>
            <h2>MyCart</h2>
            <table>
              <tr>
                <th>S.no</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Total Price</th>
              </tr>
              {updated_state.map((item,index)=>{
                return (
                  <tr>
                    <td>{index+1}</td>
                    <td>{item.productname}</td>
                    <td>{item.selling_price} ₹</td>
                    <td>{item._id in QuantityCounter(state)?QuantityCounter(state)[item._id]:0}</td>
                    <td>{item._id in QuantityCounter(state)?QuantityCounter(state)[item._id]*item.selling_price:0} ₹</td>
                  </tr>
                )
              })} 
             
            </table>
            <div className='final_price'>
                <p>Grand Total <span>{grandTotal()} ₹</span></p> 
                
                {state.length!==0?customer.customer_user.name===undefined?<button onClick={JumpToLogin}>CHECKOUT</button>:<button onClick={()=>{setcheckout(!checkout)}}>CHECKOUT</button>:<></>}
                
            </div>
        </div>
        {checkout===false?<></>:<div className='Address-payment'>
          <Address GetAddress={GetAddress}/>
          <div className='payment'>
            <h3>Payment Method</h3>
            {error!==''?<p className='error'>{error}</p>:<></>}
            <form>
              {longurl===false ? <div><input type="radio" name='payment-option' onChange={()=>setPaymentMethod('COD')} /> Cash On Delivery</div>:<></>}
              
              <div><input type="radio" name='payment-option' onChange={()=>setPaymentMethod('ONLINE')}/> Debit / Credit / NetBanking (Online)</div>
            </form>

            {longurl===false ? IsAddress===true && PaymentMethod==='ONLINE' ? <><button className='place-order-btn' onClick={PlacedOrder}>Proceed</button></>: PaymentMethod==='COD' && IsAddress===true ? <button className='place-order-btn' onClick={COD}>COD</button> : <button className='place-order-btn' onClick={Error}>Proceed</button>:<><a href={`${longurl}`} onClick={()=>setloading(true)}><button className='place-order-btn'>Pay {grandTotal()} ₹</button></a><span id='payment-beatloader'><PulseLoader loading={loading} size={10} /></span></>}

            {/*  */}
          </div>
        </div>}
    </div>
  )
}

export default Mycart