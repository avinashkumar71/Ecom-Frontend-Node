import React, { useEffect,useState } from 'react'
import CardForHome from '../CardForHome/CardForHome'
// import { UserContext } from '../../App'

function SearchBar() {
    const [text,settext] = useState('')
    const [AllProduct,setAllProduct] = useState([])
    
    useEffect(()=>{
      const prts = JSON.parse(localStorage.getItem('All-item'))
      setAllProduct(prts)
      
    },[])


  return (
    <div className='nav_second_part'>
        <div className='nav_search'>
            {/* <span><i class="fa-solid fa-magnifying-glass"></i></span> */}
            <input type="text" name="" id="" placeholder='search your items' onChange={(e)=>settext(e.target.value)}/>
        </div>
        {AllProduct.filter((prt)=>{
            return prt.description.toLowerCase().includes(text)
        }).map((product)=>{
          return <CardForHome product={product}/>
        })}
        
    </div>
  )
}

export default SearchBar