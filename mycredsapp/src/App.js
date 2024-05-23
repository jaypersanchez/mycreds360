import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import LoginForm from './components/LoginForm';



function App() {
  return (
    <Router> {/* Wrap your component tree with Router */}
      <div className="fullscreen whitebg">
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="col-lg-6 col-md-12 cc-left c-center h-100">
              <LoginForm />
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
