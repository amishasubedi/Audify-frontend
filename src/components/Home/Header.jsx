import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../Context/user_context";

const Header = () => {
  const { userDetails, saveUserDetails } = useUser();

  return (
    <div className="text-white px-5 py-3 d-flex justify-content-between">
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
            {userDetails.userId ? (
              <>
                {/* Links for logged in users */}
                <li>
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="dropdown-item">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/upload" className="dropdown-item">
                    Upload Music
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="dropdown-item">
                    History
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item">Logout</button>
                </li>
              </>
            ) : (
              <>
                {/* Link for users not logged in */}
                <li>
                  <Link to="/sign-in" className="dropdown-item">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
