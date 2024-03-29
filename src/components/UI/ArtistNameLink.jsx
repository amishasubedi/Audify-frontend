import React from "react";
import { Link } from "react-router-dom";

const ArtistLink = ({ name, artistId }) => {
  return (
    <Link to={`/artists/${artistId}`} className="artist-link">
      {name}
    </Link>
  );
};

export default ArtistLink;
