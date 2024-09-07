import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './productlist.css'
import Card from '../Card/Card'
import { UserContext } from '../../App'
import baseUrl from '../../Urls'

function ProductList() {
  const {seller} = useContext(UserContext)
  const [products,setproducts] = useState([])
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)[0]

  useEffect(()=>{
    axios.post(`${baseUrl}/all-products-by-user/${auth._id}`,{headers:{authorization:`bearer ${seller.jwttoken}`}}
    )
    .then((response)=>{
      console.log(response.data)
      setproducts(response.data)
    }).catch((error)=>{
      
    })
  },[seller.jwttoken])
  console.log(`products type of -------> ${products}`,typeof products)
  console.log(`jwttoken ----->`,seller.jwttoken)
  return (
    <>
      <div className='productlist_container'>
        {products.map((product)=>{
          return(
            <div>
              <Card product={product} auth={auth}/>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ProductList