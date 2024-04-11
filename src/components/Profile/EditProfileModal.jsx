import React from "react";
import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProfileSchema } from "../utils/validators";

const EditProfileModal = ({
  visible,
  initialValue,
  onRequestClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: initialValue?.name ?? "",
    },
  });

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    if (data.picFile) {
      console.log("file", data.picFile);
      formData.append("picFile", data.picFile);
    }
    onSubmit(formData);
    onRequestClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("picFile", file, { shouldValidate: true });
    } else {
      setValue("picFile", null);
    }
    trigger("picFile");
  };

  return (
    <ModalContainer show={visible} onHide={onRequestClose}>
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
