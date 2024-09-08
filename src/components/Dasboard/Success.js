import React, { useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../Urls'
import './success.css'
function Success() {
    const [SearchParam,setparam] = useSearchParams()
    const navigate = useNavigate()
    const payment_request_id = SearchParam.get('payment_request_id')
    const payment_status = SearchParam.get('payment_status')
    function timer(){
      setTimeout(()=>{
        navigate('/')
      },4000)
    }
    useEffect(()=>{
        axios.post(`${baseUrl}/success`,{payment_request_id:payment_request_id,payment_status:payment_status})
        .then((response)=>{
            console.log(response.data)
            timer()
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    
    console.log('params',payment_request_id)
    console.log('status',payment_status)
  return (
    <>
      <div>
        <h1>Order Placed Successfully  <span><i class="fa-solid fa-rotate"></i></span></h1>
        <p>Redirecting ...</p>
      </div>
    </>
  )
}

export default Success