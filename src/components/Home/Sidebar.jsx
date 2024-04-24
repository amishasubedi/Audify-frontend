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
import PlaybackButton from "../UI/PlaybackButton";
import DeleteModal from "../UI/DeleteModal";

import { useQueryClient } from "react-query";
import getClient from "../utils/client";
import catchAsyncError from "../utils/AsyncErrors";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useFetchPersonalPlaylist();
  const { reset } = useCustomForm();
  const queryClient = useQueryClient();

  const [CreatePlaylist, { isLoading, isSuccess, isError }] =
    useCreatePlaylistMutation();

  const handleOnAddToPlaylist = () => {
    setShowModal(true);
  };

  const handleDeletePlaylist = async (playlistId) => {
    console.log("Deleting playlist with id:", playlistId);

    try {
      const client = await getClient();
      await client.delete(`/playlist/delete/${playlistId}`);
      navigate("/home");

      queryClient.invalidateQueries("personal-playlist");
      dispatch(
        updateAlert({
          message: "Sucessfully deleted playlist",
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }

    setShowDeleteModal(false);
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
            href="/home"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Audify
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/home">
              <CDBSidebarMenuItem icon="home" className="NavLink">
                Home
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/explore">
              <CDBSidebarMenuItem icon="compass" className="NavLink">
                Explore
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

            <NavLink exact to="/favorites">
              <CDBSidebarMenuItem icon="heart" className="NavLink">
                Liked Music
              </CDBSidebarMenuItem>
            </NavLink>
            <div>
              {" "}
              {data &&
                data.map((playlist) => (
                  <div
                    key={playlist.id}
                    className="playlist-item d-flex justify-content-between align-items-center"
                  >
                    <NavLink
                      exact
                      to={`/playlists/${playlist.id}`}
                      className="text-truncate"
                    >
                      <CDBSidebarMenuItem
                        icon="book"
                        className="title-playlist"
                      >
                        {playlist.title}
                      </CDBSidebarMenuItem>
                    </NavLink>
                    <PlaybackButton
                      size={45}
                      onClick={() => {
                        setSelectedPlaylistId(playlist.id);
                        setShowDeleteModal(true);
                      }}
                      className="playback-button"
                    >
                      <i className="fa fa-trash" />
                    </PlaybackButton>
                  </div>
                ))}
              <DeleteModal
                visible={showDeleteModal}
                onRequestClose={() => setShowDeleteModal(false)}
                onConfirmDelete={() => handleDeletePlaylist(selectedPlaylistId)}
              />
            </div>
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
