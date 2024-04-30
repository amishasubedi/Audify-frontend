import React from "react";
import { useNavigate } from "react-router-dom";
import { useFetchRecommendedProfile } from "../Hooks/query-hook";
import "./Style.css";
import ArtistCard from "../UI/ArtistCard";

const RecommendedProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useFetchRecommendedProfile();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (userId) => {
    navigate(`/artists/${userId}`);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex flex-nowrap user-scroll-container">
        {data.map((user) => (
          <ArtistCard
            key={user.id}
            artist={user.name}
            imageURL={user.avatar}
            onCardClick={() => handleCardClick(user.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProfile;
