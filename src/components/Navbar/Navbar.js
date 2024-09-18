import React, {useContext, useState} from 'react'
import './Navbar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'
function Navbar() {
    console.log('navbar component')
    const {state,customer,seller} = useContext(UserContext)
    const [click,setclick] = useState('show')
    const [varr,setvarr] = useState('')
    const navigate = useNavigate()

    const DeleteCustomerUser =()=>{
        localStorage.removeItem('customer_user')
        localStorage.removeItem('jwttoken')
        localStorage.removeItem('All-item')
        navigate('/')
        window.location.reload()
    }
    

    console.log(click)

    const DeleteUser =()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('jwttoken')
        // localStorage.removeItem('All-item')
        window.location.reload()
    }
    
  return (
    <>
        <div className='navbar_container'>
            <nav>
                <div className='nav_first_part'>
                    <div className='nav_first_part_wrapper '>
                        <h2>Bazzar.com</h2>
                    </div>
                </div>

                {click==='show'?<div className={`bar-icon-nav`} onClick={()=>setclick('unshow')}>
                        <i class="fa-solid fa-bars"></i>
                </div>:<div className={`bar-icon-nav`} onClick={()=>setclick('show')}>
                        <i class="fa-solid fa-bars"></i>
                </div>}
                
                <div className={`nav_third_part ${click}`}>
                    
                    <div className='nav_button'>

                        {seller.user.name===undefined?<></>:<button >{`${seller.user.name}`}</button>}

                        {customer.customer_user['name']===undefined?<></>:<button >{`${customer.customer_user['name']}`}</button>}

                        {seller.user.name===undefined?<NavLink to=''><button >Home</button></NavLink>:<></>}

                        {seller.user.name===undefined?<>{customer.customer_user['name']===undefined?<NavLink to='login'><button>Login</button></NavLink>:<button onClick={DeleteCustomerUser}>Logout</button>}</>:<button onClick={DeleteUser}> Logout</button>}
                        
                        
                        {customer.customer_user.name===undefined?<NavLink to="/seller"><button>For selller</button></NavLink>:<></>}

                        {customer.customer_user.name===undefined ? <></> : <NavLink to='/myorder'><button>MyOrder</button></NavLink> }
                        
                        {seller.user.name===undefined?<div className='mycart'>
                            <NavLink to='mycart'><button for="cart">Mycart</button></NavLink><span id='cart'><i class="fa-solid fa-cart-shopping"></i><span className='cart_number'>{state.length}</span></span>
                        </div>:<></>}
                        
                    </div>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Navbar