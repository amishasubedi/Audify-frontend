import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Home/Layout";
import FormField from "../Shared/FormField";

import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";
import {
  getAboutValidationRules,
  getCategoryValidationRules,
  getTitleValidationRules,
  uploadAudioSchema,
  validateFileInput,
} from "../utils/validators";

const AudioForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      about: "",
      audioFile: undefined,
      coverFile: undefined,
    },

    resolver: yupResolver(uploadAudioSchema),
  });

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("about", data.about);

    if (data.file && data.file.length > 0) {
      formData.append("audioFile", data.file[0]);
    }
    if (data.poster && data.poster.length > 0) {
      formData.append("coverFile", data.poster[0]);
    }

    console.log("Form data ", [...formData]);
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
              encType="multipart/form-data"
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
                registerOptions={getTitleValidationRules()}
                errors={errors}
              />
              <FormField
                id="about"
                label="About"
                type="text"
                register={register}
                registerOptions={getAboutValidationRules()}
                errors={errors}
              />

              <FormField
                id="category"
                label="Category"
                type="select"
                register={register}
                registerOptions={getCategoryValidationRules()}
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

              <Controller
                name="file"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    className="file text-white mb-3 mt-5"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
              />

              <Controller
                name="poster"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="file"
                    className="file text-white"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
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
