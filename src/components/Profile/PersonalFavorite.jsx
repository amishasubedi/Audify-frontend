import { updateAlert } from "../../redux/Features/alert_slice";
import { useFetchPersonalFavorites } from "../Hooks/query-hook";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import { getPlayerState } from "../../redux/Features/player_slice";
import { useSelector } from "react-redux";
import FavoritePlayerCard from "../UI/FavoritePlayerCard";

const PersonalFavorite = ({ onAudioClick }) => {
  const { onRemoveFromFavorite } = useAudioPlayback();
  const { data, isLoading, error } = useFetchPersonalFavorites();
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    updateAlert({ message: "Fetching favorite error", type: "error" });
  }

  const handleRemoveFromFavorite = async (audioId) => {
    await onRemoveFromFavorite(audioId);
  };

  return (
    <div>
      <div className="px-5">
        <h3 className="text-white fw-bold mb-4 px-5">My Favorites</h3>
        <table className="playlist-table">
          <tbody>
            {data.map((audio) => (
              <FavoritePlayerCard
                key={audio.id}
                title={audio.title}
                artistId={audio.owner.id}
                audioId={audio.id}
                artist={audio.owner.name}
                imageUrl={audio.poster}
                category={audio.category}
                duration={audio.duration}
                onClick={() => onAudioClick(audio, data)}
                onRemove={() => handleRemoveFromFavorite(audio.id)}
                playing={audio.id === onGoingAudio?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalFavorite;