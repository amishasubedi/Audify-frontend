import React from "react";
import { useParams } from "react-router-dom";
import { useFetchProfileById } from "../Hooks/query-hook";
import ProfileContainer from "../UI/ProfileContainer";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import PublicUploads from "./PublicUploads";

const UserProfile = () => {
  const { userId } = useParams();
  const { data: profileData, isLoading, error } = useFetchProfileById(userId);
  const { onAudioPress } = useAudioPlayback();

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  return (
    <Layout>
      <Header />
      <div>
        <ProfileContainer
          avatar={profileData.avatar}
          name={profileData.name}
          email={profileData.email}
          followers={profileData.followers}
          followings={profileData.followings}
          verified={profileData.verified}
        />
      </div>
      <main className="main-content">
        <PublicUploads
          onAudioClick={onAudioPress}
          name={profileData.name}
          userId={userId}
        />
      </main>
    </Layout>
  );
};

export default UserProfile;
