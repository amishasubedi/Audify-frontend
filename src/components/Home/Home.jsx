import React from "react";
import { PlayerProvider } from "../Context/player-context";
import Categories from "./Categories";
import Header from "./Header";
import "./Style.css";
import Layout from "./Layout";
import LatestUploads from "../Audios/LatestUploads";

const Home = () => {
  return (
    <Layout>
      <PlayerProvider>
        <Header />
        <div className="row">
          <div className="col-8 px-1">
            <Categories />
          </div>
          <div className="col-8 px-5">
            <h3 className="text-white px-5 mt-5">Latest Uploads...</h3>
            <LatestUploads />
          </div>
        </div>
      </PlayerProvider>
    </Layout>
  );
};

export default Home;
