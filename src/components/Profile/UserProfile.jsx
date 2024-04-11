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
  const { data: userProfile, isLoading, error } = useFetchProfileById(userId);
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
      <ProfileContainer
        avatar={userProfile.avatar}
        name={userProfile.name}
        email={userProfile.email}
        followers={userProfile.followers}
        followings={userProfile.followings}
        verified={userProfile.verified}
        isOwnProfile={false}
      />

      <main className="px-2">
        <PublicUploads
          onAudioClick={onAudioPress}
          name={userProfile.name}
          userId={userProfile.id}
        />
      </main>
    </Layout>
  );
};

export default UserProfile;
