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
import { getPlayerState } from "../../redux/Features/player_slice";
import AudioPlayer from "../Audios/AudioPlayer";

const Profile = () => {
  const user = useSelector((state) => state.auth.profile);
  const { onAudioPress } = useAudioPlayback();
  const [showModal, setShowModal] = useState(false);

  const { data: userProfile } = useFetchProfileById(user.id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { onGoingAudio } = useSelector(getPlayerState);

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
          <PersonalUploads onAudioClick={onAudioPress} />
          <div className="audio-player-spacer"></div>{" "}
          {/* This is the new spacer div */}
        </main>

        <div>{onGoingAudio ? <AudioPlayer /> : null}</div>

        <EditProfileModal
          onSubmit={handleEdit}
          visible={showModal}
          initialValue={initialFormValues}
          onRequestClose={() => {
            setShowModal(false);
          }}
        />
      </Layout>
    </div>
  );
};

export default Profile;
