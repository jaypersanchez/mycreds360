import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import SideNavbar from './SideNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {

 
  return (
    <div className="fullscreen">
      <div className="side-navbar">
        <SideNavbar />
      </div>
      <div className="main-content">
        <div className="welcome-text pt-2 mb-3">
          <Outlet /> {/* Render nested routes */}
          <div className="row justify-content-center"> 
            <div className="col-md-8 col-lg-10">  
              <div className="b-head">
                <h2>Welcome, User!</h2>
              </div>
              <p>This is your dashboard. Here, you can:</p>
              <ul>
                <li>View your profile information</li>
                <li>Access your account settings</li>
                <li>Interact with your data</li>
                <li>And much more...</li>
              </ul>
              <p>Explore the navigation menu on the left to get started.</p>
            </div>         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
