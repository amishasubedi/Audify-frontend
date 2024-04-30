import React from "react";
import { useLocation } from "react-router-dom";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import ArtistCard from "../UI/ArtistCard";
import { useNavigate } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state;
  const navigate = useNavigate();

  if (!results) {
    return <div>No search results available.</div>;
  }

  const { artists } = results;

  const handleCardClick = (userId) => {
    navigate(`/artists/${userId}`);
  };

  return (
    <Layout>
      <Header />
      <div className="px-5">
        <div className="search-results-container px-5 mt-5">
          <h2 className="text-white">Search Results</h2>
          {artists?.length > 0 ? (
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
        </div>
      </div>
    </Layout>
  );
};

export default SearchResults;
