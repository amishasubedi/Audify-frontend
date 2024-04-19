import PlaybackButton from "./PlaybackButton";
import PlayAnimation from "./PlayAnimation";
import ArtistLink from "./ArtistNameLink";

const FavoritePlayerCard = ({
  title,
  artist,
  imageUrl,
  artistId,
  audioId,
  duration,
  category,
  playing,
  onClick,
  onAddToFavoriteClick,
  isPublic = false,
  onRemove,
}) => {
  return (
    <>
      <tr className="pe-auto" onClick={onClick}>
        <td>
          <img src={imageUrl} alt={title} className="album-cover" />
        </td>
        <td>{title}</td>
        <td>
          {" "}
          <ArtistLink name={artist} artistId={artistId} />
        </td>
        <td>{category}</td>
        <td>{duration}</td>
        <td>
          {!isPublic ? (
            <PlaybackButton
              size={45}
              ignoreContainer={true}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(audioId);
              }}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </PlaybackButton>
          ) : (
            <PlaybackButton
              size={45}
              ignoreContainer={true}
              onClick={onAddToFavoriteClick}
            >
              <i className="fa fa-heart" aria-hidden="true"></i>
            </PlaybackButton>
          )}
        </td>

        <div className="animation">{playing ? <PlayAnimation /> : null}</div>
      </tr>
    </>
  );
};

export default FavoritePlayerCard;
