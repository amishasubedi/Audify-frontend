import React from "react";
import { useForm } from "react-hook-form";
import { uploadAudioSchema } from "../utils/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Home/Layout";
import FormField from "../Shared/FormField";

import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";

const AudioForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(uploadAudioSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
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
              onSubmit={handleSubmit(onSubmit, onError)}
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
