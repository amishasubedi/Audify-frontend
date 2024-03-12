import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "../Shared/FormField";
import { useSigninUserMutation } from "../../redux/Services/api_service";
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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const [SigninUser, { isLoading, isSuccess, isError }] =
    useSigninUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await SigninUser(data).unwrap();

      console.log(
        "Dispatching updateProfile and updateLoggedInState actions",
        response.profile
      );
      dispatch(updateProfile(response.profile));
      dispatch(updateLoggedInState(true));

      await localStorage.setItem("jsonwebtoken", response.token);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
    reset();
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }

    if (isError) {
      alert("Some thing went wrong, Please try again");
      reset();
    }
  }, [isSuccess, isError, navigate, isLoading, reset]);

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
              <h4 className="login-title text-white  py-2 mb-4">Login</h4>
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
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="text-end mb-4 link">
                <Link to="/sign-up">New User?</Link>
              </div>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
