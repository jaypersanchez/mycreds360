import React, { useEffect, useState } from 'react';
import SideNavbar from './SideNavbar';

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('')
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch courses.');
        }
        return response.json();
      })
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch courses. Please try again later.');
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    // Filter institutions based on search term
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      // Filter users based on search term
      const filteredCourses = courses.filter(courses =>
        courses.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredCourses);
      //console.log(`search ${JSON.stringify(filteredCourses)}`);
    }
  }, [searchTerm, courses]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Get current courses
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className="row">
      <div className="col-lg-3">
          <SideNavbar />
        </div>
        <div className="add-course">
        <div className="add-course-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Add Course</button>
          </form>
        </div>
      </div>
      <div className="course-list-section">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Search by course name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
        <ul>
          {searchResults.map(course => (
            <li key={course.id}>
              <div>Course ID: {course.id}</div>
              <div>Course Name: {course.course_name}</div>
              {/* Add additional course details as needed */}
            </li>
          ))}
        </ul>
        {/* Pagination */}
        <ul className="pagination">
          {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, i) => (
            <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default CreateCourse;
