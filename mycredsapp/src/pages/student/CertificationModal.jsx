// CertificationModal.js
import React, { useState, useEffect } from 'react';

function CertificationModal({ certificationId, userId, onClose }) {
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        if (certificationId && userId) {
            fetch(`http://localhost:3000/assign-certificate/${userId}`)
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
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4">Certification Details</h2>
                <div className="max-h-96 overflow-y-auto">
                    {metadata.length > 0 ? (
                        metadata.map((certification) => (
                            <div key={certification.id} className="mb-4">
                                <p><strong>Institution:</strong> {certification.institution_name || 'N/A'}</p>
                                <p><strong>Course:</strong> {certification.course_name}</p>
                                <p><strong>Total Hours:</strong> {certification.total_hours}</p>
                                <p><strong>Date of Completion:</strong> {certification.date_completion}</p>
                                <div className="mb-4">
                                    {certification.image_url ? (
                                        <img src={certification.image_url} alt="Certification" className="w-12 h-12" />
                                    ) : (
                                        <img src="logo.png" alt="Placeholder" style={{ width: '50px', height: '50px' }} />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No certification details available.</p>
                    )}
                </div>
                <button 
                    onClick={onClose} 
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    );
}

export default CertificationModal;