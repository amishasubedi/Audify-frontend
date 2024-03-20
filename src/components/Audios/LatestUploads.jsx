import React, { useEffect } from "react";
import AudioCard from "../UI/AudioCard";
import { useFetchLatestAudios } from "../Hooks/query-hook";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";

const LatestUploads = ({ onAudioClick }) => {
  const { data, isLoading } = useFetchLatestAudios();
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return (
      <div>
        <h2 className="text-white">Loading...</h2>{" "}
      </div>
    );
  }

  return (
    <div
      className="container-fluid"
      style={{ border: "1px solid #000", padding: "1rem" }}
    >
      <div style={{ color: "rgba(255, 255, 255, 0.1)" }}>
        <div className="row g-3">
          {data.map((audio) => (
            <div className="col-md-4" key={audio.id}>
              {" "}
              <AudioCard
                title={audio.title}
                artist={audio.artist}
                imageUrl={audio.poster}
                audioUrl={audio.file}
                onClick={() => onAudioClick(audio, data)}
                playing={audio.id === onGoingAudio?.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestUploads;
