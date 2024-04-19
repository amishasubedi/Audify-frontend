import { updateAlert } from "../../redux/Features/alert_slice";
import { useFetchPersonalFavorites } from "../Hooks/query-hook";
import { getPlayerState } from "../../redux/Features/player_slice";
import { useSelector } from "react-redux";
import FavoritePlayerCard from "../UI/FavoritePlayerCard";
import useFavorite from "../Hooks/useAPI";

const PersonalFavorite = ({ onAudioClick }) => {
  const { onRemoveFromFavorite } = useFavorite();
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

  const isPublic = false;

  return (
    <div>
      <div className="px-5 p-3">
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
                isPublic={isPublic}
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
