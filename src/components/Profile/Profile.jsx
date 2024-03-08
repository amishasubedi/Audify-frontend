import React, { useState } from "react";
import Layout from "../Home/Layout";
import Header from "../Home/Header";
import "./Style.css";

const Profile = () => {
  // Dummy profile data
  const profileData = {
    name: "Am Updated 3",
    email: "as@gmail.com",
    avatarURL:
      "https://res.cloudinary.com/dalx1urcp/image/upload/v1708206645/snowman-1090261_640.jpg.jpg",
    followers: 124,
    followings: 75,
    verified: true,
    recentActivity: [
      { song: "End Game", artist: "Taylor Swift", plays: 21 },
      { song: "I Did Something Bad", artist: "Taylor Swift", plays: 15 },
      { song: "...Ready For It?", artist: "Taylor Swift", plays: 14 },
    ],
    favoriteArtists: [
      {
        name: "Taylor Swift",
        playtime: "8 hours",
        imageURL: "path-to-taylor-swift-image",
      },
      {
        name: "Ed Sheeran",
        playtime: "1 hour",
        imageURL: "path-to-ed-sheeran-image",
      },
    ],
  };

  return (
    <Layout>
      <Header />
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-card">
            <img
              className="profile-avatar"
              src={profileData.avatarURL}
              alt="Profile Avatar"
            />
            <div className="profile-info">
              <h1>{profileData.name}</h1>
              {profileData.verified && (
                <span className="verified-badge">Verified</span>
              )}
              <p className="profile-email">{profileData.email}</p>
              <div className="profile-stats">
                <div>
                  <strong>{profileData.followers}</strong> Followers
                </div>
                <div>
                  <strong>{profileData.followings}</strong> Followings
                </div>
              </div>
            </div>
          </div>
          <div className="favorite-artists">
            <h2>Favorite Artists</h2>
            {profileData.favoriteArtists.map((artist, index) => (
              <div className="artist-item" key={index}>
                <img src={artist.imageURL} alt={artist.name} />
                <p>{artist.name}</p>
                <p>{artist.playtime}</p>
              </div>
            ))}
          </div>
        </aside>
        <main className="main-content">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            {profileData.recentActivity.map((activity, index) => (
              <div className="activity-item" key={index}>
                <span className="song">{activity.song}</span>
                <span className="artist">{activity.artist}</span>
                <span className="plays">{activity.plays} plays</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Profile;
