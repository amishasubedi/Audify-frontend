import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";
import { useFetchUploadsById } from "../Hooks/query-hook";
import AudioListCard from "../UI/AudioListCard";

const PublicUploads = ({ onAudioClick, userId }) => {
  const { data, isLoading } = useFetchUploadsById(userId);
  const { onGoingAudio, playing } = useSelector(getPlayerState);

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
                playing={playing.playing && audio.id === onGoingAudio?.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublicUploads;
