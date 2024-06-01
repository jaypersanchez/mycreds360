import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import your CSS file containing the styles

const SideNavbar = ({ isActive }) => {
  return (
    <nav className={isActive ? "side-navbar active-nav" : "side-navbar"}>
      <ul>
      <li><Link to="/create-account">Create Account</Link></li>
        <li><Link to="/create-institution">Create Institution</Link></li>
        <li><Link to="/create-certificate-template">Create Certificate Template</Link></li>
        <li><Link to="/create-course">Create Course</Link></li>
        <li><Link to="/badge-creation">Badge Creation</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default SideNavbar;
