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
  };

  useEffect(() => {
    return () => {
      if (sound.current) {
        sound.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof currentIndex === "number" && tracks[currentIndex]) {
      play();
    }
  }, [currentIndex, tracks]);

  const play = () => {
    if (
      tracks.length === 0 ||
      currentIndex < 0 ||
      currentIndex >= tracks.length
    ) {
      console.error("Track index is out of bounds. Cannot play.");
      return;
    }

    const track = tracks[currentIndex];
    if (sound.current) {
      sound.current.unload();
    }

    sound.current = new Howl({
      src: [track.url],
      html5: true,
      onplayerror: (id, err) => {
        console.error("Error playing track:", err);
      },
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
    const isNewTrack = onGoingAudio?.id !== item.id;
    if (isNewTrack) {
      updateQueue(data);
      const index = data.findIndex((audio) => audio.id === item.id);
      setCurrentIndex(index);
      dispatch(updateOnGoingAudio(item));
      dispatch(updateOnGoingList(data));
    } else {
      if (playerState === "playing") {
        pause();
      } else if (playerState === "paused" || playerState === "idle") {
        play();
      }
    }
  };

  return { onAudioPress, play, pause };
};

export default useAudioPlayback;
