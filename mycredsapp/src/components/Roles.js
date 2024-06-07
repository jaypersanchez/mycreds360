import React, { useState, useEffect } from 'react';
import SideNavbar from './SideNavbar';

const Roles = (props) => {
    // I need to save the fetch roles in a state so I can query for it
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rolesPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // I need useEffect to fetch data from http://localhost:3000/roles and set it to the state
    useEffect(() => {
        fetch('http://localhost:3000/roles')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Set the state here
                setRoles(data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <div className="fullscreen">
                <div className="side-navbar">
                    <SideNavbar />
                </div>
                <div className="main-content">
                    <div className="roles-section">
                        <h2>Roles</h2>
                        <div className="roles-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map(role => (
                                        <tr key={role.id}>
                                            <td>{role.user_id}</td>
                                            <td>{role.first_name}</td>
                                            <td>{role.label}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Roles;