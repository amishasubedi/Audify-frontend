import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Home from "./components/Home/Home";
import ErrorPage from "./components/utils/error_page";
import Layout from "./components/Home/Layout";
import Player from "./components/Audio/player";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="error-page" element={<ErrorPage />} />
          <Route path="home" element={<Home />} />
          <Route path="player" element={<Player />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
