import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";

const ProfileContainer = ({
  avatar,
  name,
  followers,
  followings,
  verified,
  isOwnProfile,
  OnAddPictureClick,
}) => {
  const hasAvatar =
    avatar &&
    avatar !==
      "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg";

  return (
    <div
      className="profile-background"
      style={{
        backgroundImage: hasAvatar ? `url(${avatar})` : "none",
        backgroundColor: hasAvatar ? "transparent" : "gray",
      }}
    >
      {isOwnProfile && (
        <button
          className="btn btn-outline-light btn-lg"
          style={{ position: "absolute", zIndex: 2 }}
          onClick={OnAddPictureClick}
        >
          <BsPencil /> Edit Profile
        </button>
      )}

      <div
        className="gradient-overlay"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
        }}
      />

      <div
        className="profile-content px-5 text-white d-flex flex-column justify-content-end"
        style={{
          zIndex: 2,
          position: "absolute",
          bottom: 0,
          left: "5rem",
        }}
      >
        <h1 className="text-white fw-bold">
          {name} {verified && <BsCheckCircleFill color="green" />}
        </h1>
        <p className="text-white mb-3">
          Grammy nominated OneRepublic, is comprised of singer/songwriter and
          lead vocalist Ryan Tedder...
        </p>

        <div className="d-flex justify-content-start gap-2 mb-3">
          {isOwnProfile ? (
            <>
              <span>{followers} Followers</span>
              <span>{followings} Followings</span>
            </>
          ) : (
            <>
              <button className="btn btn-outline-light btn-sm">Follow</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
