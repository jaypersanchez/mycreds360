import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleUser, setRoleUser] = useState('');

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    // I need to direct the user back to http://localhost:3000/login if they are not logged in
    if (!user) {
      window.location.href = `http://localhost:3000/auth` //'http://localhost:5173/auth';
    }
    // Assuming the user object includes the user's first name and last name  
    //setUser(user);
    //setUserId(user.id);
    //setFirstName(user.first_name);
    //setLastName(user.last_name);
  }, []);

  useEffect(() => {
    //fetch('http://localhost:3000/users')
    fetch(`http://localhost:3000/users`)
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);  // Initially, no filter is applied
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
        setFilteredUsers(users);
    } else {
        const filtered = users.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }
}, [searchTerm, users]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleNewUser = async (event) => {
      event.preventDefault();
      try {
          //console.log(`New User: ${email}, ${password}, ${roleUser}`);
          const response = await fetch(`http://localhost:3000/account/new`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password, role_user: roleUser })
          });
          if (!response.ok) throw new Error('Failed to create user');
          const result = await response.json();
          alert('User created successfully!');
      } catch (error) {
          console.error('Error creating user:', error);
          alert('Error creating user: ' + error.message);
      }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold leading-tight">Admin Dashboard - Users</h2>
      <div className="my-6">
                <form onSubmit={handleNewUser} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                    <select
                        value={roleUser}
                        onChange={(e) => setRoleUser(e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select User Role</option>
                        <option value="1">Super Admin</option>
                        <option value="3">Admin</option>
                        <option value="4">Badge User</option>
                        <option value="7">User</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Add User
                    </button>
                </form>
            </div>
      <table className="min-w-full mt-6 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.status === 1 ? 'Active' : "Inactive"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="py-4 flex justify-center">
        <nav className="block">
          <ul className="flex pl-0 rounded list-none flex-wrap">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
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

