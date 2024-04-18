import React from "react";
import "./Style.css";

const PlaylistCard = ({ title, artist, imageUrl, totalSong }) => {
  return (
    <div className="col-md-3 mt-2">
      <div className="card" style={{ backgroundColor: "black" }}>
        <div className="card-img-block">
          <img className="card-img-top" src={imageUrl} alt="" />
        </div>
        <div className="card-body pt-1 text-white">
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
