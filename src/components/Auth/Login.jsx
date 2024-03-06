import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useUser } from "../Context/user_context";
import FormField from "../Shared/FormField";
import { useSigninUserMutation } from "../../redux/Services/api_service";

import {
  getEmailValidationRules,
  getPasswordValidationRules,
} from "../utils/validators";

const Login = () => {
  const { userDetails, saveUserDetails } = useUser();
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
      console.log("Sign in successful", response);

      // save auth token to local storage
      await localStorage.setItem("jsonwebtoken", response.token);

      saveUserDetails(data);
    } catch (error) {
      console.error("Signin error", error);
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
    <div className="container min-vh-100 d-flex align-items-centera justify-content-center">
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
                Login
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
  );
};

export default Login;
