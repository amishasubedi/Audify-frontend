import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { editProfileSchema } from "../utils/validators";

const EditProfileModal = ({
  visible,
  initialValue = {},
  onRequestClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  const [selectedFileName, setSelectedFileName] = useState("");
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    reset({
      name: initialValue.name || "",
      bio: initialValue.bio || "",
      file: initialValue.avatarURL,
    });
    setImagePreview(initialValue.avatarURL);
  }, [initialValue, reset]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);

    if (data.picFile) {
      formData.append("picFile", data.picFile);
    }
    onSubmit(formData);
    onRequestClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("picFile", file, { shouldValidate: true });
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    trigger("picFile");
  };

  return (
    <ModalContainer show={visible} onHide={onRequestClose} className>
      <form
        className="py-5 px-4"
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className="text-white title-header mb-5">Edit Profile</div>

        <FormField
          id="name"
          label="Name"
          type="text"
          register={register}
          errors={errors}
        />

        <FormField
          id="bio"
          label="Bio"
          type="text"
          register={register}
          errors={errors}
        />

        <FormField
          id="picFile"
          label="Profile Picture"
          type="file"
          register={register}
          errors={errors}
          onChange={handleFileChange}
        />

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

export default EditProfileModal;
