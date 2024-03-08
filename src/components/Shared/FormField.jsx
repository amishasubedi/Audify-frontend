const FormField = ({
  id,
  label,
  register,
  registerOptions,
  errors,
  onChange,
  type = "text",
  children,
}) => (
  <div className="form-floating mb-3">
    {type !== "select" ? (
      <input
        type={type}
        className={`form-control ${errors[id] ? "is-invalid" : ""}`}
        id={id}
        placeholder={label}
        {...register(id, registerOptions)}
      />
    ) : (
      children
    )}
    <label htmlFor={id}>{label}</label>
    {errors[id] && <div className="text-danger">{errors[id].message}</div>}
  </div>
);

export default FormField;
