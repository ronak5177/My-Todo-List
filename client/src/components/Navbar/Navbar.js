import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom" 

const Navbar = () => {
  return (
    <>
    <nav className='navContainer'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/signin'>SignIn</Link></li>
            <li><Link to='/signup'>SignUp</Link></li>
            <li><Link to='/peers'>Peers</Link></li>          
        </ul>
    </nav>
    </>

  )
}

export default Navbar
