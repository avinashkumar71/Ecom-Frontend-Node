import React from 'react'
import './Profile.css'
function Profile() {
  let auth = localStorage.getItem('user')
  auth = JSON.parse(auth)[0]
  return (
    <>
      <div className='profile_container'>
        <div className='details'>
          <label>Name</label>:<span>{auth.name}</span>
        </div>
        <div className='details'>
          <label>Email Id</label>:<span>{auth.email}</span>
        </div>
        <div className='details'>
          <label>Company</label>:<span>{auth.company}</span>
        </div>
        <div className='details'>
          <label>Gst No.</label>:<span>{auth.gst}</span>
        </div>
        <div className='details'>
          <label>Pan No.</label>:<span>{auth.pan}</span>
        </div>
        <div className='details'>
          <label>Phone</label>:<span>{auth.phone}</span>
        </div>
        <div className='details'>
          <label>Aadhar</label>:<span>{auth.aadhar}</span>
        </div>
        <div className='details'>
          <label>Domain</label>:<span>{auth.domain}</span>
        </div>
      </div>
    </>
  )
}

export default Profile