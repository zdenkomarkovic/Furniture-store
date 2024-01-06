import { useFormik } from "formik";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { MB, VALID_TYPE } from "../../../config/config";
import CategoryService from "../../../services/CategoryService";
import { FileParser } from "../../../utils/FileParser";

import "./AddCategory.scss";

const AddCategory = ({ item }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const inputRef = useRef(null);

  let initialValues = {
    title: "",
    image: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("required"),
    image:
      isUpdating && updateImage
        ? Yup.mixed().notRequired()
        : Yup.mixed()
            .required("required")
            .test("fileType", "Invalid file type", (value) =>
              VALID_TYPE.includes(value.type)
            )
            .test(
              "fileSize",
              "Invalid file size",
              (value) => value.size < 2 * MB
            ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const processedValues = { ...values };
        if (!isUpdating || (isUpdating && !updateImage)) {
          processedValues.image = await FileParser(values.image);
        }
        isUpdating
          ? await CategoryService.updateCategory(item._id, processedValues)
          : await CategoryService.addCategory(processedValues);

        toast.success(`Category ${isUpdating ? "updated" : "added"}`);
        formik.resetForm();
        setIsUpdating(false);
      } catch (err) {
        console.error(err);
        toast.error("An error occured");
      }
    },
  });

  useEffect(() => {
    if (item) {
      formik.setValues({
        title: item.title,
        image: item.image,
      });
      setIsUpdating(true);
      setUpdateImage(true);
      inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      setIsUpdating(false);
      setUpdateImage(false);
    }
  }, [item, formik.setValues]);
  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  const handleCancelUpdate = () => {
    setIsUpdating(false);
    formik.resetForm();
  };

  return (
    <div className="addcategory-wrapper">
      <form onSubmit={formik.handleSubmit}>
        <div className="wrapper">
          <label className={showError("title") ? "error" : null}>
            Category: <span>{showError("title")}</span>
          </label>
          <input
            ref={inputRef}
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
        {isUpdating && <button onClick={handleCancelUpdate}>Cancel</button>}
      </form>
    </div>
  );
};

export default AddCategory;
