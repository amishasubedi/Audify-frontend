import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import getClient from "../utils/client";
import { useNavigate } from "react-router-dom";
import useAudioPlayback from "../Hooks/useAudioPlayback";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateAlert } from "../../redux/Features/alert_slice";
import {
  getAuthState,
  updateLoggedInState,
  updateProfile,
} from "../../redux/Features/user_slice";
import catchAsyncError from "../utils/AsyncErrors";
import {
  updateOnGoingAudio,
  updateOnGoingList,
} from "../../redux/Features/player_slice";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { stop } = useAudioPlayback();
  const { profile } = useSelector(getAuthState);

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

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jsonwebtoken");
      const client = await getClient();
      await client.post("/users/logout", `token=${encodeURIComponent(token)}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      stop();
      dispatch(
        updateAlert({
          message: "User successfully logged out",
          type: "success",
        })
      );

      dispatch(updateLoggedInState(false));
      dispatch(updateProfile(""));
      dispatch(updateOnGoingAudio(""));
      dispatch(updateOnGoingList(""));
      localStorage.removeItem("jsonwebtoken");
      navigate("/");
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

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
            {profile.name.charAt(0)}
          </button>
          <ul
            className="dropdown-menu bg-dark"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <NavLink to="/profile" className="dropdown-item text-white">
                <i className="fa fa-user me-2"></i>
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/upload" className="dropdown-item text-white">
                <i className="fa fa-cloud-upload-alt me-2"></i>
                Upload Music
              </NavLink>
            </li>

            <li>
              <div className="dropdown-item text-white" onClick={handleLogout}>
                <i className="fa fa-sign-out-alt me-2"></i>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
