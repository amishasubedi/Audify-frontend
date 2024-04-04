import React from "react";

const PlaybackButton = ({ size = 45, ignoreContainer, children, onClick }) => {
  const buttonClass = ignoreContainer
    ? "player-controller-ignore"
    : "player-controller";

  return (
    <button
      className={`btn ${buttonClass} ms-2`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        color: "white",
        hover: "rgb(255,255,255,0.3)",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </button>
  );
};

export default PlaybackButton;
