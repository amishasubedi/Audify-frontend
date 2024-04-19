import React from "react";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "../UI/PlaylistCard";
import { useFetchPublicPlaylist } from "../Hooks/query-hook";

const PublicPlaylist = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchPublicPlaylist();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (playlistId) => {
    navigate(`/playlists/${playlistId}`);
  };

  return (
    <div className="container-fluid">
      <div style={{ color: "rgba(255, 255, 255, 0.1)" }}>
        <div className="row">
          {data.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              title={playlist.title}
              artist={playlist.owner_name}
              totalSong={playlist.song_count}
              imageUrl={playlist.coverurl || "fallback_image_url_here"}
              onCardClick={() => handleCardClick(playlist.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicPlaylist;
