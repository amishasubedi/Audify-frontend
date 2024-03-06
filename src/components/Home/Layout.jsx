import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1">
        <>
          <div className="background">
            <div className="layer"></div>
            {children}
          </div>
        </>
      </main>
    </div>
  );
};

export default Layout;
