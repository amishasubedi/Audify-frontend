import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Howl } from "howler";
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from "../../redux/Features/player_slice";

const useAudioPlayback = () => {
  const [playerState, setPlayerState] = useState("idle");
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { onGoingAudio, onGoingList } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  let sound = null;

  const updateQueue = (data) => {
    const lists = data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster,
      artist: item.owner.name,
      genre: item.category,
      isLiveStream: item.isLiveStream,
    }));
    setTracks([...lists]);
    setCurrentIndex(0);
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.stop();
      }
    };
  }, [sound]);

  const play = () => {
    if (tracks.length === 0) return;

    const track = tracks[currentIndex];
    if (sound) {
      sound.stop();
    }

    sound = new Howl({
      src: [track.url],
      html5: true,
      onend: () => {
        setPlayerState("idle");
      },
    });

    sound.play();
    setPlayerState("playing");
  };

  const pause = () => {
    if (sound) {
      sound.pause();
      setPlayerState("paused");
      console.log("paused");
    }
  };

  const skipToNextTrack = () => {
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentIndex(nextIndex);
    play();
  };

  const onAudioPress = async (item, data) => {
    updateQueue(data);

    dispatch(updateOnGoingAudio(item));

    const index = data.findIndex((audio) => audio.id === item.id);

    if (index !== -1) {
      setCurrentIndex(index);

      if (playerState === "idle" || playerState === "paused") {
        play();
      } else if (playerState === "playing") {
        if (sound) sound.stop();
        play();
      }

      return dispatch(updateOnGoingList(data));
    }

    if (
      playerState === "playing" &&
      data.findIndex((audio) => audio.id === item.id)
    ) {
      return await pause();
    }

    if (
      playerState === "paused" &&
      data.findIndex((audio) => audio.id === item.id)
    ) {
      return await play();
    }
  };

  return { onAudioPress, play, pause, skipToNextTrack };
};

export default useAudioPlayback;
