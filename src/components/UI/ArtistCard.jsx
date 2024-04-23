import React from "react";

const ArtistCard = ({ artist, imageURL, onCardClick }) => {
  return (
    <div className="mb-5">
      <div className="row align-items-center">
        <div className="col-auto" onClick={onCardClick}>
          <img
            src={imageURL}
            alt={artist}
            className="rounded-circle artist-image"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="mt-2 mb-5">
          <h4 className="mb-0 text-white mb-5">{artist}</h4>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
