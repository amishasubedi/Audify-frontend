import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "../UI/FormField";
import catchAsyncError from "../utils/AsyncErrors";

import {
  getEmailValidationRules,
  getPasswordValidationRules,
} from "../utils/validators";
import {
  updateLoggedInState,
  updateProfile,
} from "../../redux/Features/user_slice";
import { useDispatch } from "react-redux";
import AuthLayout from "./AuthLayout";
import { updateAlert } from "../../redux/Features/alert_slice";
import getClient from "../utils/client";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const client = await getClient();
      await client.patch("/users/update-password", data);
      reset();
      navigate("/");
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    } finally {
      setIsLoading(false);
    }
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
              <h4 className="login-title text-white  py-2 mb-4">
                Reset Password
              </h4>
              <FormField
                id="email"
                label="Email"
                type="email"
                register={register}
                required
                errors={errors}
              />

              <FormField
                id="Password"
                label="New Password"
                type="password"
                register={register}
                required
                errors={errors}
              />

              <div className="d-flex justify-content-between mb-4 link">
                <Link to="/sign-up">Sign up</Link>
                <Link to="/">Sign in</Link>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 text-white rounded-3"
                >
                  {isLoading ? "Resetting Password..." : "Reset"}
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
