import { useEffect } from "react";
import AudioPlayerCard from "../UI/AudioPlayerCard";
import { useSelector } from "react-redux";
import { getPlayerState } from "../../redux/Features/player_slice";

const AudioPlayer = () => {
  const { onGoingAudio } = useSelector(getPlayerState);

  // useEffect(() => {
  //   console.log("Playing state changed to:", playing);
  // }, [playing]);

  return (
    <AudioPlayerCard
      title={onGoingAudio.title}
      artist={onGoingAudio.artist}
      imageUrl={onGoingAudio.artwork}
      playing={onGoingAudio ? true : false}
      onClick={() => {
        console.log("Load ongoing list in modal later");
      }}
    />
  );
};

export default AudioPlayer;
