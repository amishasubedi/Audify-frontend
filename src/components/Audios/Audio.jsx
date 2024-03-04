import React, { useContext } from "react";
import { PlayerContext } from "../Context/player-context";
import AudioCard from "../Shared/AudioCard";
import Player from "./player";

const Audio = () => {
  const { isPlaying } = useContext(PlayerContext);
  return (
    <>
      <AudioCard
        title="Shake it off"
        artist="Amisha Subedi"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkF17GkzaTA0PzQjgSusQHlkBbFiA7_vswEA&usqp=CAU"
      />
      {isPlaying ? (
        <Player audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" />
      ) : (
        ""
      )}
    </>
  );
};

export default Audio;
