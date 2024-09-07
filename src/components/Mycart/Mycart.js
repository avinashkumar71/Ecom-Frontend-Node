import React, { useState } from 'react'
import './Mycart.css'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../Urls'
import axios from 'axios'
function Mycart() {
  const {state,QuantityCounter,customer,setorder_id,order_id} = useContext(UserContext)
  const navigate = useNavigate()
  const [longurl,setlongurl] = useState(undefined)
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

  const PlaceOrder =()=>{
    console.log('payment start....')
    const data = {
      user_id:customer.customer_user._id,
      name:customer.customer_user.name,
      email:customer.customer_user.email,
      phone:customer.customer_user.phone,
      amount:grandTotal(),
      order_products:QuantityCounter(state)

    }
    axios.post(`${baseUrl}/pay`,data)
    .then((response)=>{
      console.log(response)
      console.log(response.data.id)
     
      setlongurl(response.data.longurl)
      setorder_id(response.data.id)
    }).catch((error)=>{
      console.log(error)
    })
    
  }
  console.log('order id -->',order_id)
  console.log('longurl-->',longurl)
  console.log('qtycounter-->',QuantityCounter(state))

  const JumpToLogin =()=>{
    navigate('/login')
  }

  const Pay =()=>{
    
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
                {}
                {longurl!==undefined?<a href={`${longurl}`}><button>Proceed to pay</button></a>:customer.customer_user.name===undefined?<button onClick={JumpToLogin}>Place order</button>:<button onClick={PlaceOrder}>Place order</button>}
            </div>
        </div>
    </div>
  )
}

export default Mycart