import React, { memo } from 'react'
import './Footer.css'
// import axios from 'axios'
// import { useEffect,useState } from 'react'
// import baseUrl from '../../Urls'
function Footer() {
    // console.log('footer component')
    const Handler =(e)=>{
        e.preventDefault()
    }
    // const [counter,setcounter] = useState(0)

    // useEffect(()=>{
    //     axios.get(`${baseUrl}/get-data`)
    //     .then((response)=>{
    //     console.log(response)
    //     setcounter(response.data)
    //     }).catch((error)=>{
    //     console.log(error)
    //     })
    // },[])

  return (
    <>
        <footer>
            <div className='footer-container'>
                <div className='footer-upper'>
                    <div className='footer-left'>
                        <div>
                            <p className='footer-left-heading'>Category</p>
                            <p>Electronics</p>
                            <p>Mobiles</p>
                            <p>Computers</p>
                        </div>
                
                        <div>
                            <p className='footer-left-heading'>Contact</p>
                            <p>Home</p>
                            <p>About</p>
                            <p>contact</p>
                        </div>
                        
                    </div>
                    <div className='footer-right'>
                        <form onSubmit={Handler}>
                            <textarea name="" id="" placeholder='Write Your Feedback'></textarea> <br />
                            <button>Share</button>
                        </form>
                        {/* <div className='footer-visitors'>
                            <span className='visitor'>Visitors</span><span className='visitor-number'>0</span>
                        </div> */}
                    </div>
                </div>
                <div className='footer-lower'>
                    <span>@2024 Bazzar.com</span>
                </div>
            </div>
        </footer>
    </>
  )
}

export default memo(Footer)