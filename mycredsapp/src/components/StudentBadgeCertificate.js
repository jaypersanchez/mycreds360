import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, 
         Button, Alert, ListGroup, Pagination, 
         Table, Tabs, Tab, Card
} from 'react-bootstrap';
import '../App.css';
import SideNavbar from './SideNavbar';


const StudentBadgeCertificate = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const student = location.state?.student;
    const [certificates, setCertificates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [certificatesPerPage] = useState(5);
    
    useEffect(() => {
        fetch('http://localhost:3000/assign-certificate')
            .then(response => response.json())
            .then(data => setCertificates(data))
            .catch(err => console.error('Error fetching data: ', err));
    }, []);

    const indexOfLastCertificate = currentPage * certificatesPerPage;
    const indexOfFirstCertificate = indexOfLastCertificate - certificatesPerPage;
    const currentCertificates = certificates.slice(indexOfFirstCertificate, indexOfLastCertificate);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Get the total pages
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(certificates.length / certificatesPerPage); i++) {
        pageNumbers.push(i);
    }

    // Determine the page buttons to display
    const maxPageNumberLimit = 10; // Max pages to display in the pagination
    const minPageNumberLimit = 0;

    const renderPageNumbers = pageNumbers.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
                    {number}
                </Pagination.Item>
            );
        } else {
            return null;
        }
    });

    return(
        <div className="fullscreen">
            <div className="side-navbar">
                <SideNavbar />
            </div>
            <div className="main-content">
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
                        <Tab eventKey="certificates" title="Assign Certificates">
                        <Row>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Certificates</Card.Title>
                                            <Table striped bordered hover responsive className="mt-3">
                                                <thead>
                                                    <tr>
                                                        <th>Institution</th>
                                                        <th>Course</th>
                                                        <th>Total Hours</th>
                                                        <th>Completion Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentCertificates.map(certificate => (
                                                        <tr key={certificate.id}>
                                                            <td>{certificate.institution_name}</td>
                                                            <td>{certificate.course_name}</td>
                                                            <td>{certificate.total_hours}</td>
                                                            <td>{certificate.date_completion}</td>
                                                            <td><Button variant="primary">View</Button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                            <Pagination>{renderPageNumbers}</Pagination>
                                        </Card.Body>
                                    </Card>
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