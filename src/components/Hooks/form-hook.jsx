import { useForm } from "react-hook-form";

const useCustomForm = (onSubmit) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    reset,
  };
};

export default useCustomForm;
