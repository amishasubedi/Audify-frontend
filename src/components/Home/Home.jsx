import Categories from "./Categories";
import Audio from "../Audios/Audio";
import Header from "./Header";
import "./Style.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="row">
        <div className="col-8 px-1">
          <Categories />
        </div>
        <div className="col-8 px-3">
          <Audio />
        </div>
      </div>
    </>
  );
};

export default Home;
