import React from "react";
import "./Style.css";

const FileSelectInput = ({ BtnTitle, onSelect }) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={type}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        id={id}
        placeholder={label}
        {...register(id, registerOptions)}
      />
    </div>
  );
};

export default FileSelectInput;
