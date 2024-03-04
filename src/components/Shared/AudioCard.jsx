import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaHeart, FaEllipsisH } from "react-icons/fa";
import "./Style.css";

const AudioCard = ({ title, artist, imageUrl, audioUrl }) => {
  return (
    <div className="px-5 p-3 justify-content-center mt-5">
      <div className="px-4">
        <div className="custom-card">
          <img src={imageUrl} alt={title} className="custom-img" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{artist}</p>
          </div>
          <div className="card-icons">
            <FaPlay className="icon" />
            <FaHeart className="icon" />
            <FaEllipsisH className="icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
