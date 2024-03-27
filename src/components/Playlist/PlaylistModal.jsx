import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getCategoryValidationRules,
  getTitleValidationRules,
} from "../utils/validators";

const PlaylistModal = ({ visible, initialValue, onRequestClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          type="title"
          registerOptions={getTitleValidationRules}
          register={register}
          errors={errors}
        />
        <FormField
          id="visibility"
          label="Visibility"
          type="select"
          registerOptions={getCategoryValidationRules}
          register={register}
          errors={errors}
        >
          <select
            className="form-control"
            id="visibility"
            {...register("visibility")}
          >
            <option value="">Select Visibility Option</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
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
