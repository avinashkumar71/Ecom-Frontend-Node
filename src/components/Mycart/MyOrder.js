import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import './MyOrder.css'
import axios from 'axios'
import baseUrl from '../../Urls'
import { NavLink } from 'react-router-dom'

function MyOrder() {
    const {customer,AllItem} = useContext(UserContext)
    console.log('my order Allitem',AllItem)
    const [details,setdetails] = useState([])
    const [mode,setmode] = useState('ONLINE')

    useEffect(()=>{
        if(mode==='ONLINE'){
            console.log('online -------> ')
                axios.post(`${baseUrl}/myorder`,{user_id:customer.customer_user._id})
                .then((response)=>{
                    console.log('my online order response-------->',response.data)
                    setdetails(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
        }else if(mode==='COD'){
                console.log('cod ---------->')
                axios.post(`${baseUrl}/my-cod-order`,{user_id:customer.customer_user._id})
                .then((response)=>{
                    console.log('my cod order response-------->',response.data)
                    setdetails(response.data)
                }).catch((error)=>{
                    console.log(error)
                })
        }
    },[mode])


    function Address(obj){
        const values = Object.values(obj)
        const text = values.toString()
        return text
    }

    function ProductShortName(obj){
        const keys = Object.keys(obj)
        let Arry = []
        for(let pid of keys){
            const U_PID = pid.slice(0,7)
            Arry.push(U_PID)
        }
        // console.log('Arry --->',Arry)
        const id = Arry.toString()
        return id
    }

    function ProductID(obj){
        const keys = Object.keys(obj)
        return keys
    }


    // console.log('all items in myorder',AllItem)
    // console.log('details --->',details)
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
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Payment Status</th>
                    <th>Delivery Status</th>
                </tr>
                {details.map((item,index)=>{
                    return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{ProductID(item.products).map((pid)=>{
                            return(
                                <td>
                                    <NavLink to={`/description/${pid}`}>
                                        {pid.slice(10,17)}
                                    </NavLink>
                                </td>
                            )
                        })}</td>
                        
                        {/* <td>{ProductID(item.products)}</td> */}
                        <td>{Address(item.address)}</td>
                        <td>{item.amount} ₹</td>
                        <td>{item.payment_status}</td>
                        <td>Pending</td>
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