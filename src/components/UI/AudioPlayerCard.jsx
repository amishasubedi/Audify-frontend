import React from "react";

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
  const { playing, togglePlayPause, onNext, onPrevious, mute } =
    useAudioPlayback();

  const onToggleHandler = async () => {
    await togglePlayPause();
    console.log("Value of playing", playing);
  };

  const onPlayNextHandler = async () => {
    await onNext();
  };

  const onPlayPreviousHandler = async () => {
    await onPrevious();
  };

  return (
    <div className="audio-player-card bg-dark" onClick={onClick}>
      <div className="controls-container">
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={onPlayPreviousHandler}
        >
          <i className="fa fa-step-backward" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={onToggleHandler}
        >
          {playing ? (
            <i className="fa fa-pause p-2" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-play p-2" aria-hidden="true"></i>
          )}
        </PlaybackButton>
        <PlaybackButton
          size={45}
          ignoreContainer={true}
          onClick={onPlayNextHandler}
        >
          <i className="fa fa-step-forward p-5" aria-hidden="true"></i>
        </PlaybackButton>
      </div>
      <div className="album-art-container">
        <img src={imageUrl} className="custom-img" />
      </div>
      <div className="track-info-container">
        <h2 className="title text-white">{title}</h2>
        <h7 className="artist text-white">{artist}</h7>
      </div>
      <div className="slider-container">
        <ReactSlider
          value={0}
          max={10}
          onChange={onSliderChange}
          className="slider-bar"
          thumbClassName="slider-thumb"
          trackClassName="slider-track"
        />
        <div className="time-info">
          <span className="current-time">00:00</span>
          <span className="duration">06:12</span>
        </div>
      </div>
      <div className="additional-controls-container">
        <PlaybackButton size={45}>
          <i className="fa fa-heart" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true}>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </PlaybackButton>
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
