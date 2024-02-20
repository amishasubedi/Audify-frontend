import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const ForgotPassword = () => {
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
            <h4 className="login-title text-center py-2 mb-4">
              Forget Password
            </h4>
            <FormField
              id="email"
              label="Email"
              type="email"
              register={register}
              registerOptions={getEmailValidationRules()}
              errors={errors}
            />

            <div className="d-flex justify-content-between mb-4">
              <Link to="/sign-up">Signup</Link>
              <Link to="/sign-in">Signin</Link>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn btn-primary rounded-3"
              >
                Send Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
