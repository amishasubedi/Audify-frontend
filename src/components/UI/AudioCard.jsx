import React from "react";
import PlayAnimation from "./PlayAnimation";
import ArtistLink from "./ArtistNameLink";

import "./Style.css";

const AudioCard = ({ title, artist, artistId, imageUrl, playing, onClick }) => {
  return (
    <div className="custom-card" onClick={onClick}>
      <img src={imageUrl} alt={title} className="custom-img" />
      <div className="card-body">
        <h5 className="card-title p-2">{title}</h5>
        <div className="p-2">
          <ArtistLink name={artist} artistId={artistId} />
        </div>
      </div>
      <div className="animation">{playing ? <PlayAnimation /> : null}</div>
    </div>
  );
};

export default AudioCard;
