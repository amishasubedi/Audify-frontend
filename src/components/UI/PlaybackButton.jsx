import React from "react";

const PlaybackButton = ({ size = 45, ignoreContainer, children, onClick }) => {
  const buttonClass = ignoreContainer
    ? "player-controller-ignore"
    : "player-controller";

  return (
    <button
      className={`btn ${buttonClass}`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PlaybackButton;
