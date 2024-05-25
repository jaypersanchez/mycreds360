import React from 'react';
import '../App.css';

function Dashboard({ isAuthenticated }) {
  return (
    <div className="dashboard">
      <div className="welcome-text pt-2 mb-3">
        <div className="row">
          <div className="col-md-6">  
            <div className="b-head">
              <h2>Welcome </h2>
            </div>                              
          </div>         
        </div>
      </div>

      <div className="cc-card-list mb-3">
        <div className="row">
          <div className="col-md-4">          	
            <div className="bcard">
              <h2>usersActiveCount</h2>
              <h4 className="red-card">Active Users</h4>
            </div>                              
          </div>
          <div className="col-md-4">          	
            <div className="bcard blr">
              <h2>usersInactiveCount</h2>
              <h4 className="yellow-card">Inactive Users</h4>
            </div>                              
          </div>
          <div className="col-md-4">          	
            <div className="bcard">
              <h2>rolesCount</h2>
              <h4 className="blue-card">Roles</h4>
            </div>                              
          </div>            
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
