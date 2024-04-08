import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import "./Style.css";
import PersonalFavorite from "../Profile/PersonalFavorite";
import AudioPlayer from "./AudioPlayer";
import { getPlayerState } from "../../redux/Features/player_slice";
import useAudioPlayback from "../Hooks/useAudioPlayback";

const FavoriteAudios = () => {
  const userProfile = useSelector((state) => state.auth.profile);
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Layout>
      <Header />
      <main className=" px-2">
        <PersonalFavorite onAudioClick={onAudioPress} />
      </main>
      <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
    </Layout>
  );
};

export default FavoriteAudios;
