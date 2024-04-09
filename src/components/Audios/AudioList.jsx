import { useFetchAudiosByPlaylist } from "../Hooks/query-hook";
import { useDispatch, useSelector } from "react-redux";
import getClient from "../utils/client";
import { updateAlert } from "../../redux/Features/alert_slice";
import { queryClient } from "react-query";
import catchAsyncError from "../utils/AsyncErrors";
import { getPlayerState } from "../../redux/Features/player_slice";
import PlaylistAudioCard from "../UI/PlaylistAudioCard";

const AudioList = ({ playlistName, onAudioClick, playlistId, audioId }) => {
  const { data, isLoading, error } = useFetchAudiosByPlaylist(playlistId);
  const { onGoingAudio } = useSelector(getPlayerState);
  const dispatch = useDispatch();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching audios : {error.message}</div>;
  }

  const onRemoveFromPlaylist = async () => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);
      formData.append("playlistId", playlistId);

      const client = await getClient();
      await client.post("/playlist/remove", formData);

      queryClient.setQueryData(["playlist-audios", playlistId], (oldData) => {
        return {
          ...oldData,
          audios: oldData.audios.filter((audio) => audio.id !== audioId),
        };
      });

      dispatch(
        updateAlert({
          message: "Removed song from playlist",
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const handleAudioRemove = async () => {
    await onRemoveFromPlaylist(audioId);
  };

  return (
    <div>
      <h3 className="text-white mb-2 mt-2  px-2">
        Audio/s in playlist {playlistName}
      </h3>
      <table className="playlist-table">
        <tbody>
          {data.map((audio) => (
            <PlaylistAudioCard
              key={audio.id}
              title={audio.title}
              artistId={audio.owner.id}
              artist={audio.owner.name}
              imageUrl={audio.poster}
              category={audio.category}
              duration={audio.duration}
              onClick={() => onAudioClick(audio, data)}
              onRemove={handleAudioRemove}
              playing={audio.id === onGoingAudio?.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioList;
