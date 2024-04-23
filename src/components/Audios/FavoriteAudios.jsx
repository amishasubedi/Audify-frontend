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
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);

  return (
    <Layout>
      <Header />
      <main className="px-5">
        <PersonalFavorite onAudioClick={onAudioPress} />
      </main>
    </Layout>
  );
};

export default FavoriteAudios;
