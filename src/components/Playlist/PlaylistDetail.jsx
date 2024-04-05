import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AudioPlayer from "../Audios/AudioPlayer";
import { getPlayerState } from "../../redux/Features/player_slice";
import PlaylistDetailCard from "../UI/PlaylistDetailCard";
import SuggestionsList from "../Audios/SuggestionList";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import getClient from "../utils/client";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";
import { useFetchPlaylistDetail } from "../Hooks/query-hook";
import AudioList from "../Audios/AudioList";

const PlaylistDetail = ({ onAudioClick }) => {
  const { id } = useParams();
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useFetchPlaylistDetail(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching playlist details: {error.message}</div>;
  }

  const onAddToPlaylist = async (audioId) => {
    try {
      const client = await getClient();
      await client.post(
        "/playlist/update-playlist",
        JSON.stringify({
          id: Number(id),
          item: audioId,
        }),

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(updateAlert({ message: "New audio added", type: "success" }));
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  return (
    <Layout>
      <Header />
      <div className="container px-5">
        <div className="px-5">
          <PlaylistDetailCard
            playlistName={data.title}
            visibility={data.visibility}
            count={data.song_count}
            artist={data.owner_name}
          />
          {data.song_count === 0 ? (
            <>
              <p className="px-5 text-white col-xs-6">Nothing saved yet</p>
              <SuggestionsList
                onAudioClick={onAudioPress}
                onAddToPlaylistClick={onAddToPlaylist}
              />
            </>
          ) : (
            <>
              <AudioList
                onAudioClick={onAudioPress}
                playlistId={id}
                playlistName={data.title}
              />
            </>
          )}

          <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistDetail;
