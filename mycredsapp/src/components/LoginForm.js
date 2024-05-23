import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [csrf_token, setCsrfToken] = useState("")
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="fullscreen whitebg">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-lg-6 col-md-12 cc-left c-center h-100">
            <div className="login-form col-lg-8 col-md-8 col-sm-8">
              <div className="form-group mb-4"> <img src="../../public/images/logo.png" alt="Logo" /> </div>
              <form className="login100-form validate-form login-form" id="login" onSubmit={handleSubmit}>
                {/* CSRF Token */}
                <input type="hidden" name="_token" value={csrf_token} />
                {success && <div className="alert alert-success">{success}</div>}
                <div className="fl w-100">
                  <div className="form-group mb-4 relative limg"> <img src="../../public/images/email.png" alt="Email Icon" />
                    <input className="input100" type="text" name="email" placeholder="Email" autoComplete="off" />
                  </div>
                  {/* Display validation error */}
                  {errors && errors.email && <p className="invalid-feedback d-block mt-10 validation-error">{errors.email}</p>}
                </div>
                <div className="fl w-100">
                  <div className="form-group mb-4 relative limg"> <img src="../../public/images/password.png" alt="Password Icon" />
                    <input className="input100" type={showPassword ? "text" : "password"} name="password" placeholder="Password" />
                    <span onClick={togglePasswordVisibility} className={`fa fa-fw field-icon toggle-password ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} id="passwordcheck"></span>
                  </div>
                  {/* Display validation error */}
                  {errors && errors.password && <p className="invalid-feedback d-block mt-10 validation-error">{errors.password}</p>}
                </div>
                <div className="form-group mb-4">
                  <div className="row">
                    <div className="col-12 forgot">
                      <p><Link to="/forgot_password">Forgot Password?</Link></p>
                    </div>
                  </div>
                </div>
                <div className="form-group mb-4">
                  <input className="form-control" type="submit" value="Sign In" />
                </div>
              </form>
              <div className="form-group text-center account">
                <p>Don't have an Account? <Link to="/register">SIGNUP</Link></p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 h-100 p-0">
            <div className="side-fullimg login">
              {/* Add any content for the right side */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
