import React, { useState, useEffect } from 'react';

export default function Institution() {
  const [institutions, setInstitutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [institutionsPerPage] = useState(10);
  const [institutionName, setInstitutionName] = useState('');
  const [institutionUrl, setInstitutionUrl] = useState('');
  const [logo, setLogo] = useState(null);
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
    fetch('http://localhost:3000/institution/index')
      .then(response => response.json())
      .then(data => setInstitutions(data))
      .catch(err => console.error('Error fetching institutions:', err));
  }, []);

  const getImageUrl = (filename) => {
    // Assuming your images are served from a directory called 'uploads'
    return filename ? `http://localhost:3000/uploads/${filename}` : 'default-logo.png'; // Provide a fallback image
  };

  // Calculate current institutions to display
  const indexOfLastInstitution = currentPage * institutionsPerPage;
  const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
  const currentInstitutions = institutions.slice(indexOfFirstInstitution, indexOfLastInstitution);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(institutionName, institutionUrl, logo )
    const formData = new FormData();
    formData.append('institution_name', institutionName);
    formData.append('logo', logo);
    formData.append('institution_url', institutionUrl);
    console.log(formData)

    try {
      const response = await fetch('http://localhost:3000/institution/create', {
        method: 'POST',
        body: formData, // FormData will set the Content-Type to 'multipart/form-data' automatically
      });
      const result = await response.json(); // Parse JSON response

      if (!response.ok) throw new Error(result.error || 'Failed to create institution.');

      setInstitutionName('');
      setInstitutionUrl('');
      setLogo(null);
    } catch (error) {
      setError(error.message);
      console.error('Failed to add institution:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Add New Institution</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Institution Name</label>
          <input
            type="text"
            value={institutionName}
            onChange={(e) => { 
              //console.log(e.target.value)
              setInstitutionName(e.target.value)

            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            //required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Institution URL</label>
          <input
            type="url"
            placeholder='http://example.com'
            value={institutionUrl}
            onChange={(e) => setInstitutionUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            //required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Logo</label>
          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            //required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
        {error && <p className="mt-3 text-red-500">{error}</p>}
      </form>

      
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution Website
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentInstitutions.map((institution) => (
                    <tr key={institution.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <img
                  className="h-10 w-10 rounded-full"
                  src={getImageUrl(institution.logo)}
                  alt="Logo"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop in case of broken URL
                    e.target.src = 'default-logo.png'; // Fallback image
                  }}
                />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {institution.institution_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {institution.institution_url}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <nav>
          <ul className="inline-flex -space-x-px">
            {Array.from({ length: Math.ceil(institutions.length / institutionsPerPage) }, (_, i) => (
              <li key={i + 1}>
                <button
                  onClick={() => paginate(i + 1)}
                  className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-md hover:bg-gray-100 hover:text-gray-700"
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
