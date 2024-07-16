import React, { useState, useEffect } from 'react';

function CertificateTemplate() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    // Simulated data or fetch from API
    useEffect(() => {
        // Fetch institutions without certificate templates setup
        fetchInstitutionsWithoutTemplates(); // Implement this function
    }, []);

    // Function to fetch institutions without certificate templates setup
    const fetchInstitutionsWithoutTemplates = () => {
      fetch('http://localhost:3000/institution/unused')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch institutions without templates');
          }
          return response.json();
      })
      .then(data => {
          // Assuming the response data is an array of institutions with `id` and `name` properties
          setInstitutions(data);
      })
      .catch(error => {
          console.error('Error fetching institutions:', error);
          // Handle error state if needed
      });
    };

    // Handle change in institution selection
    const handleInstitutionChange = (event) => {
        const selectedId = event.target.value;
        setSelectedInstitution(selectedId);
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    // Submit function (to be implemented based on your application logic)
    const handleSubmit = () => {
        // Implement logic to save selected institution and selected file
        console.log(`Selected Institution: ${selectedInstitution}`);
        console.log(`Selected File:`, selectedFile);
        // Example of further actions: API calls, state updates, etc.
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">Select Institution and Upload Certificate</h2>

            {/* Select Institution */}
            <div className="mb-4">
                <label htmlFor="institution" className="block mb-2">Select Institution:</label>
                <select
                    id="institution"
                    className="border border-gray-300 rounded px-3 py-1 w-full"
                    value={selectedInstitution}
                    onChange={handleInstitutionChange}
                >
                    <option value="">Select an institution...</option>
                    {institutions.map((institution) => (
                        <option key={institution.id} value={institution.id}>{institution.institution_name}</option>
                    ))}
                </select>
            </div>

            {/* Upload File */}
            <div className="mb-4">
                <label className="block mb-2">Upload Certificate File:</label>
                <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                />
            </div>

            {/* Submit Button */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={!selectedInstitution || !selectedFile}
            >
                Submit
            </button>
        </div>
    );
}

export default CertificateTemplate;
