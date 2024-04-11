import getClient from "../utils/client";

export const useAddSongToPlaylist = () => {
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

  return addSongToPlaylist;
};
