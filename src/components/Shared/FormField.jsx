// Inside your FormField.jsx (or wherever the FormField component is defined)

const FormField = ({
  id,
  label,
  register,
  registerOptions,
  errors,
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
    {errors[id] && <div className="invalid-feedback">{errors[id].message}</div>}
  </div>
);

export default FormField;
