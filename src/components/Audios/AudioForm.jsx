import { set, useForm } from "react-hook-form";
import Layout from "../Home/Layout";
import FormField from "../UI/FormField";
import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";
import { useDispatch } from "react-redux";
import { newAudioSchema } from "../utils/validators";
import catchAsyncError from "../utils/AsyncErrors";
import { categories } from "../Home/Categories";
import { updateAlert } from "../../redux/Features/alert_slice";
import { useState } from "react";

const defaultFormValue = {
  title: "",
  category: "",
  about: "",
  file: undefined,
  poster: undefined,
};

const AudioForm = ({ onSubmit, isLoading }) => {
  const [audioInfo, setAudioInfo] = useState({ ...defaultFormValue });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async () => {
    try {
      const formData = new FormData();
      let finalData;

      finalData = await newAudioSchema.validate(audioInfo);
      formData.append("file", {
        name: finalData.file.name,
        type: finalData.file.type,
        uri: finalData.file.uri,
      });

      formData.append("title", finalData.title);
      formData.append("about", finalData.about);
      formData.append("category", finalData.category);

      if (finalData.poster.uri)
        formData.append("poster", {
          name: finalData.poster.name,
          type: finalData.poster.type,
          uri: finalData.poster.uri,
        });

      onSubmit(formData);
    } catch (error) {
      const errorMessage = catchAsyncError(error);
      dispatch(updateAlert({ message: errorMessage, type: "error" }));
    }
  };

  return (
    <Layout>
      <Header />
      <div className="wrapper min-vh-100 align-items-center justify-content-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <form
              className="py-5 px-4"
              onSubmit={handleSubmit(handleFormSubmit)}
              encType="multipart/form-data"
              noValidate
            >
              <h4 className="login-title text-white py-2 mb-4">Upload Audio</h4>
              <FormField
                id="title"
                label="Title"
                type="text"
                register={register}
                errors={errors}
              />
              <FormField
                id="about"
                label="About"
                type="text"
                register={register}
                errors={errors}
              />

              <FormField
                id="category"
                label="Category"
                type="select"
                register={register}
                errors={errors}
              >
                <select
                  className={`form-control ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  {...register("category")}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="audioFile"
                label="Audio File"
                type="file"
                register={register}
                errors={errors}
                onChange={(e) => {
                  setValue("file", e.target.files[0]);
                  trigger("file");
                }}
              />

              <FormField
                id="coverFile"
                label="Cover File"
                type="file"
                register={register}
                errors={errors}
                onChange={(e) => {
                  setValue("poster", e.target.files[0]);
                  trigger("poster");
                }}
              />
              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 text-white rounded-3 mt-4"
                >
                  {isLoading ? "Uploading audio..." : "Upload"}
                </button>
              </div>
            </form>
            <DevTool control={control} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AudioForm;
