import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { playlistUploadSchema } from "../utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";

export const visibility = ["public", "private"];

const PlaylistModal = ({ visible, initialValue, onRequestClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(playlistUploadSchema),
  });

  const [playlistInfo, setPlaylistInfo] = useState({
    title: "",
    visibility: false,
  });

  const handleClose = () => {
    setPlaylistInfo({ title: "", visibility: false });
    onRequestClose();
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("visibility", data.visibility);
    onSubmit(formData);
    handleClose();
  };

  useEffect(() => {
    if (initialValue) {
      setPlaylistInfo({ ...initialValue });
    }
  }, [initialValue]);

  return (
    <ModalContainer show={visible} onHide={handleClose}>
      <form
        className="py-5 px-4"
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="text-white title-header mb-5">New Playlist</div>

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
            {visibility.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </FormField>
        <div className="text-center">
          <button
            type="submit"
            className="login-btn p-2 text-white rounded-3 mt-4"
          >
            Create New Playlist
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default PlaylistModal;
