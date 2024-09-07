import React, { useEffect } from 'react'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../Urls'
function Success() {
    const [SearchParam,setparam] = useSearchParams()
    const payment_request_id = SearchParam.get('payment_request_id')
    const payment_status = SearchParam.get('payment_status')
    useEffect(()=>{
        axios.post(`${baseUrl}/success`,{payment_request_id:payment_request_id,payment_status:payment_status})
        .then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    console.log('params',payment_request_id)
    console.log('status',payment_status)
  return (
    <h1>Order has been Booked Successfully</h1>
  )
}

export default Success