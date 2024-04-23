import React from "react";
import Categories from "./Categories";
import Header from "./Header";
import Layout from "./Layout";
import LatestUploads from "../Audios/LatestUploads";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import "./Style.css";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";
import AudioPlayer from "../Audios/AudioPlayer";
import PublicPlaylist from "../Playlist/PublicPlaylist";
import ProfileCard from "../UI/ArtistCard";
import { getAuthState } from "../../redux/Features/user_slice";
import RecommendedProfile from "../Profile/RecommendedProfile";

const Home = () => {
  const { onAudioPress } = useAudioPlayback();
  const { profile } = useSelector(getAuthState);

  const isAdmin = profile.name === "Admin";

  return (
    <Layout>
      <Header />
      {isAdmin && (
        <div className="px-5">
          <h2 className="text-white px-5">ADMIN PORTAL</h2>
          <h2>User Profiles</h2>
          <ProfileCard />
        </div>
      )}
      {!isAdmin && (
        <>
          <div className="row p-1">
            <div className="col-8 px-1">
              <Categories />
            </div>
            <div className="px-5">
              <div className="px-5 mt-5">
                <p className="text-secondary fw-bold">
                  START RADIO BASED ON A SONG
                </p>
                <h1 className="text-white fw-bold px-1">Quick Picks</h1>
              </div>

              <div className="px-5 bg-transparent">
                {" "}
                <LatestUploads onAudioClick={onAudioPress} />
              </div>
            </div>
            <div className="px-5">
              <div className="px-5 mt-5">
                <p className="text-secondary fw-bold">FOR YOU</p>
                <h1 className="text-white fw-bold px-1">Community Playlists</h1>
              </div>
              <div className="px-5 bg-transparent">
                {" "}
                <PublicPlaylist />
              </div>
            </div>
            <div className="px-5">
              <div className="px-5 mt-5">
                <p className="text-secondary fw-bold">EXPLORE MORE ARTISTS</p>
                <h1 className="text-white fw-bold px-1 mb-4">
                  Recommended Artists
                </h1>
              </div>
              <div className="px-5 bg-transparent">
                {" "}
                <RecommendedProfile />
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Home;
