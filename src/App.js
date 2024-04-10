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

import AudioPlayerCard from "./components/UI/AudioPlayerCard";
import PlaylistDetail from "./components/Playlist/PlaylistDetail";
import SuggestionsList from "./components/Audios/SuggestionList";
import Notification from "./components/UI/Notification";

import UserProfile from "./components/Profile/UserProfile";
import FavoriteAudios from "./components/Audios/FavoriteAudios";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Notification />
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/ui" element={<AudioPlayerCard />} />
          <Route
            path="/category/:categoryName"
            element={<CategoryAudioPage />}
          />
          <Route path="/songs" element={<SuggestionsList />} />
          {/* 
          <Route element={<PrivateRoutes />}> */}
          <Route path="/upload" element={<UploadAudio />} />
          <Route path="/artists/:userId" element={<UserProfile />} />
          <Route path="/favorites" element={<FavoriteAudios />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
