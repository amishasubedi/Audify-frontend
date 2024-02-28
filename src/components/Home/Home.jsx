import Sidebar from "./Sidebar";

const Home = ({ children }) => {
  return (
    <div>
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default Home;
