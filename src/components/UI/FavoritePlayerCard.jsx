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
        </td>

        <div className="animation">{playing ? <PlayAnimation /> : null}</div>
      </tr>
    </>
  );
};

export default FavoritePlayerCard;
