import React, { useState, useEffect } from 'react';

export default function Institution() {
  const [institutions, setInstitutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [institutionsPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:3000/institution/index')
      .then(response => response.json())
      .then(data => setInstitutions(data))
      .catch(err => console.error('Error fetching institutions:', err));
  }, []);

  // Calculate current institutions to display
  const indexOfLastInstitution = currentPage * institutionsPerPage;
  const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
  const currentInstitutions = institutions.slice(indexOfFirstInstitution, indexOfLastInstitution);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-center mb-8">Institutions List</h2>
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
                      Signature
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentInstitutions.map((institution) => (
                    <tr key={institution.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="h-10 w-10 rounded-full" src={institution.logo} alt="Institution Logo" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {institution.institution_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="h-10 w-auto" src={institution.signature} alt="Institution Signature" />
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
