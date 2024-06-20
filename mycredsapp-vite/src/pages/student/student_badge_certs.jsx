import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';

function StudentBadgeCerts() {
    const navigate = useNavigate(); // Hook for navigation
    const { userId } = useParams(); // If you need to fetch additional data based on URL parameter
    const [activeTab, setActiveTab] = useState('badge');
    const [userData, setUserData] = useState({ fullName: '', email: '' });
    const [error, setError] = useState('');

    // Assume user data is stored as a JSON string
    const user = JSON.parse(sessionStorage.getItem('user')) || {};

    useEffect(() => {
        if (user && user.id) {
            fetch(`http://localhost:3000/user-profile/${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user profile');
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
                <h1 className="text-2xl font-semibold mb-4">Student Badge and Certification Assignment</h1>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-semibold">Student ID: {user.id}</h2>
                    <p className="text-gray-600">Name: {userData.fullName}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                </div>
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
                    <div>
                        <h3 className="text-lg font-semibold">Badge Details</h3>
                        {/* Content for Badge */}
                    </div>
                ) : (
                    <div>
                        <h3 className="text-lg font-semibold">Certification Details</h3>
                        {/* Content for Certifications */}
                    </div>
                )}
            </div>
        </div>
    );
}  

export default StudentBadgeCerts;