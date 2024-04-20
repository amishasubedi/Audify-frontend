// import React from "react";

// const ArtistCard = () => {
//   return (
//     <div className="d-flex align-items-center bg-transparent">
//       <img
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GYqWpGFiLZKCCKigoLrazGQ_enZmK9vgtQ&s"
//         alt=""
//         className="rounded-circle  me-3"
//         style={{ width: "100px", height: "100px", objectFit: "cover" }}
//       />
//       <h5 className="text-white mb-0">"Amisha Subedi"</h5>
//       <p className="text-muted">10M subscribers</p>
//     </div>
//   );
// };

// export default ArtistCard;

import React from "react";

const ArtistCard = () => {
  return (
    <div className="mb-5">
      <div className="row align-items-center">
        <div className="col-auto">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8GYqWpGFiLZKCCKigoLrazGQ_enZmK9vgtQ&s"
            alt=""
            className="rounded-circle"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="mt-2 mb-5">
          <h4 className="mb-0 text-white mb-5">Amisha Subedi</h4>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
