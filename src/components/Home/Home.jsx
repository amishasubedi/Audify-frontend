import React from "react";
import { PlayerProvider } from "../Context/player-context";
import Categories from "./Categories";
import Header from "./Header";
import "./Style.css";
import Layout from "./Layout";
import LatestUploads from "../Audios/LatestUploads";

const onAudioPressHandler = () => {
  console.log("Render info here");
};

const Home = () => {
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
              <LatestUploads onAudioPress={onAudioPressHandler} />
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
