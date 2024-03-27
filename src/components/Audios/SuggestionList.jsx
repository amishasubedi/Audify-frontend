import React from "react";

const suggestions = [
  {
    title: "Treasure",
    artist: "Bruno Mars",
    album: "Unorthodox Jukebox",
    duration: "2:59",
  },
  {
    title: "Treasure",
    artist: "Bruno Mars",
    album: "Unorthodox Jukebox",
    duration: "2:59",
  },
  {
    title: "Treasure",
    artist: "Bruno Mars",
    album: "Unorthodox Jukebox",
    duration: "2:59",
  },
];

const SuggestionsList = () => {
  return (
    <div className="container my-4">
      <h3 className="text-light mb-3">Suggestions</h3>
      <div className="list-group">
        {suggestions.map((song, index) => (
          <div
            className="list-group-item list-group-item-action list-group-item-dark d-flex justify-content-between align-items-center"
            key={index}
          >
            <img
              src="https://www.gstatic.com/youtube/media/ytm/images/pbg/playlist-empty-state-@576.png"
              alt={song.title}
              className="img-fluid me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="ms-2 me-auto">
              <div className="fw-bold">{song.title}</div>
              {song.artist} - {song.album}
            </div>
            <span className="badge bg-primary rounded-pill">
              {song.duration}
            </span>
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3">Refresh</button>
    </div>
  );
};

export default SuggestionsList;
