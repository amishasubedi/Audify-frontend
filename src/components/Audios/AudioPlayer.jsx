import { useState } from "react";
import AudioPlayerCard from "../UI/AudioPlayerCard";
import { useSelector, useDispatch } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";
import OptionModal from "../UI/OptionModal";
import { useFetchPersonalPlaylist } from "../Hooks/query-hook";
import { updateAlert } from "../../redux/Features/alert_slice";
import useFavorite from "../Hooks/useAPI";
import catchAsyncError from "../utils/AsyncErrors";

const AudioPlayer = () => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const { data } = useFetchPersonalPlaylist();
  const dispatch = useDispatch();

  const { addSongToPlaylist } = useFavorite();

  const { onGoingAudio } = useSelector(getPlayerState);

  const handleonSaveToPlaylistClick = () => {
    if (data.length === 0) {
      dispatch(
        updateAlert({
          message: "Please create a playlist first",
          type: "error",
        })
      );
    }
    setShowOptionsModal(!showOptionsModal);
  };

  const handleOnAddToPlaylist = async (playlistId) => {
    try {
      const selectedPlaylist = data.find(
        (playlist) => playlist.id === playlistId
      );
      const playlistName = selectedPlaylist
        ? selectedPlaylist.title
        : "the selected playlist";

      await addSongToPlaylist(onGoingAudio.id, playlistId);
      setShowOptionsModal(false);
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

  const renderPlaylistOption = (playlist) => <span>{playlist.title}</span>;

  return (
    <>
      <AudioPlayerCard
        title={onGoingAudio.title}
        artist={onGoingAudio.artist}
        imageUrl={onGoingAudio.artwork}
        audioId={onGoingAudio.id}
        playing={onGoingAudio ? true : false}
        onClick={() => {
          console.log("Load ongoing list in modal later");
        }}
        onSaveToPlaylist={handleonSaveToPlaylistClick}
      />

      <OptionModal
        show={showOptionsModal}
        onHide={() => setShowOptionsModal(false)}
        options={data}
        onOptionClick={handleOnAddToPlaylist}
        renderOption={renderPlaylistOption}
      />
    </>
  );
};

export default AudioPlayer;
