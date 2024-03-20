import { useState, useEffect, useRef } from "react";
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
  const { onGoingAudio } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const sound = useRef(null);

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
      if (sound.current) {
        sound.current.stop();
      }
    };
  }, []);

  const play = () => {
    if (
      tracks.length === 0 ||
      currentIndex < 0 ||
      currentIndex >= tracks.length
    )
      return;

    const track = tracks[currentIndex];
    if (sound.current) {
      sound.current.stop();
    }

    sound.current = new Howl({
      src: [track.url],
      html5: true,
      onend: () => {
        setPlayerState("idle");
      },
    });

    sound.current.play();
    setPlayerState("playing");
  };

  const pause = () => {
    if (sound.current) {
      sound.current.pause();
      setPlayerState("paused");
    }
  };

  const onAudioPress = (item, data) => {
    if (onGoingAudio?.id === item.id) {
      if (playerState === "playing") {
        pause();
      } else if (playerState === "paused") {
        play();
      }
    } else {
      updateQueue(data);
      dispatch(updateOnGoingAudio(item));

      const index = data.findIndex((audio) => audio.id === item.id);
      if (index !== -1) {
        setCurrentIndex(index);
        play();
      }

      dispatch(updateOnGoingList(data));
    }
  };

  return { onAudioPress, play, pause };
};

export default useAudioPlayback;
