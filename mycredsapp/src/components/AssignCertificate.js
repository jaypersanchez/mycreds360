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
  const [selectStudentName, setSelectStudentName] = useState(''); // Added to store student name [optional] 
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [totalhours, setTotalHours] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [badgeData, setBadgeData] = useState(''); // Added to store badge data


  // get all courses
  useEffect(() => {
    fetch('http://localhost:3000/courses')  // Adjust this URL as necessary
        .then(response => response.json())
        .then(data => {
            setCourses(data)
        })
        .catch(error => console.error('Error fetching institutions:', error));
  }, []);

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
    fetch('http://localhost:3000/students')  // Adjust this URL as necessary
        .then(response => response.json())
        .then(data => {
            setStudents(data)
            //console.log(data)
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSelectStudent = (event) => {
            
      const studentId = event.target.value;
      console.log(studentId)
      setSelectedStudent(studentId)
      
      // Find the student in the array using the studentId
      //const selectedStudent = students.find(student => student.id === studentId);
      
      //setSelectedStudent(selectedStudent.first_name + " " + selectedStudent.last_name)
      /*if (selectedStudent) {
        console.log("Selected Student's Name:", selectedStudent.first_name + " " + selectedStudent.last_name);
        // If you need to save the name in the state or pass it somewhere
        // setSelectStudentName(selectedStudent.first_name + " " + selectedStudent.last_name);
      }*/
    };

    const handleSelectInstituion = (event) => {
      setSelectedInstitution(event.target.value);
    };

    const handleSelectCourse = (event) => {
      setSelectedCourse(event.target.value);
    };

    // Save certificate data
    const handleSave = () => {
      // Need to set the payload to be OpenBadge3 compliant
      const institutionName = institutions[selectedInstitution].institution_name;  // Assuming `institutions` array and `selectedInstitution` gives you the index
      const selectedCourseName = courses[selectedCourse].course_name;
      const studentId = selectedStudent;
      const totalHours = totalhours;
      const dateCompletion = selectedDate;
      
      /*console.log(`${institutions[selectedInstitution].id},
                    ${institutionName},
                    ${institutions[selectedInstitution].institution_url},
                    ${selectedDate}                  
                  `)*/
      const certificate_badgev3 = { 
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://w3id.org/openbadges/v3"
        ],
        "type": ["VerifiableCredential", "Assertion"],
        "id": "https://example.org/badges/123",
        "issuer": {
          "id": institutions[selectedInstitution].id,
          "type": "Profile",
          "name": institutions[selectedInstitution].institution_name,
          "url": institutions[selectedInstitution].institution_url
        },
        "issuanceDate": selectedDate,
        "credentialSubject": {
          "id": "",
          "type": "RecipientProfile",
          "name": "",
          "hasCredential": {
            "type": "BadgeClass",
            "name" : institutions[selectedInstitution].institution_name,
            "description": courses[selectedCourse].course_name,
            "image": "https://example.org/badges/images/12345.png",
            "criteria": "https://example.org/badges/criteria/123",
            "tags": ["Data Analysis", "Certification", "Professional"]
          }
        },
        "proof": {
          "type": "",
          "jwt": ""
        }
      };

      // Create the payload
      const payload = {
        institution_id: institutions[selectedInstitution].id,
        institution_name: institutionName,
        institution_url: institutions[selectedInstitution].institution_url,
        course_name: selectedCourseName,  // Assuming there's a state or prop that keeps track of this
        total_hours: totalHours,
        date_completion: dateCompletion
      };

      //console.log(certificate_badgev3)

      // Use the studentId in the URL and send the request
      fetch(`http://localhost:3000/assign-certificate/${studentId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not okay');
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          // You might want to clear the form or give feedback to the user that the submission was successful.
      })
      .catch(error => {
          console.error('Error:', error);
          // Optionally handle the error, e.g., show an error message to the user
      });
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
                                  {student.first_name} {student.last_name}
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
                    <Form.Group>
                      <Form.Control as="select" value={selectedCourse} onChange={handleSelectCourse}>
                          <option value="">Select Course</option>
                          {courses.map((course) => (
                              <option key={course.id} value={course.id}>
                                  {course.course_name} 
                              </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
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
