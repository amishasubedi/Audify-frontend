import React from "react";
import { useFetchAllUsers } from "../../Hooks/query-hook";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsCheckCircle, BsCircle } from "react-icons/bs";

const UsersList = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError } = useFetchAllUsers();

  const navigateToArtist = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (isError) {
    return <div style={styles.error}>Error fetching users.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>User Management</h1>
      <Table striped bordered hover variant="dark" style={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.ID}
              style={styles.userRow}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#2f2f2f")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#1f1f1f")
              }
              onClick={() => navigateToArtist(user.ID)}
            >
              <td style={styles.avatarCell}>
                <img
                  src={user.AvatarURL || "default-avatar.png"} // Place a local default avatar image in your project
                  alt={user.Name}
                  style={styles.avatar}
                />
              </td>
              <td>
                <Link to={`/artists/${user.ID}`} style={styles.link}>
                  {user.Name}
                </Link>
              </td>
              <td>{user.Email}</td>
              <td>
                {user.Verified ? (
                  <BsCheckCircle style={styles.verified} />
                ) : (
                  <BsCircle style={styles.notVerified} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)", // Subtle shadow for depth
  },
  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "30px",
    fontSize: "2rem", // Larger title font
  },
  loading: {
    color: "white",
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  table: {
    // Overrides for Bootstrap styles if needed
  },
  userRow: {
    backgroundColor: "#1f1f1f",
    borderBottom: "1px solid #2f2f2f",
    cursor: "pointer",
    transition: "background-color 0.3s", // Smooth background transition on hover
    "&:hover": {
      backgroundColor: "#2f2f2f", // Darker on hover
    },
  },
  avatarCell: {
    width: "80px", // Fixed width for the avatar cell
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  verified: {
    color: "#28a745",
  },
  notVerified: {
    color: "#dc3545",
  },
};

export default UsersList;
