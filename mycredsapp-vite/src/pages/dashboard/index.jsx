import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const [userId, setUserId] = useState({});
  const [user, setUser] = useState({});
  const [first_name, setFirstName] = useState('Jayper');
  const [last_name, setLastName] = useState('Sanchez');
  const [active_users, setActiveUsers] = useState('2000');
  const [inactive_users, setInactiveUsers] = useState('300');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    // I need to direct the user back to http://localhost:3000/login if they are not logged in
    if (!user) {
      window.location.href = 'http://localhost:5173/auth';
    }
    // Assuming the user object includes the user's first name and last name  
    setUser(user);
    setUserId(user.id);
    setFirstName(user.first_name);
    setLastName(user.last_name);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {first_name} {last_name}</h1>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-xl">{active_users}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Inactive Users</h2>
          <p className="text-xl">{inactive_users}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
