import React from "react";
import AudioForm from "./AudioForm";
import { useUploadAudioMutation } from "../../redux/Services/api_service";
import useCustomForm from "../Hooks/form-hook";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateAlert } from "../../redux/Features/alert_slice";
import catchAsyncError from "../utils/AsyncErrors";

const UploadAudio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [UploadAudio, { isLoading, isSuccess, isError }] =
    useUploadAudioMutation();

  const { reset } = useCustomForm();

  const handleUpload = async (formData) => {
    console.log("type of handle upload", typeof handleUpload);
    try {
      await UploadAudio(formData).unwrap();
      dispatch(
        updateAlert({ message: "Uploaded audio successfully", type: "success" })
      );
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
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
