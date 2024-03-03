import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style.css";

const AudioCard = ({ title, artist, imageUrl, audioUrl }) => {
  return (
    <div className="justify-content-center flex-wrap px-4 mt-5 py-1">
      <div className="px-5">
        <div
          className="card custom-card"
          style={{ width: "350px", height: "96px" }}
        >
          <div className="row g-3">
            <div className="col-md-3">
              <img
                src={imageUrl}
                alt={title}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title text-white mb-1">{title}</h5>
                <p className="card-text text-secondary mb-2">{artist}</p>
                <p className="card-text text-muted small">{title}</p>
              </div>
              <audio controls>
                <source src={audioUrl} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
