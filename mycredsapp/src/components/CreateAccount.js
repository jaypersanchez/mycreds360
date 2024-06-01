/* This will create an account and designate as: student, Admin or Super Admin or Badge issuer */
import React from 'react';
import '../App.css';
import SideNavbar from './SideNavbar';

const CreateAccount = () => {
  return (
    <div className="dashboard">
      <div className="row">
        <div className="col-lg-3">
          <SideNavbar />
        </div>
        <div className="col-lg-9">
          <div className="add-institution-section">
            <h3>Add Add Account</h3>
            
          </div>
          <div className="institution-list-section">
            <h3>List Accounts</h3>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
