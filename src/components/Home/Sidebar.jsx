import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  return (
    <div className="container-fluid p-0 d-flex vh-100">
      <div
        id="bdSidebar"
        className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white"
        style={{ width: "280px" }}
      >
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <i className="bi bi-music-note-list fs-2 me-3"></i>
          <span className="fs-4">Audify</span>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="/" className="nav-link active" aria-current="page">
              <i className="bi bi-house-door-fill me-2"></i>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link text-white">
              <i className="bi bi-compass-fill me-2"></i>
              Explore
            </a>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link text-white">
              <i className="bi bi-collection-fill me-2"></i>
              Library
            </a>
          </li>

          <hr />
          <div>
            <a
              href="/"
              className="d-flex align-items-center text-white text-decoration-none "
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <button>+New Playlist</button>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              {/* Dropdown items */}
            </ul>
          </div>
          <div className="pt-4">
            <a
              href="/"
              className="d-flex align-items-center text-white pb-3 text-decoration-none"
            >
              <i className="bi bi-heart-fill me-2"></i>
              Liked Music
            </a>
            <a
              href="/"
              className="d-flex align-items-center text-white pb-3 text-decoration-none"
            >
              <i className="bi bi-music-note-list me-2"></i>
              Old Nepali
            </a>
            <a
              href="/"
              className="d-flex align-items-center text-white text-decoration-none"
            >
              <i className="bi bi-clock-fill me-2"></i>
              Episodes for Later
            </a>
          </div>
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
