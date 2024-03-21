import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import VerifyEmail from "./components/Auth/VerifyEmail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Home from "./components/Home/Home";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import UploadAudio from "./components/Audios/UploadAudio";
import Profile from "./components/Profile/Profile";

import AudioPlayerCard from "./components/UI/AudioPlayerCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/ui" element={<AudioPlayerCard />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/upload" element={<UploadAudio />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
