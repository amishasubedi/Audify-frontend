import { useParams } from "react-router-dom";
import CategoryAudios from "../Audios/CategoryAudios";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import Header from "./Header";
import Layout from "./Layout";

const CategoryAudioPage = () => {
  const { categoryName } = useParams();
  const { onAudioPress } = useAudioPlayback();

  const displayCategoryName =
    categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <Layout>
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
        </div>
      </div>
    </Layout>
  );
};

export default CategoryAudioPage;
