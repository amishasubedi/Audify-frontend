import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { arraysEqual } from "../utils/helper";
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
  updateCurrentIndex,
  updatePlayingStatus,
} from "../../redux/Features/player_slice";

const useAudioPlayback = () => {
  const { onGoingList, currentSongIndex } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastIndex, setLastIndex] = useState(currentSongIndex);

  const {
    load,
    play: startPlaying,
    pause: pausePlaying,
    stop,
    seek,
    getPosition,
  } = useGlobalAudioPlayer();

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pausePlaying();
      dispatch(updatePlayingStatus({ playing: false }));
    } else {
      startPlaying();
      dispatch(updatePlayingStatus({ playing: true }));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, startPlaying, pausePlaying, dispatch]);

  useEffect(() => {
    const trackChanged = lastIndex !== currentSongIndex;
    const currentTrack = onGoingList[currentSongIndex];

    if (trackChanged && currentTrack) {
      const tempAudio = new Audio(currentTrack.url);

      tempAudio.addEventListener("loadedmetadata", () => {
        setDuration(tempAudio.duration);
        tempAudio.remove();
      });

      load(currentTrack.url, {
        autoplay: true,
        onend: () => {
          if (currentSongIndex < onGoingList.length - 1) {
            dispatch(updateCurrentIndex(currentSongIndex + 1));
          } else {
            stop();
          }
        },
      });
      dispatch(
        updateOnGoingAudio({ ...currentTrack, duration: tempAudio.duration })
      );
      setIsPlaying(true);
      setLastIndex(currentSongIndex);
    }
  }, [
    currentSongIndex,
    onGoingList,
    lastIndex,
    isPlaying,
    load,
    dispatch,
    stop,
  ]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(getPosition());
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [getPosition, isPlaying]);

  const onNext = useCallback(() => {
    const nextIndex = currentSongIndex + 1;
    if (nextIndex < onGoingList.length) {
      dispatch(updateCurrentIndex(nextIndex));
    }
  }, [currentSongIndex, onGoingList.length, dispatch]);

  const onPrevious = useCallback(() => {
    const previousIndex = currentSongIndex - 1;
    if (previousIndex >= 0) {
      dispatch(updateCurrentIndex(previousIndex));
    }
  }, [currentSongIndex, dispatch]);

  const onAudioPress = (item, data) => {
    const isNewQueue = !arraysEqual(onGoingList, data);
    const formattedList = data.map((item) => ({
      id: item.id,
      title: item.title,
      url: item.file,
      artwork: item.poster,
      artist: item.owner.name,
      genre: item.category,
      duration: item.duration,
    }));

    dispatch(updateOnGoingAudio(item));
    const newIndex = formattedList.findIndex((audio) => audio.id === item.id);

    if (isNewQueue) {
      dispatch(updateOnGoingList(formattedList));
      dispatch(updateCurrentIndex(newIndex));
      load(formattedList[newIndex].url, { autoplay: true });
      setIsPlaying(true);
      dispatch(updatePlayingStatus({ playing: true }));
      startPlaying();
    } else {
      const selectedIndex = onGoingList.findIndex(
        (audio) => audio.id === item.id
      );

      if (selectedIndex !== currentSongIndex) {
        dispatch(updateCurrentIndex(selectedIndex));
        load(onGoingList[selectedIndex].url, { autoplay: true });
        setIsPlaying(true);
        dispatch(updatePlayingStatus({ playing: true }));

        startPlaying();
      } else if (onGoingList[selectedIndex].url !== item.file) {
        load(item.file, { autoplay: true });
        setIsPlaying(true);
        dispatch(updatePlayingStatus({ playing: true }));

        startPlaying();
      } else {
        togglePlayPause();
      }
    }
  };

  return {
    onAudioPress,
    play: startPlaying,
    pause: pausePlaying,
    isPlaying,
    onNext,
    onPrevious,
    stop,
    seek,
    togglePlayPause,
    duration,
    currentTime,
  };
};

export default useAudioPlayback;
