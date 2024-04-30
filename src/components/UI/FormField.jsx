const FormField = ({
  id,
  label,
  register,
  registerOptions,
  errors,
  onChange,
  type = "text",
  children,
}) => {
  return (
    <div className="form-floating mb-3">
      {type === "select" ? (
        children
      ) : type === "file" ? (
        <>
          <input
            type={type}
            className={`form-control ${errors[id] ? "is-invalid" : ""}`}
            id={id}
            placeholder={label}
            onChange={onChange}
          />
        </>
      ) : (
        <>
          <input
            type={type}
            className={`form-control ${errors[id] ? "is-invalid" : ""}`}
            id={id}
            placeholder={label}
            {...(register && register(id, registerOptions))}
          />
        </>
      )}
      <label htmlFor={id} className="text-black">
        {label}
      </label>
      {errors[id] && <div className="text-danger">{errors[id].message}</div>}
    </div>
  );
};

export default FormField;
