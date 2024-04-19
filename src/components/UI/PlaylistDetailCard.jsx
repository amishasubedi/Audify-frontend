import React from "react";

const PlaylistDetailCard = ({
  playlistName,
  visibility,
  count,
  artist,
  onClick,
  coverURL,
  isPublic = false,
}) => {
  return (
    <div className="container my-4" onClick={onClick}>
      <div className="row">
        <div className="col-auto">
          <img
            id="img"
            draggable="false"
            alt="Playlist"
            width="264"
            className="card-img-top2"
            src={coverURL}
          />
        </div>

        <div className="col">
          <h2 className="mb-0 text-white fw-bold">{playlistName}</h2>
          <p className="mb-0 text-white">
            {visibility} . {artist}
          </p>
          <p className="text-white">{`${count} tracks`}</p>
          {!isPublic && (
            <button className="btn btn-outline-primary btn-sm">
              Edit playlist
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailCard;
