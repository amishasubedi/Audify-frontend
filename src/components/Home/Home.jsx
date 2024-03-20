import React from "react";
import { PlayerProvider } from "../Context/player-context";
import Categories from "./Categories";
import Header from "./Header";
import Layout from "./Layout";
import LatestUploads from "../Audios/LatestUploads";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import "./Style.css";

const Home = () => {
  const { onAudioPress } = useAudioPlayback();
  return (
    <Layout>
      <PlayerProvider>
        <Header />
        <div className="row">
          <div className="col-8 px-1">
            <Categories />
          </div>
          <div className="px-5">
            <h3 className="text-white px-5 mt-5">Latest Uploads...</h3>
            <div className="px-5 bg-transparent">
              {" "}
              <LatestUploads onAudioClick={onAudioPress} />
            </div>
            <h3 className="text-white px-5 mt-5">Latest Uploads...</h3>
            <div className="px-5 bg-transparent">
              {" "}
              <LatestUploads />
            </div>
          </div>
        </div>
      </PlayerProvider>
    </Layout>
  );
};

export default Home;
