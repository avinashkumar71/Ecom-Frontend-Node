import React from 'react'
import { NavLink } from 'react-router-dom'
import './Dashboard.css'
function Dasboard() {
  let auth = localStorage.getItem('user')
  
  return (
    <>
        <div className='dashboard_container'>
            <ul>
                {auth?<><NavLink to={`/seller-addproduct`}><li>Add Product</li></NavLink>
                <NavLink to="/seller-products"><li>Products</li></NavLink>
                <NavLink to="/seller-profile"><li>Profile</li></NavLink></>:<></>}
                {auth?<NavLink to="/seller-logout"><li>Logout</li></NavLink>:<NavLink to="/seller-login"><li>Login/SignUp</li></NavLink>}    
                
            </ul>
        </div>
    </>
  )
}

export default Dasboard