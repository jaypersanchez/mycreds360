import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination, Table } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';
import StudentBadgeCertificate from './StudentBadgeCertificate';

const Students = (props) => {
    const navigate = useNavigate();
    const [studentName, setStudentName] = useState('');
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [selectedStudentIdFromTable, setSelectedStudentIdFromTable] = useState('');


    //Add a new student student states
    const [users, setUsers] = useState([]);
    const [liststudents, setListStudents] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [userPhoto, setUserPhoto] = useState(null);


    const handleRowClick = (student) => {
        setSelectedStudentIdFromTable(student);
        // I need to add code from here, I need to open the StudentBadgeCertificate componentand pass the studentId to it
        // I need to open the StudentBadgeCertificate component and pass the student
        // id to it
        //console.log(student)
        navigate(`/studentbadgecertificate/${student.id}`, { state: { student: student } });
        //console.log('studentId', student.id, student.first_name);
        //console.log('selectedStudentIdFromTable', selectedStudentIdFromTable);
    };

    //get all users for selecting a student.
    useEffect(() => {
        fetch('http://localhost:3000/users')  // Adjust this URL as necessary
            .then(response => response.json())
            .then(data => {
                setUsers(data)
                //console.log(data)
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

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
          //console.log(`search ${JSON.stringify(results)}`)
        }
    }, [searchTerm, students]);

    // Get current students
    const indexOfLastStudents = currentPage * studentsPerPage;
    const indexOfFirstInstitution = indexOfLastStudents - studentsPerPage;
    const currentStudent = students.slice(indexOfFirstInstitution, indexOfLastStudents);
    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('user_id', selectedUserId);
        formData.append('email', email);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('mobile_no', mobileNo);
        formData.append('user_photo', userPhoto);

        try {
            const response = await fetch('http://localhost:3000/students/create', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            alert('Student added successfully!');
        } catch (error) {
            console.error('Failed to add student:', error);
            alert('Failed to add student: ' + error.message);
        }
    };

    return (
        <div className="fullscreen">
            <div className="side-navbar">
                <SideNavbar />
            </div>
            <div className="main-content">
            <div className="add-student-form">
                <h3>Add New Student</h3>
                <form onSubmit={handleSubmit}>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} required>
                        <option value="">Select a User</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.email}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    <input type="text" placeholder="Mobile No" value={mobileNo} onChange={e => setMobileNo(e.target.value)} required />
                    <input type="file" onChange={e => setUserPhoto(e.target.files[0])} />
                    <button type="submit">Add Student</button>
                </form>
            </div>
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
                                        <tr key={student.id}
                                        onClick={() => handleRowClick(student)}
                                        style={{ cursor: 'pointer', backgroundColor: student.id === selectedStudentIdFromTable ? '#f0f0f0' : '' }}
                                        >
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
                                    <tr key={student.id}
                                    onClick={() => handleRowClick(student)}
                                    style={{ cursor: 'pointer', backgroundColor: student.id === selectedStudentIdFromTable ? '#f0f0f0' : '' }}
                                    >
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
            </div>
        </div>
    );
}

export default Students;