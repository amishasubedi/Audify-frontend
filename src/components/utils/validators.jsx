import * as yup from "yup";
import { categories } from "../Home/Categories";
import { visibility } from "../Playlist/PlaylistModal";

export const getNameValidationRules = () => ({
  required: "Name is required",
  minLength: {
    value: 3,
    message: "Name must have at least 3 characters",
  },
});

export const getEmailValidationRules = () => ({
  required: "Email is required",
  pattern: {
    value: /^\S+@\S+$/i,
    message: "This is not a valid email format",
  },
});

export const getPasswordValidationRules = () => ({
  required: "Password is required",
  minLength: {
    value: 8,
    message: "Password must have at least 8 characters",
  },
});

export const getTitleValidationRules = () => ({
  required: "Title is required",
  minLength: {
    value: 3,
    message: "Title must have at least 3 characters",
  },
});

export const getAboutValidationRules = () => ({
  required: "Description is required",
  minLength: {
    value: 8,
    message: "Description must have at least 8 characters",
  },
});

export const getCategoryValidationRules = () => ({
  required: "Category is required",
});

export const playlistUploadSchema = yup.object({
  title: yup.string().trim().required("Title is missing!"),
  visibility: yup
    .string()
    .oneOf(["public", "private"], "Please select one of the category")
    .required("Visibility is required!"),
});

export const editProfileSchema = yup.object({
  picFile: yup
    .mixed()
    .test("fileSize", "Cover file is too large", (value) =>
      value && value[0] ? value[0].size <= 6000000 : true
    )
    .test("fileType", "Unsupported file format", (value) => {
      if (value && value instanceof File) {
        return ["image/jpeg", "image/png"].includes(value.type);
      }

      return true;
    }),
});

export const commonSchema = {
  title: yup.string().trim().required("Title is missing!"),
  category: yup
    .string()
    .oneOf(categories, "Please select one of the category")
    .required("Category is required!"),
  about: yup.string().trim().required("About is missing!"),
  coverFile: yup
    .mixed()
    .test("fileSize", "Cover file is too large", (value) =>
      value && value[0] ? value[0].size <= 6000000 : true
    )
    .test("fileType", "Unsupported file format", (value) => {
      if (value && value instanceof File) {
        return ["image/jpeg", "image/png"].includes(value.type);
      }

      return true;
    }),
};

export const newAudioSchema = yup.object().shape({
  ...commonSchema,
  audioFile: yup
    .mixed()
    .required("Audio file is missing")
    .test("fileSize", "Audio file is too large", (value) => {
      if (value && value instanceof File) {
        return value.size <= 10000000;
      }
      return true;
    })

    .test("fileType", "Only MP3 files are allowed", (value) => {
      if (value && value instanceof File) {
        return ["audio/mpeg", "audio/mp3"].includes(value.type);
      }
      return true;
    }),
});

export const oldAudioSchema = yup.object().shape({
  ...commonSchema,
});
