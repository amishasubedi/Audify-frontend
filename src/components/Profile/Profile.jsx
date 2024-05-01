import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../redux/Features/alert_slice";
import Header from "../Home/Header";
import Layout from "../Home/Layout";
import { useFetchProfileById } from "../Hooks/query-hook";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import ProfileContainer from "../UI/ProfileContainer";
import catchAsyncError from "../utils/AsyncErrors";
import getClient from "../utils/client";
import EditProfileModal from "./EditProfileModal";
import PersonalUploads from "./PersonalUploads";
import "./Style.css";
import useFavorite from "../Hooks/useAPI";

const Profile = () => {
  const user = useSelector((state) => state.auth.profile);
  const { onAudioPress } = useAudioPlayback();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data: userProfile } = useFetchProfileById(user.id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { onAddToFavorite } = useFavorite();

  const handleAddToFavorite = async (audioid) => {
    await onAddToFavorite(audioid);
  };

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  const handleonEditProfileClick = () => {
    setShowModal(true);
  };

  const handleEdit = async (data) => {
    try {
      setIsLoading(true);
      const client = await getClient();
      await client.patch("/users/check", data);

      queryClient.invalidateQueries("profile-details");
      dispatch(updateAlert({ message: "Saved changes", type: "success" }));
      setIsLoading(false);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const initialFormValues = {
    name: userProfile.name,
    bio: userProfile.bio,
    avatarURL: userProfile.avatar,
  };

  return (
    <div className="pb-5">
      <Layout>
        <Header />

        <ProfileContainer
          avatar={userProfile.avatar}
          name={userProfile.name}
          email={userProfile.email}
          bio={userProfile.bio}
          followers={userProfile.followers}
          followings={userProfile.followings}
          verified={userProfile.verified}
          OnAddPictureClick={handleonEditProfileClick}
          isOwnProfile={true}
        />

        <main className="p-3 px-5 mt-4 mb-5">
          <PersonalUploads
            onAudioClick={onAudioPress}
            onAddToFavoriteClick={handleAddToFavorite}
          />
          <div className="audio-player-spacer"></div>{" "}
        </main>

        <EditProfileModal
          onSubmit={handleEdit}
          visible={showModal}
          initialValue={initialFormValues}
          onRequestClose={() => {
            setShowModal(false);
          }}
          isLoading={isLoading}
        />
      </Layout>
    </div>
  );
};

export default Profile;
