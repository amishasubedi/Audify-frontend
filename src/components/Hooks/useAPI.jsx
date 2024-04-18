import getClient from "../utils/client";
import catchAsyncError from "../utils/AsyncErrors";
import { useDispatch } from "react-redux";

import { updateAlert } from "../../redux/Features/alert_slice";
import { useQueryClient } from "react-query";

const useFavorite = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const addSongToPlaylist = async (audioId, playlistId) => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);
      formData.append("playlistId", playlistId);
      const client = await getClient();
      await client.post("/playlist/add", formData);
    } catch (error) {
      throw error;
    }
  };

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

  const onRemoveFromFavorite = async (audioId) => {
    try {
      let formData = new FormData();
      formData.append("audioId", audioId);

      const client = await getClient();
      await client.post("/favorite/delete", formData);

      queryClient.invalidateQueries("personal-favorite");

      dispatch(
        updateAlert({
          message: "Removed from favorite list",
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  return { addSongToPlaylist, onAddToFavorite, onRemoveFromFavorite };
};

export default useFavorite;
