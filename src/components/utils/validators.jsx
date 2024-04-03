import * as yup from "yup";
import { categories } from "../Home/Categories";

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

export const commonSchema = {
  title: yup.string().trim().required("Title is missing!"),
  category: yup.string().oneOf(categories, "Category is missing!"),
  about: yup.string().trim().required("About is missing!"),
  poster: yup.object().shape({
    uri: yup.string(),
    name: yup.string(),
    type: yup.string(),
    size: yup.number(),
  }),
};

export const newAudioSchema = yup.object().shape({
  ...commonSchema,
  file: yup.object().shape({
    uri: yup.string().required("Audio file is missing!"),
    name: yup.string().required("Audio file is missing!"),
    type: yup.string().required("Audio file is missing!"),
    size: yup.number().required("Audio file is missing!"),
  }),
});

export const oldAudioSchema = yup.object().shape({
  ...commonSchema,
});
