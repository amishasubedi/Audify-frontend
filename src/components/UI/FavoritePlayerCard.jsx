import PlaybackButton from "./PlaybackButton";
import PlayAnimation from "./PlayAnimation";
import ArtistLink from "./ArtistNameLink";
import useAudioPlayback from "../Hooks/useAudioPlayback";

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
}) => {
  const { onRemoveFromFavorite } = useAudioPlayback();

  const handleRemoveFromFavorite = async () => {
    await onRemoveFromFavorite(audioId);
  };

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
            onClick={handleRemoveFromFavorite}
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
