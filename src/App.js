import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Header from "./components/Layout/Header";
import ErrorPage from "./components/utils/error_page";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="sign-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="error-page" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
