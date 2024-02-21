import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "../Shared/FormField";

import {
  getEmailValidationRules,
  getPasswordValidationRules,
} from "../utils/validators";

const Login = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

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
          <form
            className="py-5 px-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h4 className="login-title text-center py-2 mb-4">Login</h4>
            <FormField
              id="email"
              label="Email"
              type="email"
              register={register}
              registerOptions={getEmailValidationRules()}
              errors={errors}
            />
            <FormField
              id="password"
              label="Password"
              type="password"
              register={register}
              registerOptions={getPasswordValidationRules()}
              errors={errors}
            />
            <div className="text-end mb-4">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn btn-primary rounded-3"
              >
                Login
              </button>
            </div>
            <div className="text-end mb-4">
              <Link to="/sign-up">New User?</Link>
            </div>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Login;
