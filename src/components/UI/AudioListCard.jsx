import PlaybackButton from "./PlaybackButton";
import PlayAnimation from "./PlayAnimation";
import ArtistLink from "./ArtistNameLink";

const AudioListCard = ({
  title,
  artist,
  imageUrl,
  artistId,
  duration,
  category,
  playing,
  onClick,
  onAddToPlaylistClick,
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
          <PlaybackButton size={45} ignoreContainer={true}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </PlaybackButton>
        </td>
        <td>
          <PlaybackButton size={45} onClick={onAddToPlaylistClick}>
            <i className="fa fa-plus-square" aria-hidden="true"></i>
          </PlaybackButton>
        </td>
        <div className="animation">{playing ? <PlayAnimation /> : null}</div>
      </tr>
    </>
  );
};

export default AudioListCard;
