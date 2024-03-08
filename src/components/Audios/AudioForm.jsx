import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../Home/Layout";
import FormField from "../Shared/FormField";

import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";

const AudioForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      about: "",
      file: undefined,
      poster: undefined,
    },
  });

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("about", data.about);
    if (data.poster && data.poster.length > 0) {
      formData.append("poster", data.poster[0]);
    }
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    onSubmit(formData);
  };

  const onError = (errors) => {
    console.error(errors);
  };

  return (
    <Layout>
      <Header />
      <div className="wrapper  min-vh-100 align-items-center justify-content-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <form
              className="py-5 px-4"
              onSubmit={handleSubmit(handleFormSubmit, onError)}
              noValidate
            >
              <h4 className="login-title text-white  py-2 mb-4">
                Upload Audio
              </h4>
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
                  className="form-control"
                  id="category"
                  {...register("category")}
                >
                  <option value="">Select a Category</option>
                  <option value="music">Music</option>
                  <option value="podcast">Podcast</option>
                  <option value="audiobook">Audiobook</option>
                </select>
              </FormField>

              <FormField
                id="upload-music"
                type="file"
                label="Upload Audio"
                register={register}
                errors={errors}
              />

              <FormField
                id="upload-poster"
                type="file"
                label="Upload Poster"
                register={register}
                errors={errors}
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="login-btn p-2 text-white rounded-3 mt-4"
                >
                  Upload
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
