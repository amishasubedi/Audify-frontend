import React from "react";
import { useNavigate } from "react-router-dom";
import PlaylistCard from "../UI/PlaylistCard";
import { useFetchPublicPlaylist } from "../Hooks/query-hook";
import "./Style.css";

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
      <div className="d-flex flex-nowrap playlist-scroll-container">
        {data.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            title={playlist.title}
            artist={playlist.owner_name}
            totalSong={playlist.song_count}
            imageUrl={
              playlist.coverurl ||
              "https://www.gstatic.com/youtube/media/ytm/images/pbg/playlist-empty-state-@576.png"
            }
            onCardClick={() => handleCardClick(playlist.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicPlaylist;
