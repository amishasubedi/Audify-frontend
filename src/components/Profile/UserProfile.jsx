import React from "react";
import { useParams } from "react-router-dom";
import { useFetchProfileById } from "../Hooks/query-hook";
import ProfileContainer from "../UI/ProfileContainer";
import Layout from "../Home/Layout";
import Header from "../Home/Header";

const UserProfile = () => {
  const { userId } = useParams();
  const { data, isLoading, error } = useFetchProfileById(userId);

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
          avatar={data.avatar}
          name={data.name}
          email={data.email}
          followers={data.followers}
          followings={data.followings}
          verified={data.verified}
        />
      </div>
    </Layout>
  );
};

export default UserProfile;
