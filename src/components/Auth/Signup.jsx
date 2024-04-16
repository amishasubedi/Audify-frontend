import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "../UI/FormField";
import catchAsyncError from "../utils/AsyncErrors";

import {
  getEmailValidationRules,
  getPasswordValidationRules,
  getNameValidationRules,
} from "../utils/validators";
import { useDispatch } from "react-redux";
import AuthLayout from "./AuthLayout";
import { updateAlert } from "../../redux/Features/alert_slice";
import getClient from "../utils/client";

const Signup = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const client = await getClient();
      const response = await client.post("/users/sign-up", data);

      const userId = response.data.data.ID;

      dispatch(
        updateAlert({
          message: "Successfully created account",
          type: "success",
        })
      );
      reset();
      navigate("/verify-email", { state: { userId } });
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h4 className="login-title text-white py-2 mb-4">Signup</h4>
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
              <div className="text-end mb-4 link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 text-white rounded-3"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Signup"}
                </button>
              </div>
              <div className="text-end mb-4 link">
                <Link to="/">Already have an account?</Link>
              </div>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;
