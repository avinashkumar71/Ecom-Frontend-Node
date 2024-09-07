import React from 'react'
import { useNavigate } from 'react-router-dom'
function Logout() {
    localStorage.removeItem('user')
    localStorage.removeItem('jwttoken')
    window.location.reload()
  return (
    <>
        <h1>logout successfully</h1>
    </>
  )
}

export default Logout