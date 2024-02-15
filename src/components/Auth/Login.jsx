import React from "react";
import "./style.css";

const Login = () => {
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
            <h4 className="login-title text-center py-2 mb-4">Login</h4>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="text-end mb-4">Forgot Password?</div>
            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn btn-primary rounded-3"
              >
                Login
              </button>
            </div>
            <div className="text-end mb-4">New User?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
