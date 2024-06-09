import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination, Table } from 'react-bootstrap';
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
                <div style={{ overflowX: 'auto' }}>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>No. of Badges</th>
                                <th>No. of Certificates</th>
                                <th>Mobile No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchTerm
                                ? students
                                    .filter((student) =>
                                        `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.id}</td>
                                            <td>{student.first_name}</td>
                                            <td>{student.last_name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.no_of_badges}</td>
                                            <td>{student.no_of_certificates}</td>
                                            <td>{student.mobile_no}</td>
                                        </tr>
                                    ))
                                : students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.first_name}</td>
                                        <td>{student.last_name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.no_of_badges}</td>
                                        <td>{student.no_of_certificates}</td>
                                        <td>{student.mobile_no}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Pagination className="mt-3 justify-content-center">
                        {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => (
                            <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </div>;
        </div>
    );
}

export default Students;