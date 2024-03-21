import React from "react";
import PlayAnimation from "./PlayAnimation";

import "./Style.css";
import ReactSlider from "react-slider";
import PlaybackButton from "./PlaybackButton";

const AudioPlayerCard = ({
  title,
  artist,
  imageUrl,
  playing = false,
  onClick,
  onSliderChange,
}) => {
  return (
    <div className="audio-player-card bg-dark" onClick={onClick}>
      <div className="controls-container">
        <PlaybackButton size={45} ignoreContainer={true}>
          <i className="fa fa-step-backward" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true}>
          {playing ? (
            <i className="fa fa-pause p-2" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-play p-2" aria-hidden="true"></i>
          )}
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true}>
          <i className="fa fa-step-forward p-5" aria-hidden="true"></i>
        </PlaybackButton>
      </div>
      <div className="album-art-container">
        <img
          src="https://lh3.googleusercontent.com/hwau7OVWx96XaME5KpRuJ0I_MscrerK6SbRH1UwYHYaxIDQQtn7RZK02LDSfBzCreidFgDsJeXyqDct6EZiH6vsV=w640-h400-e365-rj-sc0x00ffffff"
          alt="alu"
          className="custom-img"
        />
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
