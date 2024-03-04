import React, { useContext } from "react";
import { useUser } from "../Context/user_context";
import { NavLink, useNavigate } from "react-router-dom";

const ProtectedLink = ({ to, children, ...rest }) => {
  const { userDetails } = useUser();
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (!userDetails.userId) {
      e.preventDefault();
      alert("Please sign in first");
      navigate("/sign-in");
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} {...rest}>
      {children}
    </NavLink>
  );
};

export default ProtectedLink;
