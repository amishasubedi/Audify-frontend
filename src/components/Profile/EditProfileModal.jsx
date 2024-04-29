import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormField from "../UI/FormField";
import ModalContainer from "../UI/ModalContainer";
import { editProfileSchema } from "../utils/validators";

const EditProfileModal = ({
  visible,
  initialValue = {},
  onRequestClose,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (Object.keys(initialValue).length) {
      reset({
        name: initialValue.name || "",
        bio: initialValue.bio || "",
        avatarURL: initialValue.avatarURL,
      });
    }
  }, [initialValue, reset]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log(value, name, type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    if (data.picFile) {
      formData.append("picFile", data.picFile);
    }

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    onSubmit(formData);
    onRequestClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null;
    if (file) {
      setValue("picFile", file, { shouldValidate: true });
      trigger("picFile");
    }
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
            {isLoading ? "Saving changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditProfileModal;
