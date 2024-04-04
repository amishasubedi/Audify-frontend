import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";
import PlaylistModal from "../Playlist/PlaylistModal";
import { useDispatch } from "react-redux";
import { useCreatePlaylistMutation } from "../../redux/Services/api_service";
import useCustomForm from "../Hooks/form-hook";
import { updateAlert } from "../../redux/Features/alert_slice";
import { useFetchPersonalPlaylist } from "../Hooks/query-hook";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [CreatePlaylist, { isLoading, isSuccess, isError }] =
    useCreatePlaylistMutation();

  const { data } = useFetchPersonalPlaylist();

  const { reset } = useCustomForm();
  const dispatch = useDispatch();

  const handleOnAddToPlaylist = () => {
    setShowModal(true);
  };

  const handleUpload = async (formData) => {
    try {
      const response = await CreatePlaylist(formData).unwrap();
      dispatch(
        updateAlert({
          message: "successfully created new playlist",
          type: "success",
        })
      );

      if (response.playlist && response.playlist.id) {
        navigate(`/playlists/${response.playlist.id}`);
      }
    } catch (error) {
      dispatch(
        updateAlert({
          message: "can't create new playlist",
          type: "error",
        })
      );
      reset();
    }
  };

  React.useEffect(() => {
    if (isError) {
      alert("Some thing went wrong, Please try again");
      reset();
    }
  }, [isSuccess, isError, navigate, isLoading, reset]);

  return (
    <div className="d-flex flex-column">
      <CDBSidebar
        style={{
          backgroundColor: "black",
          position: "fixed",
        }}
        textColor="#fff"
      >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Audify
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home" className="NavLink">
                Home
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/explore" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="compass" className="NavLink">
                Explore
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/library" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="music" className="NavLink">
                Library
              </CDBSidebarMenuItem>
            </NavLink>
            <hr />
            <div className="d-flex justify-content-center">
              <div>
                <button
                  className=" text-white p-1 px-5 playlist-btn"
                  onClick={handleOnAddToPlaylist}
                >
                  + New Playlist
                </button>
              </div>
            </div>

            <PlaylistModal
              visible={showModal}
              onRequestClose={() => {
                setShowModal(false);
              }}
              onSubmit={handleUpload}
            />

            <NavLink exact to="/favorites" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="heart" className="NavLink">
                Liked Music
              </CDBSidebarMenuItem>
            </NavLink>
            {data &&
              data.map((playlist) => (
                <NavLink
                  key={playlist.id}
                  exact
                  to={`/playlist/${playlist.id}`}
                  activeClassName="activeClicked"
                >
                  <CDBSidebarMenuItem icon="book" className="NavLink">
                    {playlist.title}
                  </CDBSidebarMenuItem>
                </NavLink>
              ))}

            <NavLink exact to="/ep-later" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="tv" className="NavLink">
                Episodes for later
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 5px" }}>Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
