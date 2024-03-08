import React from "react";
import ChildComponent from "./ChildComponent";

function ParentComponent(props) {
  // the function
  function yourFunction() {
    alert("The function has been called!");
  }

  return <ChildComponent action={yourFunction} />;
}

export default ParentComponent;
