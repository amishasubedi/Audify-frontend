import { useFetchAudiosByPlaylist } from "../Hooks/query-hook";
import { useDispatch, useSelector } from "react-redux";
import getClient from "../utils/client";
import { updateAlert } from "../../redux/Features/alert_slice";
import { useQueryClient } from "react-query";
import catchAsyncError from "../utils/AsyncErrors";
import { getPlayerState } from "../../redux/Features/player_slice";
import FavoritePlayerCard from "../UI/FavoritePlayerCard";
import useFavorite from "../Hooks/useAPI";

const AudioList = ({ playlistName, onAudioClick, playlistId, isPublic }) => {
  const { data, isLoading, error } = useFetchAudiosByPlaylist(playlistId);
  const { onGoingAudio } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { onAddToFavorite } = useFavorite();

  const handlAddToFavorite = async (audioId) => {
    await onAddToFavorite(audioId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching audios: {error.message}</div>;
  }

  const onRemoveFromPlaylist = async (audioId) => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);
      formData.append("playlistId", playlistId);

      const client = await getClient();
      await client.post("/playlist/remove", formData);

      queryClient.invalidateQueries("playlist-audios");
      queryClient.invalidateQueries("playlist-details");

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

  const handleRemoveFromPlaylist = async (audioId) => {
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
            <FavoritePlayerCard
              key={audio.id}
              title={audio.title}
              artistId={audio.owner.id}
              artist={audio.owner.name}
              imageUrl={audio.poster}
              category={audio.category}
              duration={audio.duration}
              isPublic={isPublic}
              onAddToFavoriteClick={() => handlAddToFavorite(audio.id)}
              onClick={() => onAudioClick(audio, data)}
              onRemove={() => handleRemoveFromPlaylist(audio.id)}
              playing={audio.id === onGoingAudio?.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioList;
