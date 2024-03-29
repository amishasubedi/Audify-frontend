import ArtistLink from "./ArtistNameLink";
import PlayAnimation from "./PlayAnimation";
import PlaybackButton from "./PlaybackButton";

const SuggestionListCard = ({
  title,
  artist,
  artistId,
  imageUrl,
  category,
  playing,
  onClick,
}) => {
  return (
    <div
      className="list-group-item bg d-flex align-items-center"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="img-fluid me-3"
        style={{ width: "50px", height: "50px" }}
      />
      <div className="flex-grow-1 row justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 text-white">{title}</h5>
          <div className="d-flex align-items-center">
            {/* <span className="me-2 text-white">{artist}</span> */}
            <ArtistLink name={artist} artistId={artistId} />
            <span className="p-1" style={{ color: "white" }}>
              {" "}
              •{" "}
            </span>
            <span className="ms-2" style={{ color: "rgb(255,255,255,0.7)" }}>
              {category}
            </span>
          </div>
        </div>

        <div>{playing && <PlayAnimation />}</div>
      </div>
      <div className="additional-controls-container">
        <PlaybackButton size={45} ignoreContainer={true} onClick={onClick}>
          <i className=" fa fa-heart" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true} onClick={onClick}>
          <i className=" fa fa-plus-square" aria-hidden="true"></i>
        </PlaybackButton>
        <PlaybackButton size={45} ignoreContainer={true} onClick={onClick}>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </PlaybackButton>
      </div>
    </div>
  );
};

export default SuggestionListCard;
