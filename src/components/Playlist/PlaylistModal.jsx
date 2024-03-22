import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

const PlaylistModal = ({ visible, initialValue, onRequestClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
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

  const handleFormSubmit = (data, event) => {
    onSubmit(playlistInfo);
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
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
        noValidate
      >
        <div className="text-white font-bold">Create New Playlist</div>
        <FormField
          id="title"
          label="Title"
          type="title"
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
            id="category"
            {...register("category")}
          >
            <option value="">Select Visibility Option</option>
            <option value="music">Public</option>
            <option value="podcast">Private</option>
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
