import React from "react";
import CategoryAudios from "../Audios/CategoryAudios";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import Header from "../Home/Header";
import Layout from "../Home/Layout";

export const categories = [
  "Pop",
  "Relax",
  "Gym",
  "Study",
  "Energise",
  "Commute",
  "Rock",
  "Podcast",
  "Sleep",
];

const Explore = () => {
  const { onAudioPress } = useAudioPlayback();

  return (
    <Layout>
      <Header />
      <div className="row px-5">
        <div className="px-5">
          {categories.map((category) => (
            <div key={category} className="my-5">
              <h3 className="text-white">{`Explore ${category}`}</h3>
              <CategoryAudios
                onAudioClick={onAudioPress}
                categoryName={category.toLowerCase()}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
