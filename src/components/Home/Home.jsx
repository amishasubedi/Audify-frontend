import React from "react";
import { PlayerProvider } from "../Context/player-context";
import Categories from "./Categories";
import Audio from "../Audios/Audio";
import Header from "./Header";
import "./Style.css";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import { getAuthState } from "../../redux/Features/user_slice";
import Login from "../Auth/Login";

const Home = () => {
  const { loggedIn } = useSelector(getAuthState);
  console.log("Checking the logged in status", loggedIn);
  return loggedIn ? (
    <Layout>
      <PlayerProvider>
        <Header />
        <div className="row">
          <div className="col-8 px-1">
            <Categories />
          </div>
          <div className="col-8 px-3">
            <Audio />
          </div>
        </div>
      </PlayerProvider>
    </Layout>
  ) : (
    <Login />
  );
};

export default Home;
