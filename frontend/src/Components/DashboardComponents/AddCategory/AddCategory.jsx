import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { MB, VALID_TYPE } from "../../../config/config";
import CategoryService from "../../../services/CategoryService";
import { FileParser } from "../../../utils/FileParser";
import "./AddCategory.scss";

const AddCategory = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("required"),
      image: Yup.mixed()
        .required("required")
        .test("fileType", "Invalid file type", (value) =>
          VALID_TYPE.includes(value.type)
        )
        .test("fileSize", "Invalid file size", (value) => value.size < 2 * MB),
    }),
    onSubmit: (values) => {
      FileParser(values.image)
        .then((res) => {
          values.image = res;
          console.log(values);
          CategoryService.addCategory(values)
            .then((res) => {
              toast(res.data, {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      formik.resetForm();
    },
  });
  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];
  return (
    <div className="addcategory-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <div className="wrapper">
          <label className={showError("title") ? "error" : null}>
            Category: <span>{showError("title")}</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter category..."
            onInput={formik.handleChange}
            value={formik.values.title}
            className={showError("title") ? "error" : null}
          />
        </div>
        <div className="wrapper">
          <label className={showError("image") ? "error" : null}>
            Category image: <span>{showError("image")}</span>
          </label>
          <input
            type="file"
            name="image"
            placeholder="Enter category image"
            onInput={(e) => {
              formik.setFieldValue(e.target.name, e.target.files[0]);
            }}
            className={showError("image") ? "error" : null}
          />
        </div>
        <button type="submit">Add category</button>
      </form>
    </div>
  );
};

export default AddCategory;
