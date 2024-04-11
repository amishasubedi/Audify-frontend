import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const shouldSetTransparent = window.scrollY < 50;
      setIsTransparent(shouldSetTransparent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = isTransparent
    ? "header sticky-top text-white px-5 py-3 d-flex justify-content-between transparent-header"
    : "header sticky-top text-white px-5 py-3 d-flex justify-content-between";

  return (
    <div className={headerClass}>
      <div className="form-group has-search col-5 px-4">
        <span className="fa fa-search form-control-feedback"></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search songs, albums, artists, podcasts"
        />
      </div>
      <div className="d-flex align-items-center">
        <div className="dropdown">
          <button
            className="btn btn-secondary rounded-circle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#FF69B4",
              color: "#fff",
            }}
          >
            A
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <>
              <li>
                <NavLink to="/profile" className="dropdown-item">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings" className="dropdown-item">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/upload" className="dropdown-item">
                  Upload Music
                </NavLink>
              </li>
              <li>
                <NavLink to="/history" className="dropdown-item">
                  History
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-in" className="dropdown-item">
                  Logout
                </NavLink>
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
