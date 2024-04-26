import React from "react";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";
import { useFetchLatestAudios } from "../Hooks/query-hook";
import AudioCard from "../UI/AudioCard";

const LatestUploads = ({ onAudioClick }) => {
  const { data, isLoading } = useFetchLatestAudios();
  const { onGoingAudio, playing } = useSelector(getPlayerState);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-white">Loading...</h2>{" "}
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div style={{ color: "rgba(255, 255, 255, 0.1)" }}>
        <div className="row g-3">
          {data.map((audio) => (
            <div className="col-md-4" key={audio.id}>
              {" "}
              <AudioCard
                key={audio.id}
                title={audio.title}
                artistId={audio.owner.id}
                artist={audio.owner.name}
                imageUrl={audio.poster}
                audioUrl={audio.file}
                category={audio.category}
                onClick={() => onAudioClick(audio, data)}
                playing={playing.playing && audio.id === onGoingAudio?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUploads;
