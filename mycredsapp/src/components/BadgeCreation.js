/*
* This component creates a badge that will be assigned to a course which is coming from 
* mycreds360.newcourses.  Once a badge is created, this is then entered in 
* mycreds360.courses
*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination, Card } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const BadgeCreation = () => {

  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [fileImage, setFileImage] = useState(null)
  const [error, setError] = useState('')
  const [courses, setCourses] = useState([])  

  // Fetch courses on component mount
  useEffect(() => {
    fetch('http://localhost:3000/newcourses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => setError(error.message))
  }, [])  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log(selectedCourse, courseDescription, fileImage)
    // Define the payload
    const formData = new FormData();
    formData.append('course_name', selectedCourse);
    formData.append('description', courseDescription);
    formData.append('badge', fileImage); // Assuming fileImage is the file to be uploaded

    // Send a POST request to the API endpoint
    fetch('http://localhost:3000/createbadge', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  }


  return (
    <div>
            <div className="fullscreen">
                <div className="side-navbar">
                    <SideNavbar />
                </div>
                <div className="main-content">
      <div className="add-account-section">
        <h3>Create Badge</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              as="select"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              required
            >
              <option value="">Select a Course</option>
              {courses.map(course => (
                <option key={course.id} value={course.course_name}>
                  {course.course_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              onChange={(e) => setFileImage(e.target.files[0])}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">Save Badge</Button>
        </Form>
        <Row>
          {courses.map(course => (
            <Col key={course.id} md={4} className="mb-3">
              <Card>
                <Card.Img variant="top" 
                  src={course.badge ? `http://localhost:3000/uploads/${course.badge}`:'/uploads'} alt="Badge Image" 
                />
                <Card.Body>
                  <Card.Title>{course.course_name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
            </div>
    </div>  
  );
}

export default BadgeCreation;
