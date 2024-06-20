import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function StudentBadgeCerts() {
    const navigate = useNavigate(); // Hook for navigation

  // Example function to handle row click
  const handleRowClick = (student) => {
    // Navigate to StudentBadgeCerts component with student data
    navigate('/student_badge_certifications/208', { state: { student } });
  };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1>Student Badge and Certification Assignment</h1>
        </div>
    );
}  

export default StudentBadgeCerts;