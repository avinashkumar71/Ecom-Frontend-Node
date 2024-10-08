import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './MyOrder.css'
import axios from 'axios'
import baseUrl from '../../Urls'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function MyOrder() {
    const {customer,AllItem} = useContext(UserContext)
    const [details,setdetails] = useState([])
    const [mode,setmode] = useState('ONLINE')
    const navigate = useNavigate()

    useEffect(()=>{
        if(customer.customer_user._id===undefined){
            navigate('/')
        }
    })

    useEffect(()=>{
        if(mode==='ONLINE'){
                axios.post(`${baseUrl}/myorder`,{user_id:customer.customer_user._id})
                .then((response)=>{
                    setdetails(response.data)
                }).catch((error)=>{
                    
                })
        }else if(mode==='COD'){
                
                axios.post(`${baseUrl}/my-cod-order`,{user_id:customer.customer_user._id})
                .then((response)=>{
                    setdetails(response.data)
                }).catch((error)=>{
                    
                })
        }
    },[mode])


    function Address(obj){
        const values = Object.values(obj)
        const text = values.toString()
        return text
    }

    function ProductID(obj){
        const keys = Object.keys(obj)
        return keys
    }

  return (
    <>
        <div className='myorder-container'>
            <div className='myorder-payment-btn'>
                <button onClick={()=>setmode('ONLINE')}>Online</button>
                <button onClick={()=>setmode('COD')}>Cash On Delivery</button>
            </div>
            <div className='online-myorder-table'>
                <h2>MyOrder</h2>
                <table>
                <tr>
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th className='myorder-details-values'>Address</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th className='myorder-details-values'>Delivery Status</th>
                </tr>
                {details.map((item,index)=>{
                    return (
                    <tr>
                        <td>{index+1}</td>
                        <td className='myorder-products-id'>{ProductID(item.products).map((pid)=>{
                            return(
                                <td>
                                    <NavLink to={`/description/${pid}`}>
                                        {pid.slice(10,17)}
                                    </NavLink>
                                </td>
                            )
                        })}</td>
                        
                        {/* <td>{ProductID(item.products)}</td> */}
                        <td className='myorder-details-values'>{Address(item.address)}</td>
                        <td>{item.amount} ₹</td>
                        <td >{item.payment_status}</td>
                        <td className='myorder-details-values'>Pending</td>
                    </tr>
                    )
                })} 
                
                </table>
               
            </div>
        </div>
    </>
  )
}

export default MyOrder