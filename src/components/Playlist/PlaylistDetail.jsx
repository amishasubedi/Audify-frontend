import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AudioPlayer from "../Audios/AudioPlayer";
import { getPlayerState } from "../../redux/Features/player_slice";
import PlaylistDetailCard from "../UI/PlaylistDetailCard";
import SuggestionsList from "../Audios/SuggestionList";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import { useFetchPlaylistDetail } from "../Hooks/query-hook";

const PlaylistDetail = () => {
  const { id } = useParams();
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);

  const { data, isLoading, error } = useFetchPlaylistDetail(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching playlist details: {error.message}</div>;
  }

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
              {" "}
              <p className="px-5 text-white col-xs-6">Nothing saved yet</p>
              <SuggestionsList onAudioClick={onAudioPress} />
            </>
          ) : (
            ""
            // render audios of playlist
          )}

          <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
        </div>
      </div>
    </Layout>
  );
};

export default PlaylistDetail;
