import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import "./Style.css";
import PersonalUploads from "./PersonalUploads";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import ProfileContainer from "../UI/ProfileContainer";
import getClient from "../utils/client";
import { useFetchProfileById } from "../Hooks/query-hook";
import EditProfileModal from "./EditProfileModal";
import { useDispatch } from "react-redux";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";
import { useQueryClient } from "react-query";

const Profile = () => {
  const user = useSelector((state) => state.auth.profile);
  const { onAudioPress } = useAudioPlayback();
  const [showModal, setShowModal] = useState(false);

  const { data: userProfile } = useFetchProfileById(user.id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  const handleonEditProfileClick = () => {
    setShowModal(true);
  };

  const handleEdit = async (data) => {
    try {
      const client = await getClient();
      await client.post("/users/check", data);

      queryClient.invalidateQueries("profile-details");

      dispatch(updateAlert({ message: "Saved changes", type: "success" }));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
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
        OnAddPictureClick={handleonEditProfileClick}
        isOwnProfile={true}
      />

      <main className="px-5">
        <PersonalUploads onAudioClick={onAudioPress} />
      </main>

      <EditProfileModal
        onSubmit={handleEdit}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      />
    </Layout>
  );
};

export default Profile;
