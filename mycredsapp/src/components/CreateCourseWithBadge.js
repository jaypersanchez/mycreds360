/*
* These courses in mycreds360.courses have been assigned a badge through 
* Badge Creation component.  
*/
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination, Table } from 'react-bootstrap';
import SideNavbar from './SideNavbar';

const CreateBadeCourse = () => {
  const [courseName, setCourseName] = useState('')
  const [badge, setBadge] = useState('needs badge info image')
  const [description, setDescription] = useState('')
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/newcourses')
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
    const newCourse = {
      course_name: courseName,
      description: description,
      badge: badge
    };

    fetch('http://localhost:3000/courses/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCourse)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add course.');
        }
        return response.json();
      })
      .then(data => {
        // Handle success
        console.log('Course added successfully:', data);
        // Reset form fields
        setCourseName('');
        setDescription('');
        setBadge('');
      })
      .catch(error => {
        // Handle error
        console.error('Failed to add course:', error);
        setError('Failed to add course. Please try again later.');
      });
  }
  return (
    <div className="fullscreen">
    <div className="side-navbar">
          <SideNavbar />
    </div>
    <div className="main-content">
      <div>These are course with assigned Badge.</div>
      <div className="add-course-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter badge"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              />
          </Form.Group>
          
          </Form.Group>
          {error && <Alert variant="danger">{error}</Alert>}
          <Button variant="primary" type="submit">Add Course</Button>
        </Form>
      </div>
      <div className="course-list-section mt-3">
        <Form.Control
          type="text"
          className="mb-2"
          placeholder="Search by course name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
          <Table striped bordered hover>
    <thead>
      <tr>
        <th>Course ID</th>
        <th>Course Name</th>
        <th>Description</th>
        <th>Badge</th>
      </tr>
    </thead>
    <tbody>
      {currentCourses.map(course => (
        <tr key={course.id}>
          <td>{course.id}</td>
          <td>{course.course_name}</td>
          <td>{course.description}</td>
          <td>{course.badge}</td>
        </tr>
      ))}
    </tbody>
  </Table>

  <Pagination className="mt-3">
    {Array.from({ length: Math.ceil(searchResults.length / coursesPerPage) }, (_, i) => (
      <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>
        {i + 1}
      </Pagination.Item>
    ))}
  </Pagination>
      </div>
    </div>
  </div>

  );
}

export default CreateCourse;
