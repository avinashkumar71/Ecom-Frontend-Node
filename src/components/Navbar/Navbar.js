import React, {useContext} from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../App'
function Navbar() {
    console.log('navbar component')
    
    const {state,customer,seller} = useContext(UserContext)
    console.log('nav------------>',seller.user.name)
    const DeleteCustomerUser =()=>{
        localStorage.removeItem('customer_user')
        localStorage.removeItem('jwttoken')
        window.location.reload()
    }

    const DeleteUser =()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('jwttoken')
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
                <div className='nav_third_part'>
                    <div className='nav_button'>

                        {seller.user.name===undefined?<></>:<button >{`${seller.user.name}`}</button>}

                        {customer.customer_user['name']===undefined?<></>:<button >{`${customer.customer_user['name']}`}</button>}

                        {seller.user.name===undefined?<NavLink to=''><button >Home</button></NavLink>:<></>}

                        {seller.user.name===undefined?<>{customer.customer_user['name']===undefined?<NavLink to='login'><button>Login</button></NavLink>:<button onClick={DeleteCustomerUser}>Logout</button>}</>:<button onClick={DeleteUser}> Logout</button>}
                        
                        
                        {customer.customer_user.name===undefined?<NavLink to="/seller"><button>For selller</button></NavLink>:<></>}
                        
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