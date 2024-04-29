import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateAlert } from "../../redux/Features/alert_slice";
import { getAuthState } from "../../redux/Features/user_slice";
import Header from "../Home/Header";
import Layout from "../Home/Layout";
import OptionModal from "../UI/OptionModal";
import {
  useFetchFollowersById,
  useFetchProfileById,
} from "../Hooks/query-hook";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import ProfileContainer from "../UI/ProfileContainer";
import catchAsyncError from "../utils/AsyncErrors";
import getClient from "../utils/client";
import PublicUploads from "./PublicUploads";

const UserProfile = () => {
  const { userId } = useParams();
  const { data: userProfile, isLoading, error } = useFetchProfileById(userId);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const { profile } = useSelector(getAuthState);
  const { onAudioPress } = useAudioPlayback();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    data: userFollowers,
    isLoading: userFollowersLoading,
    error: userFollowersError,
  } = useFetchFollowersById(userId);

  const handleonShowFollowers = () => {
    if (userFollowers.length === 0) {
      dispatch(
        updateAlert({
          message: "No Followers yet",
          type: "success",
        })
      );
    }
    setShowOptionsModal(!showOptionsModal);
  };

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

  const renderOption = (follower) => <span>{follower.name}</span>;

  return (
    <div className="pb-5">
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
          is_admin={profile?.is_admin}
          onButtonClick={handleButtonClick}
          onFollowersClick={handleonShowFollowers}
        />

        <OptionModal
          show={showOptionsModal}
          onHide={() => setShowOptionsModal(false)}
          options={userFollowers}
        />

        <main className="p-3 px-5 mt-4 mb-5">
          <PublicUploads
            onAudioClick={onAudioPress}
            name={userProfile.name}
            userId={userProfile.id}
            renderOption={renderOption}
          />
        </main>
      </Layout>
    </div>
  );
};

export default UserProfile;
