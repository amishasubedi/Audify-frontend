import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AudioCard = ({ title, artist, imageUrl }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imageUrl} alt={title} className="img-fluid rounded-start" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{artist}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCard;
