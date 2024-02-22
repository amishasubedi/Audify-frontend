import React from "react";
import "./style.css";
import useCustomForm from "../Hooks/form-hook";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../Shared/FormField";
import { DevTool } from "@hookform/devtools";

import { useSignupUserMutation } from "../../redux/Services/api_service";

import {
  getEmailValidationRules,
  getNameValidationRules,
  getPasswordValidationRules,
} from "../utils/validators";

const Signup = () => {
  const navigate = useNavigate();

  const [SignupUser, { isLoading, isSuccess, isError }] =
    useSignupUserMutation();

  const { register, handleSubmit, reset, control, errors } = useCustomForm();

  const onSubmit = async (data) => {
    try {
      const response = await SignupUser(data).unwrap();
      console.log("Signup successful", response);
    } catch (error) {
      console.error("Signup error", error);
    }
    reset();
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/verify-email");
    }
    if (isError) {
      navigate("/error-page");
    }
  }, [isSuccess, isError, navigate]);

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
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h4 className="login-title text-center py-2 mb-4">Signup</h4>
            <FormField
              id="name"
              label="Name"
              type="text"
              register={register}
              registerOptions={getNameValidationRules()}
              errors={errors}
            />
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
                disabled={isLoading}
              >
                Signup
              </button>
            </div>
            <div className="text-end mb-4">
              <Link to="/sign-in">Already have an account?</Link>
            </div>
          </form>
          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
