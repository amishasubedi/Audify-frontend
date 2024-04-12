import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useFetchFollowersById,
  useFetchProfileById,
} from "../Hooks/query-hook";
import ProfileContainer from "../UI/ProfileContainer";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import PublicUploads from "./PublicUploads";
import getClient from "../utils/client";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState } from "../../redux/Features/user_slice";
import { useQueryClient } from "react-query";

const UserProfile = () => {
  const { userId } = useParams(); // id of user being viewed
  const { data: userProfile, isLoading, error } = useFetchProfileById(userId);

  const { profile } = useSelector(getAuthState); // my profile
  const { onAudioPress } = useAudioPlayback();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    data: userFollowers,
    isLoading: userFollowersLoading,
    error: userFollowersError,
  } = useFetchFollowersById(userId); // followers of user being viewed

  // Am i in their followers list?
  const isFollowing =
    userFollowers?.followers?.some((follower) => follower.ID === profile?.id) ??
    false;

  if (isLoading || userFollowersLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error.message}</div>;
  }

  if (userFollowersError) {
    return <div>Error fetching followers: {error.message}</div>;
  }

  const handleFollowUser = async () => {
    try {
      const client = await getClient();
      await client.post(`profile/follow/${userId}`);

      queryClient.invalidateQueries("profile-details");
      queryClient.invalidateQueries("profile-followers");

      dispatch(
        updateAlert({
          message: `You started following ${userProfile.name}`,
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const handleUnFollowUser = async () => {
    try {
      const client = await getClient();
      await client.post(`profile/unfollow/${userId}`);

      queryClient.invalidateQueries("profile-details");
      queryClient.invalidateQueries("profile-followers");
      dispatch(
        updateAlert({
          message: `You unfollowed ${userProfile.name}`,
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const handleButtonClick = () => {
    if (isFollowing) {
      handleUnFollowUser();
    } else {
      handleFollowUser();
    }
  };

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
        buttonTitle={isFollowing ? "Unfollow" : "Follow"}
        isOwnProfile={Number(userId) === profile.id}
        onButtonClick={handleButtonClick}
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
