import React from 'react'
import './Card.css'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'
import baseUrl from '../../Urls'
function Card({product,auth}) {
    const navigate = useNavigate()

    const Delete =(product_id)=>{
        
        let value = window.confirm('This product will Delete Permanetly')
        if(value===true){
            axios.delete(`${baseUrl}/delete-product/${product_id}`)
            .then((response)=>{
                
                window.location.reload()
            }).catch((error)=>{
                
            })
        }
    }

    const Update =(product_id)=>{
        navigate(`/seller-product-update/${product_id}`)
    }
  return (
    <>
        <div className='card_container'>
            <div className='card_wrapper'>
                <NavLink to={`/description/${product.user_id}`}>
                    <div className='image_wrapper'>
                    <img src={`${product.ImageUrl}`} alt="" />
                        <p className='offer_price_off'>{product.discount}% OFF</p>
                    </div>
                </NavLink>    
                <div className='itemname_description'>
                    <p className='itemname'>{product.productname}</p>
                    <p className='description'>seller {auth.company}</p>
                    <p className='description'>{product.description}</p>
                </div>
                <div className='price_add_to_cart'>
                    <p><span className='mark_price'>{product.price} ₹</span><span className='selling_price'>{product.selling_price} ₹</span></p>

                    {/* {product.id in QuantityCounter(state)?<>
                                                            <span className='De' onClick={()=>{Decrease(product)}}>-</span>
                                                            {product.id in QuantityCounter(state)?<span className='cart_number' >{QuantityCounter(state)[product.id]}</span>:<div></div>}
                                                            <span className='In' onClick={()=>{Increase(product)}}>+</span>
                                                        </>
                                                            :
                                                            <button onClick={()=>{Increase(product)}}>Add</button>} */}
                
                </div>
            </div>
            <div className='update_delete'>
                <span className='delete' onClick={()=>Delete(product._id)}>delete</span><span className='update' onClick={()=>Update(product._id)}>update</span>
            </div>
        </div>
    </>
  )
}

export default Card