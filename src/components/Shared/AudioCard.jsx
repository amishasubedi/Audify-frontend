import React, { useContext, useEffect } from "react";
import { FaPlay, FaPause, FaHeart, FaEllipsisH } from "react-icons/fa";
import { PlayerContext } from "../Context/player-context";
import "./Style.css";

const AudioCard = ({ title, artist, imageUrl, audioUrl }) => {
  const { isPlaying, handlePlayPause, audioRef } = useContext(PlayerContext);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
  }, [audioUrl]);

  return (
    <div className="custom-card">
      <img src={imageUrl} alt={title} className="custom-img" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{artist}</p>
      </div>
      <div className="card-icons" onClick={handlePlayPause}>
        {isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
        <FaHeart className="icon" />
        <FaEllipsisH className="icon" />
      </div>
    </div>
  );
};

export default AudioCard;
