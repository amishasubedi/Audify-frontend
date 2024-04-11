import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../Home/Layout";
import FormField from "../UI/FormField";
import { DevTool } from "@hookform/devtools";
import "./Style.css";
import Header from "../Home/Header";
import { newAudioSchema } from "../utils/validators";
import { categories } from "../Home/Categories";

const AudioForm = ({ onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newAudioSchema),
  });

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("about", data.about);

    if (data.audioFile) {
      console.log("audio file", data.audioFile);
      formData.append("audioFile", data.audioFile);
    }
    if (data.coverFile) {
      formData.append("coverFile", data.coverFile);
    }

    onSubmit(formData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("audioFile", file, { shouldValidate: true });
    } else {
      setValue("audioFile", null);
    }
    trigger("audioFile");
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("coverFile", file, { shouldValidate: true });
    } else {
      setValue("coverFile", null);
    }
    trigger("coverFile");
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
                errors={errors}
                onChange={handleFileChange}
              />

              <FormField
                id="coverFile"
                label="Cover File"
                type="file"
                errors={errors}
                onChange={handlePosterChange}
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
