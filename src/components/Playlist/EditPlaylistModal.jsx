import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { editPlaylistSchema } from "../utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";

export const visibility = ["public", "private"];

const EditPlaylistModal = ({
  visible,
  initialValue,
  onRequestClose,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPlaylistSchema),
  });

  useEffect(() => {
    if (initialValue) {
      reset(initialValue);
    }
  }, [initialValue, reset]);

  const handleClose = () => {
    onRequestClose();
  };

  const handleFormSubmit = (data) => {
    onUpdate(data);
    handleClose();
  };

  return (
    <ModalContainer show={visible} onHide={handleClose}>
      <form
        className="py-5 px-4"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="text-white title-header mb-5">Edit Playlist</div>

        <FormField
          id="title"
          label="Title"
          type="text"
          register={register}
          errors={errors}
          defaultValue={initialValue.title}
        />

        <FormField
          id="visibility"
          label="Visibility"
          type="select"
          register={register}
          errors={errors}
          defaultValue={initialValue.visibility}
        >
          <select
            className="form-control"
            id="visibility"
            {...register("visibility")}
          >
            <option value="">Select Visibility Option</option>
            {visibility.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </FormField>

        <div className="text-center">
          <button
            type="submit"
            className="login-btn p-2 text-white rounded-3 mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditPlaylistModal;
