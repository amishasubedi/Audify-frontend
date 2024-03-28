import React from "react";
import { useSelector } from "react-redux";
import { useFetchRecommendation } from "../Hooks/query-hook";
import SuggestionListCard from "../UI/SuggestionListCard";
import { getPlayerState } from "../../redux/Features/player_slice";

const SuggestionsList = ({ onAudioClick }) => {
  const { data, isLoading, refetch } = useFetchRecommendation();
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-white fw-bold mb-4 px-2">Suggestions</h3>
      <div className="list-group list-group-vertical">
        {data.map((audio) => (
          <SuggestionListCard
            key={audio.id}
            title={audio.title}
            artist={audio.owner.name}
            imageUrl={audio.poster}
            category={audio.category}
            onClick={() => onAudioClick(audio, data)}
            playing={audio.id === onGoingAudio?.id}
          />
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => refetch()}>
        Refresh
      </button>
    </div>
  );
};

export default SuggestionsList;
