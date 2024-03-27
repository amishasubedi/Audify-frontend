import React from "react";
import SuggestionsList from "../Audios/SuggestionList";

const PlaylistDetail = () => {
  return (
    <div className="container my-4">
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
          <h2 className="mb-0">Playlist Name</h2>
          <p className="mb-0">Private · Amisha Subedi</p>
          <p>0 tracks · 0 seconds</p>
          <p>iytfyy</p>
          <button className="btn btn-outline-primary btn-sm">
            Edit playlist
          </button>
        </div>
      </div>
      <div>
        <SuggestionsList />
      </div>
    </div>
  );
};

export default PlaylistDetail;
