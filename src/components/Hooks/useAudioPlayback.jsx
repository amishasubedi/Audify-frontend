import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from "../../redux/Features/player_slice";

const useAudioPlayback = () => {
  const { onGoingList } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const {
    load,
    play,
    pause,
    playing,
    stop,
    seek,
    setVolume,
    setRate,
    mute,
    togglePlayPause,
  } = useGlobalAudioPlayer();
  const updateQueue = useCallback(
    (data) => {
      const lists = data.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.file,
        artwork: item.poster,
        artist: item.owner.name,
        genre: item.category,
        isLiveStream: item.isLiveStream,
      }));
      dispatch(updateOnGoingList(lists));
      setCurrentIndex(0);
      load(lists[0].url, { autoplay: true });
    },
    [dispatch, load]
  );

  useEffect(() => {
    if (
      onGoingList.length > 0 &&
      typeof currentIndex === "number" &&
      onGoingList[currentIndex]
    ) {
      load(onGoingList[currentIndex].url, { autoplay: true });
      dispatch(updateOnGoingAudio(onGoingList[currentIndex]));
    }
  }, [currentIndex, onGoingList, dispatch, load]);

  const onAudioPress = (item, data) => {
    const index = data.findIndex((audio) => audio.id === item.id);
    const isNewQueue =
      onGoingList.length === 0 || onGoingList[0].id !== data[0].id;

    if (isNewQueue) {
      updateQueue(data);
    } else if (index !== currentIndex) {
      setCurrentIndex(index);
    } else if (playing) {
      pause();
    } else {
      play();
    }
  };

  return {
    onAudioPress,
    play,
    pause,
    currentIndex,
    stop,
    seek,
    setVolume,
    togglePlayPause,
    setRate,
    mute,
  };
};

export default useAudioPlayback;
