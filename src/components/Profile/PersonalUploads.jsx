import { useSelector } from "react-redux";
import { useFetchPersonalUploads } from "../Hooks/query-hook";
import AudioListCard from "../UI/AudioListCard";
import { getPlayerState } from "../../redux/Features/player_slice";
import useFavorite from "../Hooks/useAPI";

const PersonalUploads = ({ onAudioClick, onSaveToPlaylist }) => {
  const { data, isLoading } = useFetchPersonalUploads();
  const { onGoingAudio } = useSelector(getPlayerState);

  const { onAddToFavorite } = useFavorite();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToFavorite = async (audioid) => {
    await onAddToFavorite(audioid);
  };

  return (
    <div>
      <div className="px-5 mt-5">
        <h3 className="text-white fw-bold mt-4">Songs</h3>
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
                onAddToFavoriteClick={() => handleAddToFavorite}
                onClick={() => onAudioClick(audio, data)}
                playing={audio.id === onGoingAudio?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PersonalUploads;
