import React from "react";
import AudioForm from "./AudioForm";
import { useUploadAudioMutation } from "../../redux/Services/api_service";
import useCustomForm from "../Hooks/form-hook";
import { useNavigate } from "react-router";

const UploadAudio = () => {
  const navigate = useNavigate();
  const [UploadAudio, { isLoading, isSuccess, isError }] =
    useUploadAudioMutation();

  const { reset } = useCustomForm();

  const handleUpload = async (formData) => {
    console.log("type of handle upload", typeof handleUpload);
    try {
      const response = await UploadAudio(formData).unwrap();
      console.log("Uploaded audio successfully", response);
    } catch (error) {
      alert("Failed to upload audio");
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }

    if (isError) {
      alert("Some thing went wrong, Please try again");
      reset();
    }
  }, [isSuccess, isError, navigate, isLoading, reset]);

  return (
    <>
      <AudioForm onSubmit={handleUpload} isLoading={isLoading} />
    </>
  );
};

export default UploadAudio;
