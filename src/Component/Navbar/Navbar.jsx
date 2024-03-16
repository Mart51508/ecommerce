import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import image1 from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../Context/AuthContext'
import { CartContext } from '../Context/CartContext'
import { WishContext } from '../Context/WishContext'

function Navbar() {
  const{setToken}=useContext(AuthContext)
  const { Count} =useContext(WishContext);

  const{NumOfCartItems, TotalCartPrice, products}=useContext(CartContext)


  function logout(){
  localStorage.setItem('Tkn', null)
  localStorage.removeItem('Tkn')
  setToken(null)
  setToken( localStorage.setItem('Tkn', null))
  setToken(localStorage.removeItem('Tkn'))
    }
    return (<> <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <NavLink className="navbar-brand" to='/'>
<img src={image1} alt="" />
    </NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link " to='/Home'>Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to='/Products'>Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " to='/Categories'>Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/Brands'>Brands</NavLink>
        </li>
      
        </ul>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className='position-relative mt-2 me-4'>
        <NavLink className="nav-link" to='/wishlist'><i class="fa-solid fa-heart ">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {Count?Count :''}
            </span>
            </i>
            </NavLink>
            </li>
            <li className='position-relative mt-2 me-4'>
        <NavLink className="nav-link" to='/cart'><i  class="fa-solid fa-cart-shopping ">
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {NumOfCartItems?NumOfCartItems :''}
            </span>
            </i>
            </NavLink>
            </li>
            <li>
            <NavLink onClick={logout} className="nav-link active" to='/Login'>Logout</NavLink>
            </li>
           
        </ul>
      
    </div>
  </div>
</nav>
        
        </>
    )
}

export default Navbar
