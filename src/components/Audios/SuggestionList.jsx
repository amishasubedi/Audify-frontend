import React from "react";
import { useSelector } from "react-redux";
import { useFetchRecommendation } from "../Hooks/query-hook";
import { getPlayerState } from "../../redux/Features/player_slice";
import AudioListCard from "../UI/AudioListCard";
import useFavorite from "../Hooks/useAPI";
import "./Style.css";

const SuggestionsList = ({ onAudioClick, onAddToPlaylistClick }) => {
  const { data, isLoading, refetch } = useFetchRecommendation();
  const { onGoingAudio } = useSelector(getPlayerState);
  const { onAddToFavorite } = useFavorite();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleAddToFavorite = async (audioId) => {
    await onAddToFavorite(audioId);
  };

  return (
    <div>
      <h3 className="text-white fw-bold mb-4 px-2">Suggestions</h3>
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
              onClick={() => onAudioClick(audio, data)}
              onAddToPlaylistClick={() => onAddToPlaylistClick(audio.id)}
              onAddToFavoriteClick={() => handleAddToFavorite(audio.id)}
              playing={audio.id === onGoingAudio?.id}
            />
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3" onClick={() => refetch()}>
        Refresh
      </button>
    </div>
  );
};

export default SuggestionsList;
