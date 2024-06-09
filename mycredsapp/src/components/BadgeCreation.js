import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const BadgeCreation = () => {

  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [fileImage, setFileImage] = useState('')
  const [error, setError] = useState('')
  const [courses, setCourses] = useState([])  

  // I need useEffect to fetch the courses from the API http://localhost:3000/courses
  useEffect(() => {
    fetch('http://localhost:3000/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => setError(error.message))
  }, [])  

  const handleSubmit = (e) => {
    // I need to get user from session storage
    const user = JSON.parse(sessionStorage.getItem('user')) 
    // I need to get the id from user
    const userId = user.id
    const completionDate = new Date().toISOString()
    // I need a jwt and save into variable called badge.  jwt must be generate
    const badge = 
    

    e.preventDefault();
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
                        data={courses}
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                      >
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.course_name} {/* Assuming each course has an id and name */}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Control
                          type="textarea"
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
                          placeholder="Upload Image"
                          value={fileImage}
                          onChange={(e) => setFileImage(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">Save Badge</Button>
                    </Form>
                  </div>
                </div>
            </div>
    </div>  
  );
}

export default BadgeCreation;
