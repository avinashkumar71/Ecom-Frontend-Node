import React, {useState } from 'react'
import './Home.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Suspense , lazy } from 'react'
import baseUrl from '../../Urls'

const CardForHome  = lazy(()=>import('../CardForHome/CardForHome'))
const Footer = lazy(()=>import('../Footer/Footer'))

function Home() {
    const [AllProduct,setAllProduct] = useState([])
    const [prev,setprev] = useState(0)
    const [next,setnext] = useState(4)
    const [text,settext] = useState('')
    const [Allcategory,setAllcategory] = useState([])
    const [Category,setCategory] = useState('')
    const [CategoryNumber,setCategoryNumber] = useState()
    const [active,setactive] = useState('')


    useEffect(()=>{
      axios.get(`${baseUrl}/get-category`)
      .then((response)=>{
        // console.log('category---->',response)
        setAllcategory(response.data)
      }).catch((error)=>{
        // console.log('------>error',error)
      })
    },[])

    useEffect(()=>{
        axios.get(`${baseUrl}/all-products`)
        .then((response)=>{
          setAllProduct(response.data)
        
        }).catch((error)=>{
        })
      },[])

      const Prev =()=>{
        // console.log('prev')
        if(prev>0){
          setprev(prev-4)
          setnext(next-4)
        } 
      }

      const Next =()=>{
        // console.log('next')
        if(next<AllProduct.length){
          setprev(prev+4)
          setnext(next+4)
        } 
      }

      const arrayRange = (start, stop, step) =>
        Array.from(
        { length: (stop - start) / step + 1 },
        (value, index) => start + index * step
        );

      useEffect(()=>{
        if(text!==''){
          setCategory('')
        }
        
      },[text])

      useEffect(()=>{
        if(Category!==''){
          settext('')
        }
      },[Category])

      const Handler =(cat,index)=>{
        // console.log(cat,index)
        if(cat!==Category){
          setCategoryNumber(index)
          setCategory(cat)
          setactive('span-active')
          // setclick(!clck)
        }else{
          // setclick(!clck)
          setactive('')
          setCategory('')
          setCategoryNumber()
        }
        
      }

      // console.log('category---->',Category,CategoryNumber,click)
      // console.log('text---->',text)
  return (
    <>
        <div className='home-search-bar'>
            <input type="text" placeholder='Search Your items' onChange={(e)=>settext(e.target.value)} />
        </div>
        <div className='home-category-bar'>
          {Allcategory.map((cat,index)=>{
            // return <span onClick={()=>{setCategory(cat.name)}}>{cat.name}</span>
            return <span className={index===CategoryNumber?active:''} onClick={()=>Handler(cat.name,index)}>{cat.name}</span>
          })}
        </div>
        
        {text==='' && Category===''?<>
                              <div className='home_container'>
                                <Suspense fallback={<h2>Please wait ...</h2>}>
                                  {AllProduct.slice(prev,next).map((product)=>{
                                      return(
                                          <CardForHome product={product}/>
                                      )
                                  })}
                                </Suspense>
                              </div>
                              <div className='pre_next_btn'>
                                    <button onClick={Prev}>Previous</button>
                                    {arrayRange(prev,next-1,1).map((value)=>{
                                        return <span className='product_index_number'>{value+1}</span>
                                    })}
                                    {/* {<span className='product_index_number'>{AllProduct.length +4}</span>} */}
                                    <button onClick={Next}>Next</button>
                              </div>
                              <Suspense fallback={<h2>Please Wait ...</h2>}>
                                <Footer/>
                              </Suspense>
                </>
                :
                <>
                  {text!==''?<div className='home_container'>
                        <Suspense fallback={<h2>Please wait ...</h2>}>
                            {AllProduct.filter((prt)=>{
                              return prt.description.toLowerCase().includes(text.toLowerCase())
                          }).map((product)=>{
                            return <CardForHome product={product}/>
                          })}
                        </Suspense>   
                      </div>:<div className='home_container'>
                        <Suspense fallback={<h2>Please wait ...</h2>}>
                            {AllProduct.filter((prt)=>{
                              return (prt.category===Category)
                          }).map((product)=>{
                            return <CardForHome product={product}/>
                          })}
                        </Suspense>  
                  </div>}
                      
                </>}


                  {/* <div className='home_container'>
                        <Suspense fallback={<h2>Please wait ...</h2>}>
                            {AllProduct.filter((prt)=>{
                              return (prt.category===Category)
                          }).map((product)=>{
                            return <CardForHome product={product}/>
                          })}
                        </Suspense>  
                  </div> */}
          
    </>
  )
}

export default Home