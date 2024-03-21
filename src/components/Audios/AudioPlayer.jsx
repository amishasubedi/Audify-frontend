import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatDuration from "format-duration";
import ReactSlider from "react-slider";
import {
  updatePlaybackRate,
  getPlayerState,
} from "../../redux/Features/player_slice";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import { useProgress } from "../Hooks/useProgress";
import PlaybackButton from "../UI/PlaybackButton";

const AudioPlayer = ({
  visible,
  onListOptionClick,
  onRequestClose,
  onProfileLinkClick,
}) => {
  if (!visible) return null;

  const { onGoingAudio, playbackRate } = useSelector(getPlayerState);
  const { isPlaying, togglePlayPause, onAudioPress, seek } = useAudioPlayback();
  const { duration, position } = useProgress();
  const dispatch = useDispatch();

  const formattedDuration = (duration = 0) =>
    formatDuration(duration, { leading: true });

  const handlePlaybackRateChange = (rate) => {
    setRate(rate);
    dispatch(updatePlaybackRate(rate));
  };

  return (
    <div className="audio-player container bg-dark text-white p-4">
      <div className="audio-info d-flex flex-column align-items-center">
        <img
          src={onGoingAudio?.poster || "default_audio_poster.png"}
          alt="Audio Poster"
          className="audio-poster mb-3"
          style={{ width: "200px", height: "200px", borderRadius: "10px" }}
        />
        <div className="audio-title">{onGoingAudio?.title}</div>
        <div className="audio-owner" onClick={onProfileLinkClick}>
          {onGoingAudio?.owner?.name}
        </div>
      </div>

      <div className="audio-progress my-3">
        <div className="d-flex justify-content-between">
          <div>{formattedDuration(position * 1000)}</div>
          <div>{formattedDuration(duration * 1000)}</div>
        </div>
        <ReactSlider
          className="slider"
          thumbClassName="thumb"
          trackClassName="track"
          min={0}
          max={duration}
          value={position}
          onChange={(value) => seek(value)}
          ariaLabel={"Audio progress"}
        />
      </div>

      <div className="audio-controls d-flex justify-content-around my-3">
        <PlaybackButton
          onClick={() => onAudioPress("previous")}
          iconName="stepbackward"
          iconLibrary="AntDesign"
        />
        <PlaybackButton
          onClick={togglePlayPause}
          iconName={isPlaying ? "pause" : "play"}
          iconLibrary={isPlaying ? "FontAwesome" : "MaterialComIcon"}
        />
        <PlaybackButton
          onClick={() => onAudioPress("next")}
          iconName="stepforward"
          iconLibrary="AntDesign"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
