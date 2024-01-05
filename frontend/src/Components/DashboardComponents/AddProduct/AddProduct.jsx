import "./AddProduct.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FileParser } from "../../../utils/FileParser";
import ProductService from "../../../services/ProductService";
import { toast } from "react-toastify";
import { MB, VALID_TYPE } from "../../../config/config";
import { useEffect, useRef, useState } from "react";
import CategoryService from "../../../services/CategoryService";

const AddProduct = ({ item }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateImage, setUpdateImage] = useState(false);
  const inputRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.allCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let initialValues = {
    title: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    description: "",
    thumbnail: null,
    features: "",
    width: "",
    height: "",
    depth: "",
  };
  const validationSchema = Yup.object({
    title: Yup.string().required("required"),
    price: Yup.string().required("required"),
    stock: Yup.string().required("required"),
    brand: Yup.string().required("required"),
    category: Yup.string().required("required"),
    description: Yup.string().required("required"),
    features: Yup.string().required("required"),
    width: Yup.string().required("required"),
    height: Yup.string().required("required"),
    depth: Yup.string().required("required"),
    thumbnail:
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
          processedValues.thumbnail = await FileParser(values.thumbnail);
        }
        isUpdating
          ? await ProductService.updateProduct(item._id, processedValues)
          : await ProductService.addProduct(processedValues);
        toast.success(`Product ${isUpdating ? "updated" : "added"}`);
        formik.resetForm();
        setIsUpdating(false);
      } catch (err) {
        console.error(err);
        toast.error("An error occured");
      }
    },
    // onSubmit: (values) => {
    //   FileParser(values.thumbnail)
    //     .then((res) => {
    //       values.thumbnail = res;
    //       ProductService.addProduct(values)
    //         .then((res) => {
    //           toast(res.data, {
    //             position: "top-right",
    //             autoClose: 1500,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //           });
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   formik.resetForm();
    // },
  });
  useEffect(() => {
    if (item) {
      formik.setValues({
        title: item.title,
        price: item.price,
        stock: item.stock,
        brand: item.brand,
        category: item.category,
        description: item.description,
        thumbnail: item.thumbnail,
        features: item.features,
        width: item.width,
        height: item.height,
        depth: item.depth,
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

  return (
    <>
      <div className="add-product-wrapper">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="top">
            <div className="top-1">
              <div className="wrapper title">
                <label className={showError("title") ? "error" : null}>
                  Title: <span>{showError("title")}</span>
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  name="title"
                  placeholder="Title..."
                  onInput={formik.handleChange}
                  value={formik.values.title}
                  className={showError("title") ? "error" : null}
                />
              </div>
              <div className="wrapper number">
                <label className={showError("price") ? "error" : null}>
                  Price: <span>{showError("price")}</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Price..."
                  onInput={formik.handleChange}
                  value={formik.values.price}
                  className={showError("price") ? "error" : null}
                />
              </div>
            </div>
            <div className="top-2">
              <div className="wrapper number">
                <label className={showError("stock") ? "error" : null}>
                  Stock: <span>{showError("stock")}</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock..."
                  onInput={formik.handleChange}
                  value={formik.values.stock}
                  className={showError("stock") ? "error" : null}
                />
              </div>
              <div className="wrapper number">
                <label className={showError("width") ? "error" : null}>
                  Width: <span>{showError("width")}</span>
                </label>
                <input
                  type="number"
                  name="width"
                  placeholder="Width..."
                  onInput={formik.handleChange}
                  value={formik.values.width}
                  className={showError("width") ? "error" : null}
                />
              </div>
              <div className="wrapper number">
                <label className={showError("depth") ? "error" : null}>
                  Depth: <span>{showError("depth")}</span>
                </label>
                <input
                  type="number"
                  name="depth"
                  placeholder="Depth..."
                  onInput={formik.handleChange}
                  value={formik.values.depth}
                  className={showError("depth") ? "error" : null}
                />
              </div>
              <div className="wrapper number">
                <label className={showError("height") ? "error" : null}>
                  Height: <span>{showError("height")}</span>
                </label>
                <input
                  type="number"
                  name="height"
                  placeholder="Height..."
                  onInput={formik.handleChange}
                  value={formik.values.height}
                  className={showError("height") ? "error" : null}
                />
              </div>
            </div>
          </div>
          <div className="middle">
            <div className="wrapper">
              <label className={showError("thumbnail") ? "error" : null}>
                Image: <span>{showError("thumbnail")}</span>
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={(e) => {
                  formik.setFieldValue("thumbnail", e.target.files[0]);
                  setUpdateImage(false);
                }}
                className={showError("thumbnail") ? "error file" : "file"}
              />
            </div>
            <div className="wrapper">
              <label className={showError("brand") ? "error" : null}>
                Brand: <span>{showError("brand")}</span>
              </label>
              <select
                name="brand"
                onChange={formik.handleChange}
                value={formik.values.brand}
                className={showError("brand") ? "error select" : "select"}
              >
                <option value="" disabled={true}>
                  Brand
                </option>
                <option value="656e72ad16f59789743b0719">Brand1</option>
                <option value="656e72e216f59789743b071a">Brand2</option>
              </select>
            </div>
            <div className="wrapper">
              <label className={showError("category") ? "error" : null}>
                Category: <span>{showError("category")}</span>
              </label>
              <select
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                className={showError("category") ? "error select" : "select"}
              >
                <option value="" disabled={true}>
                  Category
                </option>
                {categories?.map((category, i) => {
                  return (
                    <option key={i} value={category._id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="bottom">
            <div className="wrapper">
              <label className={showError("description") ? "error" : null}>
                Description: <span>{showError("description")}</span>
              </label>
              <textarea
                name="description"
                cols="30"
                rows="10"
                placeholder="Description..."
                onInput={formik.handleChange}
                value={formik.values.description}
                className={`${
                  showError("description") ? "error" : null
                } description`}
              ></textarea>
            </div>

            <div className="wrapper">
              <label className={showError("features") ? "error" : null}>
                Features: <span>{showError("features")}</span>
              </label>
              <textarea
                name="features"
                cols="30"
                rows="10"
                placeholder="Features..."
                onInput={formik.handleChange}
                value={formik.values.features}
                className={`${
                  showError("features") ? "error " : null
                } features`}
              ></textarea>
            </div>
          </div>
          <div className="wrapper"> </div>

          <button type="submit">
            {isUpdating ? "Update product" : "Add product"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
