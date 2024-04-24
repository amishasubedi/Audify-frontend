import React from "react";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";
import Header from "../Home/Header";
import Layout from "../Home/Layout";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import PersonalFavorite from "../Profile/PersonalFavorite";
import "./Style.css";

const FavoriteAudios = () => {
  const { onAudioPress } = useAudioPlayback();

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
