/* This will create an account and designate as: student, Admin or Super Admin or Badge issuer */
import React, { useState, useEffect } from 'react';
//import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';


const CreateAccount = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [error, setError] = useState('')
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch users from the endpoint
    console.log(process.env.SERVER_BASE_URL)
    fetch('http://localhost:3000/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users.');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter institutions based on search term
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      // Filter users based on search term
      const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredUsers);
      //console.log(`search ${JSON.stringify(filteredUsers)}`);
    }
  }, [searchTerm, users]);
  
  // Get current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all required fields are filled
    if (!email || !password || !role) {
      setError('Please fill in all fields.');
      return;
    }
    // Prepare the request body
    const requestBody = {
      email: email,
      password: password,
      role_user: parseInt(role) // Convert role to integer
    };
    // Send the request to the endpoint
    fetch('http://localhost:3000/account/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add account.');
      }
      // Account added successfully
      console.log('Account added successfully:', requestBody);
      // Optionally, you can reset the form fields here
      setEmail('');
      setPassword('');
      setRole('');
      setError('');
      // Display success message or perform any other actions
      alert('Account added successfully!');
    })
    .catch(error => {
      // Handle error
      console.error('Error adding account:', error.message);
      setError('Failed to add account. Please try again later.');
    });
  };
  

  return (
    
  <div className="fullscreen">
      <div className="side-navbar">
            <SideNavbar />
      </div>
      <div className="main-content">
          <div className="add-account-section">
            <h3>Add Account</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>User Role</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)} required>
                  <option value="">Select User Role</option>
                  <option value="1">Super Admin</option>
                  <option value="3">Admin</option>
                  <option value="4">Badge User</option>
                  <option value="7">User</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">Add Account</Button>
            </Form>
          </div>

          <div className="account-list-section">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <ul>
              {searchResults.map(user => (
                <li key={user.id}>
                  <div>ID: {user.id}</div>
                  <div>Email: {user.email}</div>
                  <div>Status: {user.status}</div>
                </li>
              ))}
            </ul>
            <ul>
              {currentUsers.map(user => (
                <li key={user.id}>
                  <div>ID: {user.id}</div>
                  <div>Email: {user.email}</div>
                  <div>Status: {user.status}</div>
                </li>
              ))}
              </ul>
            <Pagination className="mt-3">
              {Array.from({ length: Math.ceil(searchResults.length / usersPerPage) }, (_, i) => (
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




export default CreateAccount;
