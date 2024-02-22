import React, { forwardRef } from "react";

const OTPField = forwardRef((props, ref) => {
  const inputClassName = `form-control text-center ${props.className || ""}`;

  return (
    <input
      {...props}
      ref={ref}
      className={inputClassName}
      style={{ width: "50px", height: "50px", borderRadius: "25px" }}
    />
  );
});

export default OTPField;
