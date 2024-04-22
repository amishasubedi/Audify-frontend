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
      <div className="mt-0 px-5">
        <h3 className="text-white fw-bold">Songs</h3>
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
    </div>
  );
};

export default PublicUploads;
