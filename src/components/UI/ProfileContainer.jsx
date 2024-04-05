const ProfileContainer = ({
  avatar,
  name,
  verified,
  followers,
  followings,
  email,
}) => {
  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="profile-card">
          <img
            className="profile-avatar"
            src={
              avatar ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_B4dHzhqmPqFfpNYtr2xb0clABZxs2Hb12w&s"
            }
            alt={`${name}'s Avatar`}
          />
          <div className="profile-info">
            <h1>{name}</h1>
            {verified && <span className="verified-badge">Verified</span>}
            <p className="profile-email">{email}</p>
            <div className="profile-stats">
              <div>
                <strong>{followers}</strong> Followers
              </div>
              <div>
                <strong>{followings}</strong> Followings
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfileContainer;
