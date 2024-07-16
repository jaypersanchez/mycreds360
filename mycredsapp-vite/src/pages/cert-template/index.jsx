import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

function CertificateTemplate() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [placeholderFields, setPlaceholderFields] = useState([]);

    // Define draggable fields with initial positions
    const initialDraggableFields = [
        { id: 'institution_name', type: 'Institution Name', text: 'Institution Name', x: 50, y: 50 },
        { id: 'student_name', type: 'Student Name', text: 'Student Name', x: 150, y: 100 },
        { id: 'course_name', type: 'Course Name', text: 'Course Name', x: 250, y: 150 },
        { id: 'hours', type: 'Number of Hours', text: 'Number of Hours', x: 350, y: 200 },
        { id: 'completion_date', type: 'Completion Date', text: 'Completion Date', x: 450, y: 250 },
        { id: 'description', type: 'Description', text: 'Description of Certificate', x: 550, y: 300 },
        { id: 'verification_id', type: 'Verification ID', text: 'Verification ID', x: 650, y: 350 }
    ];

    const [draggableFields, setDraggableFields] = useState(initialDraggableFields);

    // Simulated data or fetch from API
    useEffect(() => {
        fetchInstitutionsWithoutTemplates();
        loadTemplatePositions(); // Load saved template positions
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

    // Handle submit function (to be implemented based on your application logic)
    const handleSubmit = () => {
        if (!selectedInstitution || !selectedFile) {
            alert('Please select an institution and upload a file.');
            return;
        }

        // Assuming you want to display or process the selected file here
        console.log('Selected Institution:', selectedInstitution);
        console.log('Selected File:', selectedFile);

        // Example: Display the selected file
        if (selectedFile.type.includes('image')) {
            // Display image
            const imageUrl = URL.createObjectURL(selectedFile);
            console.log('Displaying image:', imageUrl);
            // You can render this imageUrl in an <img> tag for display
        } else if (selectedFile.type === 'application/pdf') {
            // Display PDF (optional, requires PDF viewer component)
            console.log('Displaying PDF:', selectedFile);
            // You can render a PDF viewer component here
        }
    };

    // Render draggable placeholders on the certificate template image
    const renderPlaceholderFields = () => {
        return (
            <div className="flex flex-col space-y-4">
                {draggableFields.map((field, index) => (
                    <Draggable
                        key={field.id}
                        defaultPosition={{ x: field.x, y: field.y }}
                        onStop={(e, data) => handleDragStop(field.id, data)}
                    >
                        <div className="bg-white p-2 border border-gray-300 shadow-lg rounded cursor-move">
                            {field.text}
                        </div>
                    </Draggable>
                ))}
            </div>
        );
    };

    // Handle drag stop event to update field position
    const handleDragStop = (fieldId, data) => {
        const updatedFields = draggableFields.map(field =>
            field.id === fieldId ? { ...field, x: data.x, y: data.y } : field
        );
        setDraggableFields(updatedFields);
        saveTemplatePositions(updatedFields); // Save updated positions
    };

    // Save template positions to backend API
    const saveTemplatePositions = (fields) => {
      fetch('http://localhost:3000/save-template-positions', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fields }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to save template positions');
          }
          console.log('Template positions saved successfully');
      })
      .catch(error => {
          console.error('Error saving template positions:', error);
          // Handle error state if needed
      });
    };

    // Load saved template positions from backend API
    const loadTemplatePositions = () => {
      fetch('http://localhost:3000/get-template-positions')
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to load template positions');
          }
          return response.json();
      })
      .then(data => {
          if (data && data.image_json) {
              setDraggableFields(JSON.parse(data.image_json));
          }
      })
      .catch(error => {
          console.error('Error loading template positions:', error);
          // Handle error state if needed
      });
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

            {/* Display Selected File */}
            {selectedFile && (
                <div className="mb-4 relative flex">
                    {/* Image Preview */}
                    <div className="flex-grow relative">
                        <h3 className="text-lg font-semibold mb-2">Selected File Preview:</h3>
                        {selectedFile.type.includes('image') ? (
                            <img src={URL.createObjectURL(selectedFile)} alt="Selected File" className="max-w-full h-auto" />
                        ) : selectedFile.type === 'application/pdf' ? (
                            <embed src={URL.createObjectURL(selectedFile)} type="application/pdf" width="100%" height="600px" />
                        ) : (
                            <p>Unsupported file type</p>
                        )}
                    </div>

                    {/* Draggable Placeholder Fields */}
                    <div className="absolute top-0 right-0 p-4 flex flex-col space-y-4">
                        {renderPlaceholderFields()}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={!selectedInstitution || !selectedFile}
            >
                Load Certificate Template
            </button>
        </div>
    );
}

export default CertificateTemplate;
