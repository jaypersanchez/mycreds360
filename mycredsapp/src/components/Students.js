import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const Students = (props) => {
    const [studentName, setStudentName] = useState('');
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Use useEffect for lifecycle methods
    useEffect(() => {
        // Code to run after the component is mounted
    }, []); // Empty array means this runs once on mount and unmount

    // Get current institutions
    const indexOfLastStudents = currentPage * studentsPerPage;
    const indexOfFirstInstitution = indexOfLastStudents - studentsPerPage;
    const currentStudent = students.slice(indexOfFirstInstitution, indexOfLastStudents);

    return (
        <div className="fullscreen">
            <div className="side-navbar">
                <SideNavbar />
            </div>
            <div className="main-content">
                <div className="institution-list-section">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Search Student by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>
            </div>
        </div>
    );
}

export default Students;