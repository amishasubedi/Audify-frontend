import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import getClient from "../utils/client";
import catchAsyncError from "../utils/AsyncErrors";
import { updateAlert } from "../../redux/Features/alert_slice";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from "../../redux/Features/player_slice";

const useAudioPlayback = () => {
  const { onGoingAudio, onGoingList } = useSelector(getPlayerState);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTime, setCurrentTime] = useState(0);

  const {
    load,
    play,
    pause,
    playing,
    stop,
    seek,
    duration,
    togglePlayPause,
    getPosition,
  } = useGlobalAudioPlayer();

  const onAddToFavorite = async (audioId) => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);

      const client = await getClient();
      await client.post("/favorite/add", formData);

      dispatch(
        updateAlert({
          message: "New audio added to your favorite list",
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  const updateQueue = useCallback(
    (data, selectedSongId) => {
      const formattedList = data.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.file,
        artwork: item.poster,
        artist: item.owner.name,
        genre: item.category,
      }));

      const selectedSongIndex = formattedList.findIndex(
        (song) => song.id === selectedSongId
      );
      dispatch(updateOnGoingList(formattedList));

      if (selectedSongIndex !== -1) {
        setCurrentIndex(selectedSongIndex);
        console.log("selected song index", selectedSongIndex);
        console.log("Current index is", currentIndex);
        dispatch(updateOnGoingAudio(formattedList[selectedSongIndex]));
        load(formattedList[selectedSongIndex].url, { autoplay: true }); //
      }
    },
    [dispatch, load]
  );

  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        const position = getPosition();
        setCurrentTime(position);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [playing, getPosition]);

  useEffect(() => {
    if (
      onGoingList.length > 0 &&
      typeof currentIndex === "number" &&
      onGoingList[currentIndex]
    ) {
      load(onGoingList[currentIndex].url, {
        autoplay: true,
        onend: () => {
          if (currentIndex < onGoingList.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            stop();
          }
        },
      });
      dispatch(updateOnGoingAudio(onGoingList[currentIndex]));
      console.log("Updated current index is", currentIndex);
    }
  }, [currentIndex, onGoingList, dispatch, load, stop]);

  const onNext = useCallback(() => {
    if (currentIndex < onGoingList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [onGoingList.length]);

  const onPrevious = useCallback(() => {
    if (currentIndex < onGoingList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex]);

  const onAudioPress = (item, data) => {
    const isNewQueue =
      onGoingList.length === 0 || onGoingList[0].id !== data[0].id;

    if (isNewQueue) {
      updateQueue(data, item.id);
    } else {
      const selectedIndex = onGoingList.findIndex(
        (audio) => audio.id === item.id
      );

      if (selectedIndex !== currentIndex) {
        setCurrentIndex(selectedIndex);
        load(onGoingList[selectedIndex].url, { autoplay: true });
      } else if (playing && selectedIndex === currentIndex) {
        pause();
      } else {
        play();
      }
    }
  };

  return {
    onAudioPress,
    play,
    pause,
    playing,
    currentIndex,
    stop,
    seek,
    togglePlayPause,
    duration,
    currentTime,
    onNext,
    onAddToFavorite,
    onPrevious,
  };
};

export default useAudioPlayback;
