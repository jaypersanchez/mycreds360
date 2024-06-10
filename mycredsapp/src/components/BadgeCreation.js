/*
* This component creates a badge that will be assigned to a course which is coming from 
* mycreds360.newcourses.  Once a badge is created, this is then entered in 
* mycreds360.courses
*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, ListGroup, Pagination } from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const BadgeCreation = () => {

  const [selectedCourse, setSelectedCourse] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [fileImage, setFileImage] = useState(null)
  const [error, setError] = useState('')
  const [courses, setCourses] = useState([])  

  // I need useEffect to fetch the courses from the API http://localhost:3000/newcourses
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
                        data={courses}
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        required
                      >
                        <option value="">Select a Course</option>
                        {courses.map(course => (
                          <option key={course.id} value={course.course_name}>
                            {
                            course.course_name
                            } {/* Assuming each course has an id and name */}
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
                          onChange={(e) => setFileImage(e.target.files[0])}
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
