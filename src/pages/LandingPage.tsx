import React from 'react'

const LandingPage = () => {
  return (
    <div>
        <div style={{ fontSize: '25px'}} >Login</div>
        <a href='/Login'><button type="button" className="btn btn-primary">Login</button></a>
        <div style={{ fontSize: '25px'}} >Register</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop:'10px'}}>
        <a href='HP_Register'><button type="button" className="btn btn-primary">Normal User</button></a>
        <a href='/HP_Register'><button type="button" className="btn btn-primary">Health professional</button></a>
        <a href='/Register/V'><button type="button" className="btn btn-primary">Volunteer</button></a>
    </div></div>
    
  )
}

export default LandingPage