import React from "react";
import "./Style.css";
import PlaylistCard from "../UI/PlaylistCard";
import { useFetchPublicPlaylist } from "../Hooks/query-hook";

const PublicPlaylist = () => {
  const { data, isLoading } = useFetchPublicPlaylist();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div style={{ color: "rgba(255, 255, 255, 0.1)" }}>
        <div className="row">
          {data.map((audio) => (
            <PlaylistCard
              key={audio.id}
              title={audio.title}
              artist={audio.owner_name}
              totalSong={audio.song_count}
              imageUrl="https://www.gstatic.com/youtube/media/ytm/images/pbg/playlist-empty-state-@576.png"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPlaylist;
