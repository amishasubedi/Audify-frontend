import PlayAnimation from "./PlayAnimation";

const SuggestionListCard = ({
  title,
  artist,
  imageUrl,
  category,
  duration,
  playing,
  onClick,
}) => {
  return (
    <div className="list-group list-group-flush">
      <div className="list-group-item bg" onClick={onClick}>
        <div
          className="d-flex justify-content-between align-items-center text-white mb-2 p-2"
          style={{
            background: "black",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <img
            src={imageUrl}
            alt={title}
            className="img-fluid me-3"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="flex-grow-1 d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-0">{title}</h5>
              <div className="d-flex align-items-center">
                <span className="me-2">{artist}</span>
                <span>•</span>
                <span className="ms-2">{category}</span>
              </div>
            </div>
            <div>
              <span>{duration}</span>
              {playing && <PlayAnimation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionListCard;
