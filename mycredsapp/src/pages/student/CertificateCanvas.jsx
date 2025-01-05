// src/components/CertificateCanvas.jsx
import React, { useRef, useEffect } from 'react';

const CertificateCanvas = ({ 
    selectedImage, 
    selectedStudentName, 
    institutionName, 
    courseName, 
    totalHours, 
    dateCompletion, 
    onSave 
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = selectedImage;

        image.onload = () => {
            // Set canvas dimensions
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the image on the canvas
            ctx.drawImage(image, 0, 0);

            // Overlay text on the image
            ctx.font = '24px Arial';
            ctx.fillStyle = 'black';
            ctx.fillText(selectedStudentName, 50, 50); // Adjust position as needed
            ctx.fillText(institutionName, 50, 100);
            ctx.fillText(courseName, 50, 150);
            ctx.fillText(`Total Hours: ${totalHours}`, 50, 200);
            ctx.fillText(`Date of Completion: ${dateCompletion}`, 50, 250);
        };
    }, [selectedImage, selectedStudentName, institutionName, courseName, totalHours, dateCompletion]);

    const handleSave = () => {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        onSave(dataUrl); // Call the onSave function passed as a prop
    };

    return (
        <div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                Save Certificate
            </button>
        </div>
    );
};

export default CertificateCanvas;