import React, { useContext, useEffect } from 'react'
import './Description.css'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'

function Description() {
  console.log('description component')
  const param = useParams()
  // const {AllItem} = useContext(UserContext)
  // let product = {};
  // console.log('Allitem param ---->',AllItem,param)

  // useEffect(()=>{
  //   if(localStorage.getItem('All-item')===null){
  //     localStorage.setItem('All-item',JSON.stringify(AllItem))
  //   }else{
  //     product =  JSON.parse(localStorage.getItem('All-item'))
  //     console.log('p--------->',product) 
  //     product = product[0]
  //   }
  // },[])
  let AllItem =  JSON.parse(localStorage.getItem('All-item'))
  console.log('all item descrip *--/+ >',AllItem)
  
  let product = AllItem.filter((item)=>item._id===param.id)
  product = product[0]
  
  // let product = AllItem.filter((item)=>item._id===param.id)
  // product = product[0]
  
   
  return (
    <>  
        <div className="description_container">
          <div className='description_wrapper'>
            <div className='description_left_part'>
                <div className='description_image'>
                    <img src={`${product.ImageUrl}`} alt="" />
                </div>
                <div className='description_text'>
                  <p className='description_brand_name'>{product.description}</p>
                  <p className='description_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque asperiores quidem dicta eaque, vero error velit accusamus, consectetur in excepturi odio assumenda laudantium a sit?</p>
                </div>
            </div>
            <div className='description_right_part'>
                <div className='brand_name'>
                    <h3>brand name</h3>
                    <p>View by all brand name</p>
                </div>
                <div className='mrp_quantity_addtocart'>
                    <div className='mrp_quantity'>
                      <p>{product.price} ₹</p>
                      <div className='increase_and_decrease'>
                        {/* {Individual_product.id in QuantityCounter(state)?<p className='decrease' onClick={()=>{Decrease(Individual_product)}}>-</p>:<p className='decrease'>-</p>}<span>{Individual_product.id in QuantityCounter(state)?QuantityCounter(state)[Individual_product.id]:0}</span><p className='increase' onClick={()=>{Increase(Individual_product)}}>+</p> */}
                      </div>
                      <p className='tax_text'>( inclusive all taxes )</p>
                    </div>
                    <div className='description_add_to_cart'>
                      {/* <button onClick={()=>{Increase(Individual_product)}}>Add to cart</button> */}
                    </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Description