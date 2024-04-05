import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";
import getClient from "../utils/client";

const fetchLatest = async () => {
  const client = await getClient();
  const { data } = await client("/audio/latest-uploads");
  return data.audios;
};

export const useFetchLatestAudios = () => {
  const dispatch = useDispatch();

  return useQuery(["latest-uploads"], {
    queryFn: fetchLatest,

    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    },
  });
};

const fetchRecommendationForPlaylist = async () => {
  const client = await getClient();
  const { data } = await client("/audio/recommendation");
  return data.audios;
};

export const useFetchRecommendation = () => {
  const dispatch = useDispatch();

  return useQuery(["recommendation"], {
    queryFn: fetchRecommendationForPlaylist,

    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    },
  });
};

const fetchPlaylistDetails = async (playlistId) => {
  const client = await getClient();
  const { data } = await client(`/playlist/detail/${playlistId}`);
  return data.playlist;
};

export const useFetchPlaylistDetail = (playlistId) => {
  const dispatch = useDispatch();

  return useQuery(
    ["playlist-details", playlistId],
    () => fetchPlaylistDetails(playlistId),
    {
      onError: (err) => {
        const errorMessage = catchAsyncError(err);
        dispatch(updateAlert({ message: errorMessage, type: "error" }));
      },
    }
  );
};

const fetchAudiosByCategory = async (category) => {
  const client = await getClient();
  const { data } = await client(`/audio/category?category=${category}`);
  return data.audios;
};

export const useFetchAudiosByCategory = (category) => {
  const dispatch = useDispatch();

  return useQuery(
    ["audios-by-category", category],
    () => fetchAudiosByCategory(category),
    {
      onError(err) {
        const errorMessage = catchAsyncError(err);
        dispatch(updateAlert({ message: errorMessage, type: "error" }));
      },
      enabled: !!category,
    }
  );
};

const fetchPersonalPlaylist = async () => {
  const client = await getClient();
  const { data } = await client("/profile/my-playlist");
  return data.audios;
};

export const useFetchPersonalPlaylist = () => {
  const dispatch = useDispatch();

  return useQuery(["personal-playlist"], {
    queryFn: fetchPersonalPlaylist,

    onError(err) {
      const errorMessage = catchAsyncError(err);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    },
  });
};

const fetchAudiosByPlaylist = async (playlistId) => {
  const client = await getClient();
  const { data } = await client(`/playlist/${playlistId}`);
  console.log("Data in playlist", data);
  return data.audios;
};

export const useFetchAudiosByPlaylist = (playlistId) => {
  const dispatch = useDispatch();

  return useQuery(
    ["playlist-audios", playlistId],
    () => fetchAudiosByPlaylist(playlistId),
    {
      onError: (err) => {
        const errorMessage = catchAsyncError(err);
        dispatch(updateAlert({ message: errorMessage, type: "error" }));
      },
    }
  );
};
