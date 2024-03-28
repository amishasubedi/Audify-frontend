import PlayAnimation from "./PlayAnimation";
import PlaybackButton from "./PlaybackButton";

const SuggestionListCard = ({
  title,
  artist,
  imageUrl,
  category,
  playing,
  onClick,
}) => {
  return (
    <div className="list-group list-group-flush" onClick={onClick}>
      <div className="list-group-item bg">
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

            <div>{playing && <PlayAnimation />}</div>
          </div>
          <div className="additional-controls-container">
            <PlaybackButton size={45}>
              <i class="fa-solid fa-list-music" aria-hidden="true"></i>
            </PlaybackButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionListCard;
