import React, {useState } from 'react'
import './Home.css'
import axios from 'axios'
import { useEffect } from 'react'
import CardForHome from '../CardForHome/CardForHome'
import baseUrl from '../../Urls'

function Home() {
    const [AllProduct,setAllProduct] = useState([])
    useEffect(()=>{
        axios.get(`${baseUrl}/all-products`)
        .then((response)=>{
          setAllProduct(response.data)
          // setAllItem(response.data)
        
        }).catch((error)=>{
        })
      },[])
  return (
    <>
        <div className='home_container'>
            {AllProduct.map((product)=>{
                return(
                    <CardForHome product={product}/>
                )
            })}
        </div>
    </>
  )
}

export default Home