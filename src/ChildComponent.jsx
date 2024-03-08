import React from "react";
function ChildComponent({ action }) {
  // call the function once on mount
  React.useEffect(() => {
    action();
  }, []);

  return "I'm the child component!";
}

export default ChildComponent;
