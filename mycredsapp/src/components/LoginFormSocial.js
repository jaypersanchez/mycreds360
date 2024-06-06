import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, Redirect, Navigate, useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';


const LoginFormSocial = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [csrf_token, setCsrfToken] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(true);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate();
  // State to track whether navigation is needed
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const location = useLocation();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(location.pathname !== '/dashboard') {
      const user = JSON.parse(sessionStorage.getItem('user'));
      if (user) {
        setShouldNavigate(true); // Set flag to navigate
      }
    }
  }, [navigate, location]);
  
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        //console.log(`user exist ${user}`)
        navigate('/dashboard')
    }
  },[shouldNavigate, navigate]);

  const saveUserToLocalStorage = async (user) => {
    // Check if user object is provided
    if (user) {
      // Convert user object to a JSON string and store it in sessionStorage
      //const expirationTime = new Date().getTime() + expirationHours * 60 * 60 * 1000;
      sessionStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true)
    } else {
      // If user object is null, remove it from localStorage
      sessionStorage.removeItem('user');
      setIsAuthenticated(false)
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Make a POST request to the signin endpoint
        const response = await fetch(`http://localhost:3000/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Check if the request was successful
        if (!response.ok) {
            // Handle error response
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        // Parse the JSON response
        const user = await response.json();
        console.log(user)
        if(response.error) {
            alert('Authentication Failed:', response.error)
        }
        
        // Save the user object to state or localStorage
        saveUserToLocalStorage(user)
        .then(() => {
        navigate("/dashboard")
        })
    } catch (error) {
        // Handle error
        console.error('Error signing in:', error.message);
        // Display error message to the user
    }
};

  const handleSocialLogin = (provider) => {
    switch (provider) {
      case 'facebook':
        // Implement Facebook login logic here
        // For example, redirect the user to Facebook OAuth URL
        window.location.href = 'https://www.facebook.com/v11.0/dialog/oauth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=email';
        break;
      case 'instagram':
        // Implement Instagram login logic here
        break;
      case 'github':
        // Implement GitHub login logic here
        // For example, redirect the user to GitHub OAuth URL
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user';
        break;
      case 'google':
        // Implement Google login logic here
        break;
      default:
        // Handle unsupported provider
        break;
    }
  };
  
  // Function to handle input change for email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle input change for password field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="fullscreen whitebg">
      <Container fluid>
        <Row>
          <Col lg={6} md={12}>
            <div className="login-form">
              <Form id="login" onSubmit={handleSubmit}>
                <input type="hidden" name="_token" value={csrf_token} />
                {success && <div className="alert alert-success">{success}</div>}
                <Form.Group className="mb-4 relative limg">
                  <img src={require("../images/email.png")} alt="Email Icon" />
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={email}
                    onChange={handleEmailChange}
                    className="input100"
                  />
                  {errors && errors.email && <div className="invalid-feedback d-block mt-10">{errors.email}</div>}
                </Form.Group>
                <Form.Group className="mb-4 relative limg">
                  <img src={require("../images/password.png")} alt="Password Icon" />
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="input100"
                  />
                  <span onClick={togglePasswordVisibility} className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="passwordcheck"></span>
                  {errors && errors.password && <div className="invalid-feedback d-block mt-10">{errors.password}</div>}
                </Form.Group>
                <Button type="submit" className="form-control">Sign In</Button>
              </Form>
              <div className="social-login">
                <Button variant="facebook" onClick={() => handleSocialLogin('facebook')}>
                  <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
                </Button>
                <Button variant="instagram" onClick={() => handleSocialLogin('instagram')}>
                  <FontAwesomeIcon icon={faInstagram} /> Login with Instagram
                </Button>
                <Button variant="github" onClick={() => handleSocialLogin('github')}>
                  <FontAwesomeIcon icon={faGithub} /> Login with GitHub
                </Button>
                <Button variant="google" onClick={() => handleSocialLogin('google')}>
                  <FontAwesomeIcon icon={faGoogle} /> Login with Google
                </Button>
              </div>
              <div className="mb-4">
                <Row>
                  <Col xs={12}>
                    <Link to="/forgot_password">Forgot Password?</Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col lg={6} md={12}>
            <div className="login-form">
              <Form.Group className="mb-4">
                <img src={require("../images/login-img.jpg")} alt="Logo" className="small-log" />
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginFormSocial;
