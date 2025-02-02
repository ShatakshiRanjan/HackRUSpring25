import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/game">My Pet</Link>
        </li>
        <li className="nav-item">
          <Link to="/">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
