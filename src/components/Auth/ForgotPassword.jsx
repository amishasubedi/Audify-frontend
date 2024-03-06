import React from "react";
import { Link } from "react-router-dom";
import FormField from "../Shared/FormField";
import { getEmailValidationRules } from "../utils/validators";
import { useForm } from "react-hook-form";
import "./style.css";
import AuthLayout from "./AuthLayout";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  return (
    <AuthLayout>
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
              <h4 className="login-title text-center py-2 mb-4 text-white">
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

              <div className="d-flex justify-content-between mb-4 link">
                <Link to="/sign-up">Sign up</Link>
                <Link to="/sign-in">Sign in</Link>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 text-white rounded-3"
                >
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
