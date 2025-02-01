import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <ul className='nav-links'>
    <li className='nav-item'>Tasks Today</li>
    <li className='nav-item'>Homework</li>
    <li className='nav-item'>Dashboard</li>
  </ul>
</nav>
);
};

export default Navbar;