import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className="background">
        <div className="layer"></div>
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
