import React, { useState, useEffect } from 'react';

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rolesPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        // I need to direct the user back to http://localhost:3000/login if they are not logged in
        if (!user) {
          window.location.href = 'http://localhost:5173/auth';
        }
        // Assuming the user object includes the user's first name and last name  
        //setUser(user);
        //setUserId(user.id);
        //setFirstName(user.first_name);
        //setLastName(user.last_name);
      }, []);
      
    useEffect(() => {
        fetch('http://localhost:3000/roles')
            .then(response => response.json())
            .then(data => {
                setRoles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch roles:', err);
                setError('Failed to fetch roles');
                setLoading(false);
            });
    }, []);

    // Get current roles
    const indexOfLastRole = currentPage * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;
    const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold leading-tight">Roles</h2>
            <table className="min-w-full mt-6 divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {currentRoles.map((role, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{role.first_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{role.label}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="py-4 flex justify-center">
                <nav className="block">
                    <ul className="flex pl-0 rounded list-none flex-wrap">
                        {Array.from({ length: Math.ceil(roles.length / rolesPerPage) }, (_, i) => (
                            <li key={i + 1}>
                                <button
                                    onClick={() => paginate(i + 1)}
                                    className={`first:ml-0 text-xs font-semibold flex w-full px-4 py-2 leading-tight bg-white border border-gray-300 rounded-md hover:bg-gray-100 ${currentPage === i + 1 ? 'bg-gray-100' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}
