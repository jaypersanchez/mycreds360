// CertificationModal.js
import React, { useState, useEffect } from 'react';

function CertificationModal({ certificationId, userId, onClose }) {
    const [metadata, setMetadata] = useState();

    useEffect(() => {
        if (certificationId && userId) {
            fetch(`http://localhost:3000/assign-certificate/${userId}/${certificationId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch certification details');
                    }
                    return response.json();
                })
                .then(data => {
                    setMetadata(data);
                })
                .catch(err => {
                    console.error('Error fetching certification details:', err);
                    // Handle error state if needed
                });
        }
    }, [certificationId,userId]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Certification Details</h2>
                {metadata ? (
                    <div>
                        <p><strong>Institution:</strong> {metadata.institution_name}</p>
                        <p><strong>Course:</strong> {metadata.course_name}</p>
                        <p><strong>Total Hours:</strong> {metadata.total_hours}</p>
                        <p><strong>Date of Completion:</strong> {metadata.date_completion}</p>
                        {/* Add more fields as needed */}
                    </div>
                ) : (
                    <p>Loading certification details...</p>
                )}
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Close</button>
            </div>
        </div>
    );
}

export default CertificationModal;