import React, {useState, useEffect} from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import LoginForm from './components/LoginFormSocial';
import CreateAccount from './components/CreateAccount';
import CreateInstitution from './components/CreateInstitution';
import CreateCertificateTemplate from './components/CreateCertificateTemplate';
import CreateCourse from './components/CreateCourse';
import BadgeCreation from './components/BadgeCreation';
import Admin from './components/Admin';
import Roles from './components/Roles';
import Students from './components/Students';
import StudentBadgeCertificate from './components/StudentBadgeCertificate';

function App() {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        setIsAuthenticated(true);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="fullscreen whitebg">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-lg-6 col-md-12 cc-left c-center h-100">
              {/* Use Routes to handle multiple routes */}
              <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/students" element={isAuthenticated ? <Students /> : <Navigate to="/" />} />
                <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/" />} />
                <Route path="/roles" element={isAuthenticated ? <Roles /> : <Navigate to="/" />} />
                <Route path="/create-account" element={ isAuthenticated ? <CreateAccount /> : <Navigate to="/" />}  />
                <Route path="/create-institution" element={ isAuthenticated ? <CreateInstitution /> : <Navigate to="/" /> } />
                <Route path="/create-certificate-template" element={ isAuthenticated ? <CreateCertificateTemplate /> : <Navigate to="/" /> } />
                <Route path="/create-course" element={ isAuthenticated ? <CreateCourse /> : <Navigate to="/" /> } />
                <Route path="/badge-creation" element={ isAuthenticated ? <BadgeCreation /> : <Navigate to="/" /> } />
                <Route path="/studentbadgecertificate/:studentId" element={<StudentBadgeCertificate />} />
              </Routes>
            </div>
            <div className="col-lg-6 col-md-12 h-100 p-0">
              <div className="side-fullimg login">
                {/* Add any content for the right side */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
