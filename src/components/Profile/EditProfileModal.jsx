import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalContainer from "../UI/ModalContainer";
import { editProfileSchema } from "../utils/validators";

const EditProfileModal = ({
  visible,
  initialValue,
  onRequestClose,
  onSubmit,
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: initialValue.name || "",
      bio: initialValue.bio || "",
      picFile: null,
    },
  });

  // Use useEffect to watch the picFile and update it in the form state
  const picFile = watch("picFile");
  useEffect(() => {
    if (picFile && picFile.length > 0) {
      setValue("picFile", picFile[0], { shouldDirty: true });
    }
  }, [picFile, setValue]);

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("bio", data.bio);
    if (data.picFile) {
      formData.append("picFile", data.picFile);
    } else {
      console.log("No file included in the submission");
    }

    onSubmit(formData);
    onRequestClose();
  };

  return (
    <ModalContainer show={visible} onHide={onRequestClose}>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <input {...field} placeholder="Name" />}
        />
        <Controller
          name="bio"
          control={control}
          render={({ field }) => <input {...field} placeholder="Bio" />}
        />
        <Controller
          name="picFile"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              onChange={(e) => {
                const files = e.target.files;
                field.onChange(files[0]); // Update the form directly with the file
              }}
            />
          )}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving changes..." : "Save Changes"}
        </button>
      </form>
    </ModalContainer>
  );
};

export default EditProfileModal;
