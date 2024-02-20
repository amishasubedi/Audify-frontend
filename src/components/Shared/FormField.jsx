import React from "react";

const FormField = ({
  id,
  label,
  register,
  registerOptions,
  errors,
  type = "text",
}) => (
  <div className="form-floating mb-3">
    <input
      type={type}
      className={`form-control ${errors[id] ? "is-invalid" : ""}`}
      id={id}
      placeholder={label}
      {...register(id, registerOptions)}
    />
    {errors[id] && <p className="errorMsg">{errors[id].message}</p>}
    <label htmlFor={id}>{label}</label>
  </div>
);

export default FormField;
