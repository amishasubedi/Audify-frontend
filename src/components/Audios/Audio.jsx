import React, { useContext, useEffect } from "react";
import { PlayerContext } from "../Context/player-context";
import { getAuthState } from "../../redux/Features/user_slice";
import AudioCard from "../Shared/AudioCard";
import Player from "./player";
import { useGetAllAudiosQuery } from "../../redux/Services/api_service";
import { useSelector } from "react-redux";

const Audio = () => {
  const { data, isLoading, isSuccess, isError } = useGetAllAudiosQuery();
  const { loggedIn, profile } = useSelector(getAuthState);

  const { isPlaying } = useContext(PlayerContext);

  useEffect(() => {
    if (isSuccess && data && loggedIn) {
      console.log(data.audios);
    }
  }, [isSuccess, data, loggedIn]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error fetching data.</div>;
  }

  const audioList = data.audios;

  return (
    <>
      {audioList &&
        audioList.map((audio, index) => (
          <AudioCard
            key={index}
            title={audio.Title}
            artist={audio.owner}
            imageUrl={audio.CoverURL}
          />
        ))}
      {isPlaying && (
        <Player audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" />
      )}
    </>
  );
};

export default Audio;
