import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Home from "./components/Home/Home";
import ErrorPage from "./components/utils/error_page";
import Player from "./components/Audios/player";
import UploadAudio from "./components/Audios/UploadAudio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="error-page" element={<ErrorPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/upload" element={<UploadAudio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
