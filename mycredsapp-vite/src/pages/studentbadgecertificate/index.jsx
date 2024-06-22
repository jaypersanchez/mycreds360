import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function StudentDetails() {
    const { studentId } = useParams(); // Get student ID from URL
    const location = useLocation();
    const student = location.state.student; // Passed state from navigation

    // States for tabs data
    const [badges, setBadges] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [activeTab, setActiveTab] = useState('badges');

    useEffect(() => {
        // Fetch badges and certificates data based on studentId
        // Dummy API calls (replace with actual endpoints)
        fetch(`http://localhost:3000/badges/${studentId}`).then(res => res.json()).then(setBadges);
        fetch(`http://localhost:3000/certificates/${studentId}`).then(res => res.json()).then(setCertificates);
    }, [studentId]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-xl font-bold">Student: {student.first_name} {student.last_name}</h1>
            <div>
                <button className={`mr-4 ${activeTab === 'badges' ? 'text-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('badges')}>Badges</button>
                <button className={`${activeTab === 'certificates' ? 'text-blue-500' : 'text-gray-500'}`} onClick={() => setActiveTab('certificates')}>Certificates</button>
            </div>
            <div>
                {activeTab === 'badges' && (
                    <ul>
                        {badges.map(badge => <li key={badge.id}>{badge.name}</li>)}
                    </ul>
                )}
                {activeTab === 'certificates' && (
                    <ul>
                        {certificates.map(certificate => <li key={certificate.id}>{certificate.name}</li>)}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default StudentDetails;
