import "./AddProduct.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FileParser } from "../../utils/FileParser";
import ProductService from "../../services/ProductService";
import { toast } from "react-toastify";

const VALID_TYPE = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/svg",
  "image/webp",
];
const KB = 1024;
const MB = KB * 1024;

const AddProduct = () => {
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Field is required"),
      price: Yup.string().required("Field is required"),
      stock: Yup.string().required("Field is required"),
      brand: Yup.string().required("Field is required"),
      category: Yup.string().required("Field is required"),
      description: Yup.string().required("Field is required"),
      thumbnail: Yup.mixed()
        .required("Field is required")
        .test("fileType", "Invalid file type", (value) =>
          VALID_TYPE.includes(value.type)
        )
        .test("fileSize", "Invalid file size", (value) => value.size < 2 * MB),
      features: Yup.string().required("Field is required"),
      width: Yup.string().required("Field is required"),
      height: Yup.string().required("Field is required"),
      depth: Yup.string().required("Field is required"),
    }),
    onSubmit: (values) => {
      FileParser(values.thumbnail)
        .then((res) => {
          values.thumbnail = res;
          console.log(values);
          ProductService.addProduct(values)
            .then((res) => {
              toast(res.data, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      formik.resetForm();
    },
  });

  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];

  return (
    <>
      <div className="add-product-wrapper container">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="top">
            <div className="top-1">
              <div className="wrapper title">
                <label className={showError("title") ? "error" : null}>
                  Title: <span>{showError("title")}</span>
                </label>
                <input
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
                onInput={(e) => {
                  formik.setFieldValue(e.target.name, e.target.files[0]);
                }}
                className={`{showError("thumbnail") ? "error" : null} file`}
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
                className={`{showError("brand") ? "error" : null} select`}
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
                className={`{showError("category") ? "error" : null} select`}
              >
                <option value="" disabled={true}>
                  category
                </option>
                <option value="656e72fb16f59789743b071b">category1</option>
                <option value="656e730e16f59789743b071c">category2</option>
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

          <button type="submit">Add product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
