import React from "react";
import PlayAnimation from "./PlayAnimation";

import "./Style.css";

const AudioCard = ({ title, artist, imageUrl, playing = false, onClick }) => {
  // useEffect(() => {
  //   audioRef.current = new Audio(audioUrl);
  // }, [audioUrl]);

  return (
    <div className="custom-card" onClick={onClick}>
      <img src={imageUrl} alt={title} className="custom-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{artist}</p>
      </div>
      <div>
        <PlayAnimation visible={playing} />
      </div>
    </div>
  );
};

export default AudioCard;
