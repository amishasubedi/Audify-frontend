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

const AudioForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Layout>
      <div className="wrapper min-vh-100 align-items-center justify-content-center">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-5">
            <form className="py-5 px-4" noValidate>
              <h4 className="login-title text-white  py-2 mb-4">
                Upload Audio
              </h4>
              <FormField
                id="title"
                label="title"
                type="text"
                register={register}
                registerOptions={getEmailValidationRules()}
                errors={errors}
              />
              <FormField
                id="about"
                label="about"
                type="text"
                register={register}
                registerOptions={getPasswordValidationRules()}
                errors={errors}
              />

              <div className="mb-3">
                <label htmlFor="coverImage" className="form-label text-white">
                  Upload Cover Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="coverImage"
                  {...register("coverImage", { required: true })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="coverImage" className="form-label text-white">
                  Upload Music
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="coverImage"
                  {...register("coverImage", { required: true })}
                />
              </div>

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
