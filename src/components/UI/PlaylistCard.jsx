import React from "react";
import "./Playlist.css";

const PlaylistCard = ({ title, artist, imageUrl, totalSong, onCardClick }) => {
  return (
    <div className="col-md-3 mt-2">
      <div
        className="card1"
        style={{ backgroundColor: "black" }}
        onClick={onCardClick}
      >
        <div className="card-img-block">
          <img className="card-img-top1" src={imageUrl} alt={title} />
        </div>
        <div className="card-body1 pt-1 text-white">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            {artist} . {totalSong} {totalSong === 1 ? "track" : "tracks"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
