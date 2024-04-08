import React, { useEffect, useState } from "react";

import "./Style.css";
import ReactSlider from "react-slider";
import PlaybackButton from "./PlaybackButton";
import useAudioPlayback from "../Hooks/useAudioPlayback";

const AudioPlayerCard = ({
  title,
  artist,
  imageUrl,
  onClick,
  onSliderChange,
}) => {
  const {
    togglePlayPause,
    onNext,
    onPrevious,
    playing,
    duration,
    currentTime,
    seek,
  } = useAudioPlayback();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);

  const handleSaveToPlaylistClick = () => {
    setShowPlaylists(true);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const onToggleHandler = async () => {
    await togglePlayPause();
  };

  const onPlayNextHandler = async () => {
    await onNext();
  };

  const onPlayPreviousHandler = async () => {
    await onPrevious();
  };

  const handleSliderChange = (newValue) => {
    seek(newValue);
  };

  const formatDuration = (duration) => {
    if (Number.isNaN(duration) || duration === undefined) {
      return "--:--";
    }

    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="audio-player-card" onClick={onClick}>
      <div className="controls-container">
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={onPlayPreviousHandler}
        >
          <i className="fa fa-step-backward" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} onClick={onToggleHandler}>
          {playing ? (
            <i className="fa fa-pause" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-play" aria-hidden="true"></i>
          )}
        </PlaybackButton>
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={onPlayNextHandler}
        >
          <i className="fa fa-step-forward" aria-hidden="true"></i>
        </PlaybackButton>
      </div>
      <div className="album-art-container">
        <img src={imageUrl} alt="" className="custom-img ms-4" />
      </div>
      <div className="track-info-container p-2">
        <h2 className="title text-white">{title}</h2>
        <h7 className="artist text-white">{artist}</h7>
      </div>
      <div className="slider-container">
        <ReactSlider
          value={currentTime}
          max={duration}
          onChange={handleSliderChange}
          className="react-slider"
          thumbClassName="react-slider__thumb"
          trackClassName="react-slider__track"
        />

        <div className="time-info">
          <span className="current-time">{formatDuration(currentTime)}</span>
          <span className="duration">{formatDuration(duration)}</span>
        </div>
      </div>
      <div className="additional-controls-container">
        <PlaybackButton size={45}>
          <i className="fa fa-heart" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={toggleDropdown}
        >
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </PlaybackButton>

        {isDropdownVisible && (
          <div className="dropdown-menu">
            <button onClick={handleSaveToPlaylistClick}>
              + Save to Playlist
            </button>
          </div>
        )}

        <PlaybackButton size={45} ignoreContainer={true}>
          <i className="fa fa-volume-up" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true}>
          <i className="fa fa-caret-up" aria-hidden="true"></i>
        </PlaybackButton>
      </div>
    </div>
  );
};

export default AudioPlayerCard;
