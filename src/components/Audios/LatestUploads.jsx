import React, { useEffect } from "react";
import AudioCard from "../Shared/AudioCard";
import { useFetchLatestAudios } from "../Hooks/query-hook";

const LatestUploads = () => {
  const { data, isLoading } = useFetchLatestAudios();
  console.log(data);

  if (isLoading)
    return (
      <div>
        <h2 className="color-white">Loading...</h2>
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        {data.map((audio) => (
          <div class="col" key={audio.id}>
            <div className="card bg-transparent border-0 p-0">
              <AudioCard
                title={audio.title}
                artist={audio.artist}
                imageUrl={audio.poster}
                audioUrl={audio.file}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestUploads;
