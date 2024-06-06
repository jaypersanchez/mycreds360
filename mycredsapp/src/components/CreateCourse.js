import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination } from 'react-bootstrap';
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
      console.log(`search ${JSON.stringify(filteredCourses)}`);
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
    <Container fluid>
  <Row>
    <Col lg={3}>
      <SideNavbar />
    </Col>
    <Col lg={9}>
      <div className="add-course-form">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
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
        <ListGroup>
          {searchResults.map(course => (
            <ListGroup.Item key={course.id}>
              <div>Course ID: {course.id}</div>
              <div>Course Name: {course.course_name}</div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ul>
          {currentCourses.map(course => (
            <li key={course.id}>
              <div>Course ID: {course.id}</div>
              <div>Course Name: {course.course_name}</div>
            </li>
          ))}
          </ul>
        <Pagination className="mt-3">
          {Array.from({ length: Math.ceil(searchResults.length / coursesPerPage) }, (_, i) => (
            <Pagination.Item key={i} active={currentPage === i + 1} onClick={() => paginate(i + 1)}>
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Col>
  </Row>
</Container>

  );
}

export default CreateCourse;
