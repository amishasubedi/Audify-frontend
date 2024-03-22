import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import PlaylistModal from "../Playlist/PlaylistModal";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOnAddToPlaylist = () => {
    setShowModal(true);
    console.log("Open the modal");
    console.log("Modal ?", showModal);
  };

  const handlePlaylistSubmit = () => {
    console.log("Created new playlist");
  };

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
              onSubmit={handlePlaylistSubmit}
            />

            <NavLink exact to="/favorites" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="heart" className="NavLink">
                Liked Music
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/playlist" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="book" className="NavLink">
                Playlist 1
              </CDBSidebarMenuItem>
            </NavLink>
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
