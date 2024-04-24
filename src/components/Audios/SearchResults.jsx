import React from "react";
import { useLocation } from "react-router-dom";
import AudioListCard from "../UI/AudioListCard";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import ArtistCard from "../UI/ArtistCard";
import { useNavigate } from "react-router-dom";
import useFavorite from "../Hooks/useAPI";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state;
  const navigate = useNavigate();
  const { onAddToFavorite } = useFavorite();

  if (!results) {
    return <div>No search results available.</div>;
  }

  const handleAddToFavorite = async (audioId) => {
    await onAddToFavorite(audioId);
  };

  const { audios, artists } = results;

  const handleCardClick = (userId) => {
    navigate(`/artists/${userId}`);
  };

  return (
    <Layout>
      <Header />
      <div className="px-5">
        <div className="search-results-container px-5 mt-5">
          <h2 className="text-white">Search Results</h2>
          {artists.length > 0 ? (
            <div className="container-fluid">
              <div className="d-flex flex-nowrap playlist-scroll-container">
                {artists.map((user) => (
                  <ArtistCard
                    key={user.ID}
                    artist={user.Name}
                    imageURL={
                      user.AvatarURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbLAKcrr7XnWtKyukEnSoWbf-f2UGdMcYlw&s"
                    }
                    onCardClick={() => handleCardClick(user.ID)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white">No artist results found.</p>
          )}

          {audios.length > 0 ? (
            <div className="audio-results">
              <table className="playlist-table">
                <tbody>
                  {" "}
                  <h3 className="text-white">Audios</h3>
                  {audios.map((audio) => (
                    <AudioListCard
                      key={audio.ID}
                      title={audio.Title}
                      artistId={audio.Owner}
                      imageUrl={
                        audio.CoverURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbLAKcrr7XnWtKyukEnSoWbf-f2UGdMcYlw&s"
                      }
                      category={audio.Category}
                      onAddToFavoriteClick={() => handleAddToFavorite(audio.ID)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-white">No audio results found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
