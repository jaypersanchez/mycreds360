import React, { useState, useEffect } from 'react';
import SideNavbar from './SideNavbar';


const CreateInstitution = () => {
  const [institutionName, setInstitutionName] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [institutionsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch the list of institutions when the component mounts
    fetch('http://localhost:3000/institution/index')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch institutions.');
        }
        return response.json();
      })
      .then(data => {
        setInstitutions(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch institutions. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Filter institutions based on search term
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = institutions.filter(institution =>
        institution.institution_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results)
      console.log(`search ${JSON.stringify(results)}`)
    }
  }, [searchTerm, institutions]);

    // Get current institutions
    const indexOfLastInstitution = currentPage * institutionsPerPage;
    const indexOfFirstInstitution = indexOfLastInstitution - institutionsPerPage;
    const currentInstitutions = institutions.slice(indexOfFirstInstitution, indexOfLastInstitution);
  
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
    if (!institutionName.trim()) {
      setError('Please enter an institution name.');
      return;
    }

    // Handle adding institution logic here (e.g., API call, state update)
    fetch('http://localhost:3000/institution/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ institution_name: institutionName })
    })
    .then(response => {
      if (!response.ok) {
        // Handle error response
        throw new Error('Failed to add institution.');
      }
      // Institution added successfully
      console.log('Institution added successfully:', institutionName);
      setInstitutionName('');
      //setError(`Institution ${institutionName} created`);
      alert(`Institution ${institutionName} created`)
    })
    .catch(error => {
      // Handle error
      console.error('Error adding institution:', error.message);
      //setError('Failed to add institution. Please try again later.');
      alert('Failed to add institution. Please try again later.')
    });
  };

  return (
    
      <div className="row">
        <div className="col-lg-3">
          <SideNavbar />
        </div>
        <div className="col-lg-9">
        <div className="add-institution-section">
        <div className="add-institution-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter institution name"
                    value={institutionName}
                    onChange={(e) => setInstitutionName(e.target.value)}
                  />
                </div>
                {/*error && <div className="alert alert-danger">{error}</div>*/}
                <button type="submit" className="btn btn-primary">Add Institution</button>
              </form>
            </div>
          </div>

          <div className="institution-list-section">
            <h3>Institution List</h3>
            <input
            type="text"
            className="form-control mb-2"
            placeholder="Search institution by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
            <ul>
                {searchResults.map(institution => (
                  <li key={institution.id}>
                    {institution.logo ? (
                      <img
                        src={`http://localhost:3000/uploads/${institution.logo}`}
                        alt={institution.institution_name}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: 'lightgray',
                          marginRight: '10px',
                        }}
                      />
                    )}
                    {institution.institution_name}
                  </li>
                ))}
              </ul>
            {/* Pagination */}
            <ul className="pagination">
              {Array.from({ length: Math.ceil(institutions.length / institutionsPerPage) }, (_, i) => (
                <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                  <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    
  );
}

export default CreateInstitution;
