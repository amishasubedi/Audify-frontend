import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import getClient from "../utils/client";
import {
  getPlayerState,
  updateOnGoingAudio,
  updateOnGoingList,
} from "../../redux/Features/player_slice";

const useAudioPlayback = () => {
  const { onGoingAudio, onGoingList } = useSelector(getPlayerState);
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
    }
  }, [currentIndex, onGoingList, dispatch, load, stop]);

  // const onAddToPlaylist = async (playlistId, audioId) => {
  //   try {
  //     const client = await getClient();
  //     const response = await client.post("/playlist/update-playlist", {
  //       id: playlistId,
  //       item: audioId,
  //     });

  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle any errors here, such as showing an error message to the user
  //     console.error("Error adding audio to playlist:", error);
  //   }
  // };

  const onNext = () => {
    if (currentIndex < onGoingList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const onAudioPress = (item, data) => {
    const index = data.findIndex((audio) => audio.id === item.id);
    const isNewQueue =
      onGoingList.length === 0 || onGoingList[0].id !== data[0].id;

    if (isNewQueue) {
      updateQueue(data);
    } else if (index !== currentIndex) {
      setCurrentIndex(index);
    } else if (playing && index === currentIndex) {
      pause();
    } else {
      play();
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
    setVolume,
    togglePlayPause,
    setRate,
    mute,
    onNext,
    onPrevious,
  };
};

export default useAudioPlayback;
