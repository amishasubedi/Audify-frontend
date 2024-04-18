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

const Home = () => {
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);
  return (
    <Layout>
      <Header />
      <div className="row">
        <div className="col-8 px-1">
          <Categories />
        </div>
        <div className="px-5">
          <div className="px-5 mt-5">
            <h9 className="text-secondary fw-bold">
              START RADIO BASED ON A SONG
            </h9>
            <h1 className="text-white fw-bold px-1">Quick Picks</h1>
          </div>

          <div className="px-5 bg-transparent">
            {" "}
            <LatestUploads onAudioClick={onAudioPress} />
          </div>
        </div>
        <div className="px-5">
          <div className="px-5 mt-5">
            <h9 className="text-secondary fw-bold">FOR YOU</h9>
            <h1 className="text-white fw-bold px-1">Community Playlists</h1>
          </div>
          <div className="px-5 bg-transparent">
            {" "}
            <PublicPlaylist />
          </div>
        </div>
        <div className="px-5">
          <div className="px-5 mt-5">
            <h9 className="text-secondary fw-bold">EXPLORE MORE ARTISTS</h9>
            <h1 className="text-white fw-bold px-1">Recommended Artists</h1>
          </div>
          <div className="px-5 bg-transparent">
            {" "}
            <PublicPlaylist />
          </div>
        </div>
      </div>
      <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
    </Layout>
  );
};

export default Home;
