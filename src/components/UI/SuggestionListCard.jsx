import PlayAnimation from "./PlayAnimation";

const SuggestionListCard = ({
  title,
  artist,
  category,
  imageUrl,
  duration,
  playing,
  onClick,
}) => {
  return (
    <div
      className="d-flex justify-content-start align-items-center text-white mb-2 p-2"
      onClick={onClick}
      style={{
        background: "black", // Assuming the background is black
        cursor: "pointer", // Change cursor on hover
        borderBottom: "none", // Remove border
        textDecoration: "none", // In case it's being styled like a link
        transition: "background-color 0.2s", // Smooth transition for hover effect
      }}
    >
      <img
        src={imageUrl}
        alt={title}
        className="img-fluid me-3"
        style={{ width: "50px", height: "50px" }}
      />
      <div className="flex-grow-1 d-flex align-items-center justify-content-between">
        <div>
          <div className="fw-bold">{title}</div>
          <div>{artist}</div>
        </div>
        <div className="text-center mx-5">
          <div>{category}</div>
        </div>
        <div className="d-flex align-items-center">
          <span>{duration}</span>
          {playing && <PlayAnimation />}
        </div>
      </div>
    </div>
  );
};

export default SuggestionListCard;
