import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, 
         Button, Alert, ListGroup, Pagination, 
         Table, Tabs, Tab 
} from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';

const StudentBadgeCertificate = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const student = location.state?.student;
    console.log(student)
    return(
        <div className="fullscreen">
            <div className="side-navbar">
                <SideNavbar />
            </div>
            <div className="main-content"></div>
            
            <div className="container">
            <div>
                <p>{student.first_name} {student.last_name}</p>
                <p>{student.mobile_no}</p>
                <p>{student.email}</p>
            </div>
                <Container>
                    <Tabs defaultActiveKey="badges" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="badges" title="Badges">
                            <Row>
                                <Col>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Badge</th>
                                                <th>Course</th>
                                                <th>Issued Date</th>
                                                <th>Expiry Date</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Badge 1</td>
                                                <td>Course 1</td>
                                                <td>2021-10-01</td>
                                                <td>2022-10-01</td>
                                                <td><Button variant="primary">View</Button></td>
                                            </tr>
                                            <tr>
                                                <td>Badge 2</td>
                                                <td>Course 2</td>
                                                <td>2021-10-01</td>
                                                <td>2022-10-01</td>
                                                <td><Button variant="primary">View</Button></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="certificates" title="Certificates">
                            <Row>
                                <Col>
                                    {/* Similar table or different content for certificates */}
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Certificate</th>
                                                <th>Course</th>
                                                <th>Issued Date</th>
                                                <th>Expiry Date</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Certificate 1</td>
                                                <td>Course 3</td>
                                                <td>2021-12-01</td>
                                                <td>2022-12-01</td>
                                                <td><Button variant="primary">View</Button></td>
                                            </tr>
                                            <tr>
                                                <td>Certificate 2</td>
                                                <td>Course 4</td>
                                                <td>2021-12-01</td>
                                                <td>2022-12-01</td>
                                                <td><Button variant="primary">View</Button></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Container>
            </div>    
        </div>
    );

}

export default StudentBadgeCertificate;