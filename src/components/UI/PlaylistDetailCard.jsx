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
    <div
      className="d-flex align-items-center bg-transparent cursor-pointer my-4"
      onClick={onClick}
    >
      <div className="playlist-image-container">
        <img
          src={coverURL}
          alt={`Cover for ${playlistName}`}
          className="playlist-cover"
          draggable="false"
        />
      </div>
      <div className="flex px-5">
        <h2 className="text-white fw-bold">{playlistName}</h2>
        <p className="text-white">
          {visibility} . {artist}
        </p>
        <p className="playlist-tracks text-white">{`${count} tracks`}</p>
        {!isPublic && (
          <button className="login-btn p-2 text-white rounded-3">
            Edit playlist
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetailCard;
