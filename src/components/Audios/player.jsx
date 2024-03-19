import React from "react";

function GridExample() {
  // Creating an array with 3 items to represent the rows
  const rows = Array(3).fill(null);

  return (
    <div
      className="container"
      style={{ border: "1px solid #000", padding: "1rem" }}
    >
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="row g-3">
          <div className="col">1 of 4</div>
          <div className="col">2 of 4</div>
          <div className="col">3 of 4</div>
          <div className="col">4 of 4</div>
        </div>
      ))}
    </div>
  );
}

export default GridExample;
