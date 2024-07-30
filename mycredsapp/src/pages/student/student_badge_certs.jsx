import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

import BadgeIssuance from './BadgeIssuance.jsx';
import CertificateIssuance from './CetificateIssuance.jsx';


function StudentBadgeCerts() {
    const navigate = useNavigate(); // Hook for navigation
    const [userId, setUserId] = useState(); // If you need to fetch additional data based on URL parameter
    const [activeTab, setActiveTab] = useState('badge');
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [certifications, setCertifications] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Assume user data is stored as a JSON string
    const user = JSON.parse(sessionStorage.getItem('user')) || {};

    
    /*
    * User must first be authenticated before they can access the course page
    */
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        
        setUserId(user.id);
        // I need to direct the user back to http://localhost:3000/login if they are not logged in
        if (!user) {
          window.location.href = 'http://localhost:5173/auth';
        }
    }, []);
      
   useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:3000/user-profile/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('2 Failed to fetch user profile');
                    }
                    return response.json();
                })
                .then(data => {
                    setUserData({
                        fullName: `${data[0].first_name} ${data[0].last_name}`,
                        email: data.email
                    });
                })
                .catch(err => {
                    console.error('Error fetching user profile:', err);
                    setError(err.message);
                });
        }
    }, []);

    
    
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold mb-4">Student Badge and Certification Issuance</h1>
                
            </div>
            <div className="border-b border-gray-200">
                <ul className="flex flex-wrap -mb-px">
                    <li className="mr-2">
                        <button onClick={() => handleTabClick('badge')}
                            className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === 'badge' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                            Badge
                        </button>
                    </li>
                    <li className="mr-2">
                        <button onClick={() => handleTabClick('certifications')}
                            className={`inline-block p-4 rounded-t-lg border-b-2 ${activeTab === 'certifications' ? 'text-blue-600 border-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}>
                            Certifications
                        </button>
                    </li>
                </ul>
            </div>
            <div className="p-4">
                {activeTab === 'badge' ? (
                    <BadgeIssuance
                    students={students}
                    courses={courses}
                    error={error}
                    success={success}
                  />
                ) : (
                    
                    <CertificateIssuance />
                )}
            </div>
        </div>
    );
}  

export default StudentBadgeCerts;