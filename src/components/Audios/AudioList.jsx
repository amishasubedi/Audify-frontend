import { useFetchAudiosByPlaylist } from "../Hooks/query-hook";
import AudioListCard from "../UI/AudioListCard";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";

const AudioList = ({
  playlistName,
  onAudioClick,
  onAddToPlaylistClick,
  playlistId,
}) => {
  const { data, isLoading, error } = useFetchAudiosByPlaylist(playlistId);
  const { onGoingAudio } = useSelector(getPlayerState);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching audios : {error.message}</div>;
  }

  return (
    <div>
      <h3 className="text-white mb-2 mt-2  px-2">
        Audio/s in playlist {playlistName}
      </h3>
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
              onAddToPlaylistClick={() => onAddToPlaylistClick(audio.id)}
              playing={audio.id === onGoingAudio?.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AudioList;
