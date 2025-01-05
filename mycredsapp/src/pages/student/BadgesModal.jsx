import React from 'react';

const BadgesModal = ({ isOpen, onClose, badgeImages }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-screen-lg max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-wrap justify-center gap-4">
          {badgeImages.length > 0 ? (
            badgeImages.map((image, index) => (
              <div key={index} className="flex-shrink-0 p-2">
                <img src={image} alt={`Badge ${index}`} className="h-48 w-48 object-cover rounded-lg shadow-md" />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No badges available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BadgesModal;
