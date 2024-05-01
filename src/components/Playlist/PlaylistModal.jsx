import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { playlistUploadSchema, editPlaylistSchema } from "../utils/validators";
import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";

export const visibilityOptions = ["public", "private"];

const PlaylistModal = ({
  visible,
  isEditing = false,
  initialValue = { title: "", visibility: "" },
  onRequestClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(
      isEditing ? editPlaylistSchema : playlistUploadSchema
    ),
    defaultValues: initialValue,
  });

  const handleClose = () => {
    onRequestClose();
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    handleClose();
  };

  useEffect(() => {
    setValue("title", initialValue.title || "");
    setValue("visibility", initialValue.visibility || "");
  }, [initialValue, setValue]);

  return (
    <ModalContainer show={visible} onHide={handleClose}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <div className="text-white title-header mb-5">
          {isEditing ? "Edit Playlist" : "New Playlist"}
        </div>

        <FormField
          id="title"
          label="Title"
          type="text"
          register={register}
          errors={errors}
        />

        <FormField
          id="visibility"
          label="Visibility"
          type="select"
          register={register}
          errors={errors}
        >
          <select
            className="form-control"
            id="visibility"
            {...register("visibility")}
          >
            <option value="">Select Visibility Option</option>
            {visibilityOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
                {option === "public" && <i className="fas fa-globe" />}
                {option === "private" && <i className="fas fa-lock" />}
              </option>
            ))}
          </select>
        </FormField>

        <div className="text-center">
          <button
            type="submit"
            className="login-btn p-2 text-white rounded-3 mt-4"
          >
            {isEditing ? "Save Changes" : "Create New Playlist"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default PlaylistModal;
