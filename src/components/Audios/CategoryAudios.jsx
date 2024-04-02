import React from "react";
import AudioCard from "../UI/AudioCard";
import { useFetchAudiosByCategory } from "../Hooks/query-hook";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";

const CategoryAudios = ({ onAudioClick, categoryName }) => {
  const { data, isLoading } = useFetchAudiosByCategory(categoryName);
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data && data.length === 0) {
    return (
      <div className="text-white">{`No songs found for the category ${categoryName}.`}</div>
    );
  }

  return (
    <div className="container-fluid" style={{ padding: "1rem" }}>
      <div className="row g-3">
        {data &&
          data.map((audio) => (
            <div className="col-md-4" key={audio.id}>
              <AudioCard
                title={audio.title}
                artist={audio.owner.name}
                imageUrl={audio.poster}
                audioUrl={audio.file}
                onClick={() => onAudioClick(audio, data)}
                playing={audio.id === onGoingAudio?.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryAudios;
