import React from "react";
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
