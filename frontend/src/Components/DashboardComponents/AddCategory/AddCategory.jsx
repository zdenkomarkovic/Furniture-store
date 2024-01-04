import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { MB, VALID_TYPE } from "../../../config/config";
import CategoryService from "../../../services/CategoryService";
import { FileParser } from "../../../utils/FileParser";

import "./AddCategory.scss";

const AddCategory = ({ item }) => {
  const isUpdating = !!item;
  const [updateImage, setUpdateImage] = useState(false);

  let initialValues = {
    title: "",
    image: null,
  };

  const validacija = Yup.object({
    title: Yup.string().required("required"),
    image: Yup.mixed()
      .required("required")
      .test("fileType", "Invalid file type", (value) =>
        VALID_TYPE.includes(value.type)
      )
      .test("fileSize", "Invalid file size", (value) => value.size < 2 * MB),
  });
  const updateValidacija = Yup.object({
    title: Yup.string().required("required"),
    image: Yup.mixed().notRequired(),
  });

  let validation = updateImage ? updateValidacija : validacija;

  useEffect(() => {
    if (isUpdating) {
      initialValues.title = item.title;
      initialValues.image = item.image;

      formik.setValues(initialValues);

      setUpdateImage(true);
    }
  }, [isUpdating, item]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    onSubmit: (values) => {
      if (isUpdating && updateImage) {
        CategoryService.updateCategory(item._id, values)
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

        formik.resetForm();
      } else if (isUpdating) {
        FileParser(values.image)
          .then((res) => {
            values.image = res;
            console.log(values);
            CategoryService.updateCategory(item._id, values)
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
      } else {
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
      }
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
            onChange={(e) => {
              formik.setFieldValue("image", e.target.files[0]);
              setUpdateImage(false);
            }}
            className={showError("image") ? "error" : null}
          />
        </div>
        <button type="submit">
          {isUpdating ? "Update category" : "Add category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
