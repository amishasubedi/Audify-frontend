import { useSelector } from "react-redux";
import { useFetchUploadsById } from "../Hooks/query-hook";
import AudioListCard from "../UI/AudioListCard";
import { getPlayerState } from "../../redux/Features/player_slice";

const PublicUploads = ({ onAudioClick, name, userId }) => {
  const { data, isLoading, error } = useFetchUploadsById(userId);
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3 className="text-white fw-bold mb-4 px-2">{name}'s Uploads</h3>
      <table className="playlist-table">
        <tbody>
          {data.map((audio) => (
            <AudioListCard
              key={audio.id}
              title={audio.title}
              artistId={audio.owner.id}
              artist={audio.owner.name}
              imageUrl={audio.poster}
              category={audio.category}
              duration={audio.duration}
              onClick={() => onAudioClick(audio, data)}
              playing={audio.id === onGoingAudio?.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PublicUploads;