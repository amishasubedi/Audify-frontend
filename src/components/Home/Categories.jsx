import { NavLink } from "react-router-dom";

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

const Categories = () => {
  const categories = [
    { name: "Pop", path: "/category/pop" },
    { name: "Relax", path: "/category/relax" },
    { name: "Gym", path: "/category/gym" },
    { name: "Study", path: "/category/study" },
    { name: "Energise", path: "/category/energise" },
    { name: "Commute", path: "/category/commute" },
    { name: "Rock", path: "/category/rock" },
    { name: "Podcast", path: "/category/podcast" },
    { name: "Sleep", path: "/category/sleep" },
  ];

  return (
    <div className="d-flex px-5 mt-5 justify-content-start align-items-center">
      {categories.map((category, index) => (
        <NavLink key={index} exact to={category.path}>
          <button className="category-btn text-white p-2 px-4 mx-2">
            {category.name}
          </button>
        </NavLink>
      ))}
    </div>
  );
};

export default Categories;
