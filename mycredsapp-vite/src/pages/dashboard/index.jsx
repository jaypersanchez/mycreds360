import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  const [userId, setUserId] = useState({});
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState();
  const [active_users, setActiveUsers] = useState();
  const [inactive_users, setInactiveUsers] = useState();
  const [total_badges, setTotalBadges] = useState();
  const [total_certificates, setTotalCertificates] = useState();


  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user.id);
    if (!user || !user.id) {
        console.error('No user id found in sessionStorage');
        return;
    }

    // Make the fetch request to the server using query parameters
    fetch(`http://localhost:3000/dashboard/data?userId=${user.id}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                console.log(data[0]);
                let _fullName = `${data[0].first_name} ${data[0].last_name}`;
                setFullName(_fullName);
                setActiveUsers(data[0].active_users);
                setInactiveUsers(data[0].inactive_users);
                setTotalBadges(data[0].total_badges);
                setTotalCertificates(data[0].total_certificates);
            }
        })
        .catch(error => console.error('Failed to fetch dashboard data:', error));
}, []);

  

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    // I need to direct the user back to http://localhost:3000/login if they are not logged in
    if (!user) {
      window.location.href = 'http://localhost:5173/auth';
    }
    // Assuming the user object includes the user's first name and last name  
    setUser(user);
    setUserId(user.id);
    //setFirstName(user.first_name);
    //setLastName(user.last_name);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {fullName} </h1>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-xl">{active_users}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Inactive User</h2>
          <p className="text-xl">{inactive_users}</p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
        <div>
          <h2 className="text-lg font-semibold">Badges Issued To Date</h2>
          <p className="text-xl">{total_badges}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Certificates Issued To Date</h2>
          <p className="text-xl">{total_certificates}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
