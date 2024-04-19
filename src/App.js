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
import CategoryAudioPage from "./components/Home/CategoryAudioPage";
import PlaylistDetail from "./components/Playlist/PlaylistDetail";
import Notification from "./components/UI/Notification";
import UserProfile from "./components/Profile/UserProfile";
import FavoriteAudios from "./components/Audios/FavoriteAudios";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Notification />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />

            <Route
              path="/category/:categoryName"
              element={<CategoryAudioPage />}
            />
            <Route path="/upload" element={<UploadAudio />} />
            <Route path="/artists/:userId" element={<UserProfile />} />
            <Route path="/favorites" element={<FavoriteAudios />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/playlists/:id" element={<PlaylistDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
