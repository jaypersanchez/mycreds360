/* This will create an account and designate as: student, Admin or Super Admin or Badge issuer */
import React, { useState, useEffect } from 'react';
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
    <div className="dashboard">
      <div className="row">
        <div className="col-lg-3">
          <SideNavbar />
        </div>
        <div className="col-lg-9">
        <div className="add-institution-section">
  <h3>Add Account</h3>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>User Role:</label>
            <select
              className="form-control"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select User Role</option>
              <option value="1">Super Admin</option>
              <option value="3">Admin</option>
              <option value="4">Badge User</option>
              <option value="7">User</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Add Account</button>
        </form>
      </div>

          <div className="institution-list-section">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
                <ul>
              {searchResults.map(user => (
                <li key={user.id}>
                  <div>ID: {user.id}</div>
                  <div>Email: {user.email}</div>
                  <div>Status: {user.status}</div>
                </li>
              ))}
            </ul>
            {/* Pagination */}
            <ul className="pagination">
              {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
                <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                  <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                </li>
              ))}
            </ul>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
