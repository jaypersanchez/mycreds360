import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale
);

export default function Dashboard() {
  const [userId, setUserId] = useState({});
  const [user, setUser] = useState({});
  const [fullName, setFullName] = useState();
  const [active_users, setActiveUsers] = useState();
  const [inactive_users, setInactiveUsers] = useState();
  const [total_badges, setTotalBadges] = useState();
  const [total_certificates, setTotalCertificates] = useState();
  //const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  /*const options = {
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        // Ensure axes start at zero
        beginAtZero: true,
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };*/

  // Fetch data from your API
  /*useEffect(() => {
    fetch('http://localhost:3000/analytics/badges')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        const months = data.map(item => item.month);
        const badgesIssued = data.map(item => item.badges_issued);
        
        // Logging to ensure data shapes
        console.log('Months:', months);
        console.log('Badges Issued:', badgesIssued);
        
        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Badges Issued',
              data: badgesIssued,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
          ],
        });
      })
      .catch(err => {
        console.error('Failed to fetch badges data:', err);
      });
  }, []);*/

  const chartData = {
    labels: ["2022-11", "2022-12", "2023-01"], // Example months
    datasets: [
      {
        label: "Average Days to Issue",
        data: [13, 9.2, 2.9], // Sample data
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Badges Issued",
        data: [1, 21, 8], // Sample data
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "MMMM YYYY",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user.id);
    if (!user || !user.id) {
      console.error("No user id found in sessionStorage");
      return;
    }

    // Make the fetch request to the server using query parameters
    fetch(`http://localhost:3000/dashboard/data?userId=${user.id}`)
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) =>
        console.error("Failed to fetch dashboard data:", error)
      );
  }, []);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    // I need to direct the user back to http://localhost:3000/login if they are not logged in
    if (!user) {
      window.location.href = "http://localhost:5173/auth";
    }
    // Assuming the user object includes the user's first name and last name
    setUser(user);
    setUserId(user.id);
    //setFirstName(user.first_name);
    //setLastName(user.last_name);
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Welcome, {fullName} </h1>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold">Active Users</h2>
          <p className="text-xl">{active_users}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Inactive User</h2>
          <p className="text-xl">{inactive_users}</p>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="text-lg font-semibold">Badges Issued To Date</h2>
          <p className="text-xl">{total_badges}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Certificates Issued To Date</h2>
          <p className="text-xl">{total_certificates}</p>
        </div>
      </div>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Badge Analytics</h1>
        {/* {!loading && chartData.labels ? (
          <div className="p-4">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <p>Loading chart...</p>
        )} */}
      </div>
    </div>
  );
}
