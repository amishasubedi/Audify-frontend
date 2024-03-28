import React from "react";

const PlaylistDetailCard = ({
  playlistName,
  visibility,
  count,
  artist,
  onClick,
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
            src="https://www.gstatic.com/youtube/media/ytm/images/pbg/playlist-empty-state-@576.png"
          />
        </div>

        <div className="col mt-5">
          <h2 className="mb-0">{playlistName}</h2>
          <p className="mb-0">
            {visibility} . {artist}
          </p>
          <p>{count}</p>
          <button className="btn btn-outline-primary btn-sm">
            Edit playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailCard;
