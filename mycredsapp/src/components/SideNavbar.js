import React from 'react';
import '../App.css'; // Import your CSS file containing the styles

const SideNavbar = ({ isActive }) => {
  return (
    <nav className={isActive ? "side-navbar active-nav" : "side-navbar"}>
      <ul>
        <li><a href="#">Link 1</a></li>
        <li><a href="#">Link 2</a></li>
        <li><a href="#">Link 3</a></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default SideNavbar;
