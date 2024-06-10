import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../App.css';
import SideNavbar from './SideNavbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Dashboard() {

  const [userId, setUserId] = useState({});
  const [user, setUser] = useState({});
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [active_users, setActiveUsers] = useState('');
  const [inactive_users, setInactiveUsers] = useState('');

  // I need a useEffect to get the user object id from the session storage  
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')));
    setUserId(JSON.parse(sessionStorage.getItem('user'))._id);
  }, []);

 // I need to add a useEffect to call http://localhost:3000/dashboard/data here to get the data for the dashboard
  useEffect(() => {
    const url = new URL('http://localhost:3000/dashboard/data');
    // Add query parameters
    url.searchParams.append('userId', userId);    
    fetch(url, {
      method: 'GET', // Using POST method to send data
      
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      //console.log("Fetched data:", data);
            // Check if data is not empty and has the first item
            if (data.length > 0) {
                const userData = data[0];
                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setActiveUsers(userData.active_users);
                setInactiveUsers(userData.inactive_users);
            } else {
                console.error('No user data available');
            }
  })
    .catch(error => console.error('Error:', error));
  }, [userId]);

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
                <h2>Welcome, {first_name} {last_name}</h2>
              </div>
              <ul>
                <li>Active Users {active_users}</li>
                <li>Inactive Users {inactive_users}</li>
              </ul>
            </div>         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
