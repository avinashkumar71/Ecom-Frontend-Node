import React, { useContext, useEffect} from 'react'
import './CardForHome.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../App'

function CardForHome({product}) {
    const {state,Increase,Decrease,QuantityCounter,setcustomer} = useContext(UserContext)
    // const [message,setmessage] = useState()
    useEffect(()=>{
        if(localStorage.getItem('customer_user')){
            const user = localStorage.getItem('customer_user')
            const auth = localStorage.getItem('jwttoken')
            setcustomer({customer_user:JSON.parse(user)[0],jwttoken:JSON.parse(auth)[0]})
        }
    },[])

    // const MaxQtyMessage =()=>{
    //     setTimeout(()=>{
    //         setmessage('Max Qty:2')
    //     },[2000])
    //     setmessage('')
    // }

    // console.log('Quantity------------>',QuantityCounter(state),product._id)
  return (
    <>
        <div className='card_container'>
            <div className='card_wrapper'>
                <NavLink to={`/description/${product._id}`}>
                <div className='image_wrapper'>
                    <img src={`${product.ImageUrl}`} alt="" />
                        {product.discount!==0?<p className='offer_price_off'>{product.discount}% OFF</p>:<></>}  
                </div>
                </NavLink>    
                <div className='_description_price-homecard'>
                    <div className='itemname_description-homecard'>
                        <p className='itemname-homecard'>{product.productname}</p>
                        <p className='description-homecard'>{product.description}</p>
                    </div>
                    <div className='price_add_to_cart'>
                        <p>{product.discount!==0?<span className='mark_price'>{product.price} ₹</span>:<></>}<span className='selling_price'>{product.selling_price} ₹</span></p>
                        <div className='add_to_cart_I_D'>
                        {product._id in QuantityCounter(state)?<>
                                                                
                                                                <span className='De' onClick={()=>{Decrease(product)}}>-</span>

                                                                    {product._id in QuantityCounter(state)
                                                                    ?
                                                                    <span className='cart_number' >{QuantityCounter(state)[product._id]}</span>
                                                                    :
                                                                    <div></div>}
                                                                    {QuantityCounter(state)[product._id]<2?<span className='In' onClick={()=>{Increase(product)}}>+</span>:<span></span>}
                                                                    
                                                            </>
                                                                :
                                                                <button onClick={()=>{Increase(product)}}>Add</button>}
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default CardForHome