import "./Songs.css";
import PlaybackButton from "./PlaybackButton";

const AudioListCard = ({
  title,
  artist,
  imageUrl,
  duration,
  category,
  playing,
  onClick,
}) => {
  return (
    <tr onClick={onClick}>
      <td>
        <img src={imageUrl} alt={title} className="album-cover" />
      </td>
      <td>{title}</td>
      <td>{artist}</td>
      <td>{category}</td>
      <td>{duration}</td>
      <td>
        <PlaybackButton size={30} ignoreContainer={true}>
          <i className="fa fa-heart icon" aria-hidden="true"></i>
        </PlaybackButton>
      </td>
      <td>
        <PlaybackButton size={30}>
          <i className="fa fa-plus-square icon" aria-hidden="true"></i>
        </PlaybackButton>
      </td>
      {/* Consider removing or handling the `playing` prop appropriately */}
    </tr>
  );
};

export default AudioListCard;
