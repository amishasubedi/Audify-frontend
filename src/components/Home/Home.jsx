import Categories from "./Categories";
import Header from "./Header";
import "./Style.css";

const Home = () => {
  return (
    <>
      <div className="background">
        <div className="layer"></div>
        <Header />
        <Categories />
      </div>
    </>
  );
};

export default Home;
