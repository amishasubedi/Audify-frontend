import { NavLink } from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: "Energize", path: "/category/energize" },
    { name: "Relax", path: "/category/relax" },
    { name: "Workout", path: "/category/workout" },
    { name: "Study", path: "/category/study" },
    { name: "Party", path: "/category/party" },
    { name: "Chill", path: "/category/chill" },
  ];

  return (
    <div className="justify-content-right px-4 py-1 mt-5">
      <div className="px-5">
        {categories.map((category, index) => (
          <NavLink key={index} exact to={category.path} className="mx-2 ">
            <button className="category-btn text-white p-2 px-4">
              {category.name}
            </button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Categories;
