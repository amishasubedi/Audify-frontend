import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const VerifyEmail = () => {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-5">
          <img
            src="https://assets.online.berklee.edu/catalog-site-heroes/careers-illustration-v2.png"
            alt="login visual"
            className="img-fluid"
          />
        </div>
        <div className="col-md-5">
          <form className="py-5 px-4">
            <h4 className="login-title text-center py-2 mb-4">Verify Email</h4>
            <p>Your code was sent to you via email</p>
            <div class="otp-field mb-4">
              <input type="number" maxLength="1" className="otp-input" />
              <input type="number" maxLength="1" className="otp-input" />
              <input type="number" maxLength="1" className="otp-input" />
              <input type="number" maxLength="1" className="otp-input" />
              <input type="number" maxLength="1" className="otp-input" />
              <input type="number" maxLength="1" className="otp-input" />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn btn-primary rounded-3"
              >
                Verify
              </button>
            </div>
            <div className="text-end mb-4">
              <Link to="/verify-email">Request Again?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
