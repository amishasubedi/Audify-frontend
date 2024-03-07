import React from "react";
import { useForm } from "react-hook-form";
import {
  getEmailValidationRules,
  getPasswordValidationRules,
} from "../utils/validators";
import Layout from "../Home/Layout";
import FormField from "../Shared/FormField";

import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";

const AudioForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <Header />
      <div className="wrapper  min-vh-100 align-items-center justify-content-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <form className="py-5 px-4" noValidate>
              <h4 className="login-title text-white  py-2 mb-4">
                Upload Audio
              </h4>
              <FormField
                id="title"
                label="Title"
                type="text"
                register={register}
                registerOptions={getEmailValidationRules()}
                errors={errors}
              />
              <FormField
                id="about"
                label="About"
                type="text"
                register={register}
                registerOptions={getPasswordValidationRules()}
                errors={errors}
              />

              <FormField
                id="category"
                label="Category"
                type="select"
                register={register}
                errors={errors}
                registerOptions={{ required: "Category is required" }}
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
                  // Add more categories as needed
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
