import React from "react";
import { useSelector } from "react-redux";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import "./Style.css";
import PersonalUploads from "./PersonalUploads";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import ProfileContainer from "../UI/ProfileContainer";

const Profile = () => {
  const userProfile = useSelector((state) => state.auth.profile);
  const { onAudioPress } = useAudioPlayback();

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <Layout>
      <Header />
      <ProfileContainer
        avatar={userProfile.avatar}
        name={userProfile.name}
        email={userProfile.email}
        followers={userProfile.followers}
        followings={userProfile.followings}
        verified={userProfile.verified}
      />
      <main className="main-content">
        <PersonalUploads onAudioClick={onAudioPress} />
      </main>
    </Layout>
  );
};

export default Profile;
