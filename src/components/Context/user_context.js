import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    userId: null,
    name: "",
    email: "",
    followers: "",
    followings: "",
  });

  const saveUserDetails = (details) => {
    setUserDetails((prevDetails) => ({ ...prevDetails, ...details }));
  };

  return (
    <UserContext.Provider value={{ userDetails, saveUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
