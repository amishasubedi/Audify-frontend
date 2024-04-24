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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div style={{ backgroundColor: "#121212", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "white", marginBottom: "30px" }}>
        User Management
      </h1>
      <Table striped bordered hover variant="dark">
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
              style={{
                backgroundColor: "#1f1f1f",
                borderBottom: "1px solid #2f2f2f",
                cursor: "pointer",
              }}
              onClick={() => navigateToArtist(user.ID)}
            >
              <td>
                <img
                  src={
                    user.AvatarURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAbLAKcrr7XnWtKyukEnSoWbf-f2UGdMcYlw&s"
                  }
                  alt={user.Name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td style={{ color: "white" }}>
                <Link
                  to={`/artists/${user.ID}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <strong>{user.Name}</strong>
                </Link>
              </td>
              <td style={{ color: "white" }}>
                <strong>{user.Email}</strong>
              </td>
              <td style={{ color: "white" }}>
                {user.Verified ? (
                  <BsCheckCircle color="#28a745" />
                ) : (
                  <BsCircle color="#dc3545" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
