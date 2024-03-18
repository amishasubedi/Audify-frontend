import React, { useEffect } from "react";
import { getAuthState } from "../../redux/Features/user_slice";
import AudioCard from "../Shared/AudioCard";
import Player from "./player";
import { useSelector } from "react-redux";
import { useFetchLatestAudios } from "../Hooks/query-hook";

const Audio = () => {
  const { data, isLoading } = useFetchLatestAudios();
  console.log(data);

  if (isLoading)
    return (
      <div>
        <h2 className="color-white">Loading...</h2>
      </div>
    );

  return (
    <div>
      <h2>Render audio here</h2>
    </div>
  );
};

export default Audio;
