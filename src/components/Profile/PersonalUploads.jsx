import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFetchPersonalUploads,
  useFetchPersonalPlaylist,
} from "../Hooks/query-hook";
import AudioListCard from "../UI/AudioListCard";
import { updateAlert } from "../../redux/Features/alert_slice";
import { getPlayerState } from "../../redux/Features/player_slice";
import useFavorite from "../Hooks/useAPI";
import catchAsyncError from "../utils/AsyncErrors";
import OptionModal from "../UI/OptionModal";

const PersonalUploads = ({ onAudioClick }) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useFetchPersonalUploads();
  const { data: playlist } = useFetchPersonalPlaylist();
  const { onGoingAudio, playing } = useSelector(getPlayerState);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [audioIdToAdd, setAudioIdToAdd] = useState(null);

  const { onAddToFavorite, addSongToPlaylist } = useFavorite();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToFavorite = async (audioId) => {
    await onAddToFavorite(audioId);
  };

  const handleonSaveToPlaylistClick = (audioId) => {
    if (!playlist || playlist.length === 0) {
      dispatch(
        updateAlert({
          message: "Please create a playlist first",
          type: "error",
        })
      );
    } else {
      setShowOptionsModal(true);
      setAudioIdToAdd(audioId);
    }
  };

  const handleOnAddToPlaylist = async (audioId, playlistId) => {
    try {
      await addSongToPlaylist(audioId, playlistId);
      setShowOptionsModal(false);

      const playlistName =
        playlist.find((p) => p.id === playlistId)?.title ||
        "the selected playlist";
      dispatch(
        updateAlert({
          message: `Saved to ${playlistName}`,
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(
        updateAlert({
          message: errorMessage,
          type: "error",
        })
      );
    }
  };

  return (
    <div>
      <div className="mt-0 px-5">
        <h3 className="text-white fw-bold">Songs</h3>
        <table className="playlist-table">
          <tbody>
            {data.map((audio) => (
              <AudioListCard
                key={audio.id}
                title={audio.title}
                artistId={audio.owner.id}
                artist={audio.owner.name}
                imageUrl={audio.poster}
                category={audio.category}
                duration={audio.duration}
                onAddToFavoriteClick={() => handleAddToFavorite(audio.id)}
                onClick={() => onAudioClick(audio, data)}
                playing={playing.playing && audio.id === onGoingAudio?.id}
                onAddToPlaylistClick={() =>
                  handleonSaveToPlaylistClick(audio.id)
                }
              />
            ))}

            <OptionModal
              show={showOptionsModal}
              onHide={() => setShowOptionsModal(false)}
              options={playlist}
              onOptionClick={(playlistId) =>
                handleOnAddToPlaylist(audioIdToAdd, playlistId)
              }
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalUploads;
