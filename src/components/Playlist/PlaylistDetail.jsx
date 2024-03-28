import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AudioPlayer from "../Audios/AudioPlayer";
import { getPlayerState } from "../../redux/Features/player_slice";
import PlaylistDetailCard from "../UI/PlaylistDetailCard";
import SuggestionsList from "../Audios/SuggestionList";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import Layout from "../Home/Layout";
import Header from "../Home/Header";

const PlaylistDetail = () => {
  const { id } = useParams();
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);

  //   useEffect(() => {
  //     const fetchPlaylistDetails = async () => {
  //       try {
  //         const response = await axios.get(`/api/playlists/${id}`);
  //         setPlaylistDetails(response.data);
  //       } catch (error) {
  //         console.error("Error fetching playlist details:", error);
  //       }
  //     };

  //     fetchPlaylistDetails();
  //   }, [id]);

  return (
    <Layout>
      <Header />
      <div className="container">
        <PlaylistDetailCard
          playlistName="Playlist1"
          visibility="private"
          count="5"
          artist="Amisha Subedi"
        />
        <SuggestionsList onAudioClick={onAudioPress} />
        <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
      </div>
    </Layout>
  );
};

export default PlaylistDetail;
