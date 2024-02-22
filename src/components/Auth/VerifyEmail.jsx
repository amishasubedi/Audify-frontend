import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const VerifyEmail = () => {
  const initialOtpState = Array(6).fill("");
  const [otp, setOtp] = useState(initialOtpState);
  const otpInputRefs = useRef([]);

  const focusNextInputField = (index) => {
    if (index < 5) {
      otpInputRefs.current[index + 1].focus();
    }

    // for backspace - not working rn
    if (index > 5) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      focusNextInputField(index);
    }

    // backspace not working, fix it later
    if (value === "backspace" && index > 5) {
      focusNextInputField(index);
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text/plain")
      .slice(0, 6)
      .split("");

    if (pastedData.length === 6) {
      setOtp(pastedData);
      otpInputRefs.current[5].focus();
    }
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
          <form className="py-5 px-4">
            <h4 className="login-title text-center py-2 mb-4">Verify Email</h4>
            <p>Your code was sent to you via email</p>
            <div className="otp-field mb-4" onPaste={handleOtpPaste}>
              {initialOtpState.map((_, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength="1"
                  className="otp-input"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  ref={(el) => (otpInputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="login-btn btn btn-primary rounded-3"
              >
                Verify
              </button>
            </div>
            <div className="text-end mb-4">
              <Link to="/verify-email">Request Again?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
