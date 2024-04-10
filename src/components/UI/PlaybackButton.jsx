const PlaybackButton = ({
  size = 45,
  ignoreContainer,
  children,
  onClick,
  className,
}) => {
  const buttonClass = ignoreContainer
    ? "player-controller-ignore"
    : "player-controller";

  return (
    <button
      className={`btn ${buttonClass} ${className || ""} ms-2`}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        color: "white",
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
