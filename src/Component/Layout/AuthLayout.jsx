import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import image1 from '../../assets/images/freshcart-logo.svg'
import Footer from '../Footer/Footer'


function AuthLayout() {
    return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <NavLink className="navbar-brand" to='/'>
<img src={image1} alt="" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
           
            <li>
            <NavLink className="nav-link active" to='/Register'>Register</NavLink>
            </li>
            <li>
            <NavLink className="nav-link active" to='/Login'>Login</NavLink>
            </li>
        </ul>
      
    </div>
  </div>
</nav>
      <Outlet/>
      <Footer/>
      </>  
    )
}

export default AuthLayout
