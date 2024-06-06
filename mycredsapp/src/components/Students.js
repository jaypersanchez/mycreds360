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
        // Fetch the list of students when the component mounts
        fetch('http://localhost:3000/students')
        .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch institutions.');
        }
        return response.json();
        })
        .then(data => {
            console.log(data)
            setStudents(data);
            setLoading(false);
        })
        .catch(error => {
        setError('Failed to fetch students list. Please try again later.');
        setLoading(false);
        });
    }, []); // Empty array means this runs once on mount and unmount

    useEffect(() => {
        // Filter students based on search term
        if (searchTerm.trim() === '') {
          setSearchResults([]);
        } else {
          const results = students.filter(student =>
            student.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setSearchResults(results)
          console.log(`search ${JSON.stringify(results)}`)
        }
    }, [searchTerm, students]);

    // Get current students
    const indexOfLastStudents = currentPage * studentsPerPage;
    const indexOfFirstInstitution = indexOfLastStudents - studentsPerPage;
    const currentStudent = students.slice(indexOfFirstInstitution, indexOfLastStudents);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <ul>
                        {searchResults.map(student => (
                        <li key={student.id}>
                            {student.email}
                            {student.first_name}
                        </li>
                        ))}
                    </ul>
                    <ul>
                        {students.map(student => (
                            <li key={student.id}>
                            <div>Student ID: {student.id}</div>    
                            <div>First Name: {student.first_name}</div>
                            <div>Last Name: {student.last_name}</div>
                            <div>Email: {student.email}</div>
                            <div>No. Badges: {student.no_of_badges}</div>
                            <div>No. Certificates: {student.no_of_certificates}</div>
                            <div>Mobile: {student.mobile_no}</div>
                            </li>
                        ))}
                    </ul>
                    {/* Pagination */}
                    <Pagination className="mt-3">
                        {Array.from({ length: Math.ceil(searchResults.length / studentsPerPage) }, (_, i) => (
                            <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>
                            {i + 1}
                            </Pagination.Item>
                        ))} 
                    </Pagination>
            </div>
        </div>
    );
}

export default Students;