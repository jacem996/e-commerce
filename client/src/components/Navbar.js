import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/userSlice';
import "./navbar.css"

const Navbar = () => {
  const {isAuth,role} = useSelector ((state)=>state.user);
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (<div className="header" >
      <nav>
      <Link className='Link-style' to='/'><h1><span className='firstword'>Security</span><span className='secondword'>shop</span> </h1> </Link>
            <div className="nav-links" id="navlink">
            <ul>
              <li><Link className='Link-style' to='/' ><p><i className="fa-solid fa-house-chimney"></i>Home</p></Link></li>             
              <li><Link className='Link-style' to='/Product'><p>Product</p></Link> </li>
              <li><Link className='Link-style' to='/Techniciens'><p>Techniciens</p></Link> </li>
              {isAuth && role==='admin' ?  <li><Link className='Link-style' to='/Dashboard' ><p>Dashboard</p></Link></li>
              :isAuth && role==='user'? <li><Link className='Link-style' to='/Profile' ><p>Profile</p></Link></li>
              :isAuth && role==='technicien'?<li><Link className='Link-style' to='/Technicien' ><p>Profile</p></Link></li> 
              // :<> <li><Link to='/Register' ><p>Register</p></Link></li>
              :<li><Link className='Link-style' to='/Login' ><p>Login ✥ Register</p></Link></li>}
              {/* <li><Link to='Cart'>Cart</Link> </li> */}
              
              <li>{isAuth && <button onClick={()=>dispatch(logout())}><p>Logout</p></button>}</li>
            </ul>
            </div> 
            <Link className='Link-cart' to="/cart" >
        <div className="nav-bag">
        <i class="fa-solid fa-cart-arrow-down"></i>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      </nav>

  </div>);
};

export default Navbar;
