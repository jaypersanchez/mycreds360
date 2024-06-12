import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, 
         Button, Alert, ListGroup, Pagination, 
         Table, Tabs, Tab, Card
} from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const AssignCertificate = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [totalhours, setTotalHours] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // get all institutions
  useEffect(() => {
    fetch('http://localhost:3000/institution/index')  // Adjust this URL as necessary
        .then(response => response.json())
        .then(data => {
            setInstitutions(data)
        })
        .catch(error => console.error('Error fetching institutions:', error));
  }, []);

  //get all users for selecting a student.
  useEffect(() => {
    fetch('http://localhost:3000/users')  // Adjust this URL as necessary
        .then(response => response.json())
        .then(data => {
            setStudents(data)
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSelectStudent = (event) => {
      setSelectedStudent(event.target.value);
    };

    const handleSelectInstituion = (event) => {
      setSelectedInstitution(event.target.value);
    };

    const handleSave = () => {
      console.log('Save button clicked');
      console.log(selectedStudent.user_id, selectedInstitution.institution_name)
  
      // Perform your save logic here
      // This could include validating data, calling an API, etc.
  };

  
  return (
    <div className="fullscreen">
      <div className="side-navbar">
          <SideNavbar />
      </div>
            <div className="main-content">
              <Container>
                  <h3>Assign Certificate to Student</h3>
                  <Row>
                    <Col>
                  <Form.Group>
                      <Form.Control as="select" value={selectedStudent} onChange={handleSelectStudent}>
                          <option value="">Select a Student</option>
                          {students.map((student) => (
                              <option key={student.id} value={student.id}>
                                  {student.first_name} {/* Adjust if your student object has different properties */}
                              </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group>
                      <Form.Control as="select" value={selectedInstitution} onChange={handleSelectInstituion}>
                          <option value="">Select an Institution</option>
                          {institutions.map((institution) => (
                              <option key={institution.id} value={institution.id}>
                                  {institution.institution_name} {/* Adjust if your student object has different properties */}
                              </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                    </Col>
                    </Row>
                    <Row>
                    <Col>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Total Hours"
                        value={totalhours}
                        onChange={(e) => setTotalHours(e.target.value)}
                    />
                    </Col>
                    <Col>
                    <input
                      type="date"
                      className="form-control mb-2"
                      placeholder="Select a Date"
                      value={selectedDate} // This should be a state variable in your component
                      onChange={(e) => setSelectedDate(e.target.value)} // Update the state on change
                    />
                    </Col>
                    </Row>
                    <Row>
                    <Col><Button variant="primary" onClick={handleSave}>Save</Button></Col>
                    </Row>
                    
              </Container>           
            </div>
    </div>
  );
}

export default AssignCertificate;
