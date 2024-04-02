import useAudioPlayback from "../Hooks/useAudioPlayback";
import { useParams } from "react-router-dom";
import { getPlayerState } from "../../redux/Features/player_slice";
import { PlayerProvider } from "../Context/player-context";
import CategoryAudios from "../Audios/CategoryAudios";
import { useSelector } from "react-redux";
import Layout from "./Layout";
import AudioPlayer from "../Audios/AudioPlayer";
import Header from "./Header";
import SuggestionsList from "../Audios/SuggestionList";

const CategoryAudioPage = () => {
  const { categoryName } = useParams();
  const { onAudioPress } = useAudioPlayback();
  const { onGoingAudio } = useSelector(getPlayerState);

  const displayCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <Layout>
      <PlayerProvider>
        <Header />
        <div className="row">
          <div className="px-5">
            <h3 className="text-white px-5 mt-5">{`Explore ${displayCategoryName}`}</h3>
            <div className="px-5 bg-transparent">
              <CategoryAudios
                onAudioClick={onAudioPress}
                categoryName={categoryName}
              />
            </div>
            <div>{onGoingAudio ? <AudioPlayer /> : null}</div>
          </div>

          {/* <div>
            <h3 className="text-white px-5 mt-5">Explore more songs</h3>
            <SuggestionsList onAudioClick={onAudioPress} />
          </div> */}
        </div>
      </PlayerProvider>
    </Layout>
  );
};

export default CategoryAudioPage;
