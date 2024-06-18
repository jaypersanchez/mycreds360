import React, { useState, useEffect } from 'react';

export default function Badge() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [description, setDescription] = useState('');
  const [fileImage, setFileImage] = useState(null);
  const [error, setError] = useState('');

  // Fetch courses on component mount
  useEffect(() => {
    fetch('http://localhost:3000/newcourses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => setError(error.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('course_name', selectedCourse);
    formData.append('description', description);
    formData.append('badge', fileImage);

    fetch('http://localhost:3000/createbadge', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log("Badge created:", data))
    .catch(error => console.error('Error creating badge:', error));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold leading-tight">Create New Badge</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">Select Course</label>
          <select
            id="courseSelect"
            className="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            required
          >
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.course_name}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            rows="3"
            placeholder="Enter course description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="fileInput" className="block text-sm font-medium text-gray-700">Badge Image</label>
          <input
            type="file"
            id="fileInput"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            onChange={(e) => setFileImage(e.target.files[0])}
            accept="image/png, image/jpeg"
            required
          />
        </div>
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Badge
        </button>
      </form>
    </div>
  );
}
