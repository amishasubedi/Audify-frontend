import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getEmailValidationRules } from "../utils/validators";
import { useForm } from "react-hook-form";
import "./style.css";
import AuthLayout from "./AuthLayout";
import getClient from "../utils/client";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { userId } = location.state || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const initialOtpState = Array(6).fill("");
  const [otp, setOtp] = useState(initialOtpState);
  const otpInputRefs = useRef([]);

  const focusNextInputField = (index, backspace = false) => {
    if (backspace) {
      if (index > 0) {
        otpInputRefs.current[index - 1].focus();
      }
    } else {
      if (index < 5) {
        otpInputRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      focusNextInputField(index);
    }

    // Check if the value is empty to determine if backspace was used
    if (value === "" && index > 0) {
      focusNextInputField(index, true);
    }
  };

  const handleOtpPaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData("text/plain")
      .slice(0, 6)
      .split("");

    if (pastedData.length === 6) {
      setOtp(pastedData);
      otpInputRefs.current.forEach((inputRef, idx) => {
        if (inputRef && pastedData[idx] !== undefined) {
          inputRef.value = pastedData[idx];
          if (idx === 5) {
            inputRef.focus();
          }
        }
      });
    }
  };

  const onSubmit = async () => {
    setIsLoading(true);

    const otpToken = otp.join("");
    const userInfo = {
      token: otpToken,
      userId: userId,
    };

    try {
      const client = await getClient();
      await client.post("/users/verify", userInfo);

      dispatch(
        updateAlert({ message: "Email successfully verified", type: "success" })
      );

      navigate("/home");
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    } finally {
      setIsLoading(false);
      reset();
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
            <form className="py-5 px-4" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="login-title text-center py-2 mb-4 text-white">
                Verify Email
              </h4>
              <p className="text-white">Your code was sent to you via email</p>
              <div className="otp-field mb-4" onPaste={handleOtpPaste}>
                {initialOtpState.map((_, index) => (
                  <input
                    key={index}
                    type="number"
                    maxLength="1"
                    className="otp-input"
                    value={otp[index]}
                    register={register}
                    registerOptions={getEmailValidationRules}
                    errors={errors}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                  />
                ))}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 rounded-3 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying user..." : "Verify"}
                </button>
              </div>
              <div className="text-end mb-4 link">
                <Link to="/verify-email">Request Again?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
