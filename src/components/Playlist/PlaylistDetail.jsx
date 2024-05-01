import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateAlert } from "../../redux/Features/alert_slice";
import { getAuthState } from "../../redux/Features/user_slice";
import AudioList from "../Audios/AudioList";
import SuggestionsList from "../Audios/SuggestionList";
import Header from "../Home/Header";
import Layout from "../Home/Layout";
import { useFetchPlaylistDetail } from "../Hooks/query-hook";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import PlaylistDetailCard from "../UI/PlaylistDetailCard";
import catchAsyncError from "../utils/AsyncErrors";
import getClient from "../utils/client";
import EditPlaylistModal from "./EditPlaylistModal";

const PlaylistDetail = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { onAudioPress } = useAudioPlayback();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { profile } = useSelector(getAuthState);

  const handleOnEditPlaylist = () => {
    setShowModal(true);
  };

  const { data, isLoading, error } = useFetchPlaylistDetail(id);

  const isPlaylistOwnedByUser = (playlistOwnerId) => {
    return profile && profile.id === playlistOwnerId;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching playlist details: {error.message}</div>;
  }

  const onAddToPlaylist = async (audioId) => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);
      formData.append("playlistId", Number(id));

      const client = await getClient();
      await client.post("/playlist/add", formData);

      queryClient.invalidateQueries("playlist-audios");
      queryClient.invalidateQueries("playlist-details");

      dispatch(
        updateAlert({
          message: "Added new song to playlist",
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const handleEditPlaylist = async (formData) => {
    try {
      const payload = {
        id: Number(id),
        title: formData.title,
        visibility: formData.visibility,
      };

      const client = await getClient();
      await client.patch(`/playlist/update-playlist`, payload);
      console.log("form data", payload);

      queryClient.invalidateQueries("playlist-details");

      dispatch(
        updateAlert({
          message: "Playlist updated successfully",
          type: "success",
        })
      );

      setShowModal(false);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  return (
    <Layout>
      <Header />
      <div className="container px-5">
        <div className="px-5">
          <PlaylistDetailCard
            playlistName={data.title}
            visibility={data.visibility}
            count={data.song_count}
            artist={data.owner_name}
            coverURL={data.coverurl}
            isPublic={!isPlaylistOwnedByUser(data.owner_id)}
            onEditPlaylistClick={() => handleOnEditPlaylist()}
          />
          {data.song_count === 0 ? (
            <>
              <p className="px-5 text-white col-xs-6">Nothing saved yet</p>
            </>
          ) : (
            <>
              <AudioList
                onAudioClick={onAudioPress}
                playlistId={id}
                playlistName={data.title}
                isPublic={!isPlaylistOwnedByUser(data.owner_id)}
              />
            </>
          )}
          {!data.is_public && isPlaylistOwnedByUser(data.owner_id) && (
            <SuggestionsList
              onAudioClick={onAudioPress}
              onAddToPlaylistClick={onAddToPlaylist}
            />
          )}
        </div>
      </div>

      <EditPlaylistModal
        visible={showModal}
        initialValue={{
          title: data.title,
          visibility: data.visibility,
        }}
        onRequestClose={() => setShowModal(false)}
        onUpdate={handleEditPlaylist}
      />
    </Layout>
  );
};

export default PlaylistDetail;
