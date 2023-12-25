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
      <div className="add-wrapper container">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="wrapper">
            <label>
              Title <span>{showError("title")}</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title..."
              onInput={formik.handleChange}
              value={formik.values.title}
            />
          </div>
          <div className="wrapper">
            <label>
              Price <span>{showError("price")}</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price..."
              onInput={formik.handleChange}
              value={formik.values.price}
            />
          </div>
          <div className="wrapper">
            <label>
              Stock <span>{showError("stock")}</span>
            </label>
            <input
              type="number"
              name="stock"
              placeholder="Stock..."
              onInput={formik.handleChange}
              value={formik.values.stock}
            />
          </div>
          <div className="wrapper">
            <label>
              Thumbnail <span>{showError("thumbnail")}</span>
            </label>
            <input
              type="file"
              name="thumbnail"
              placeholder="Thumbnail"
              onInput={(e) => {
                formik.setFieldValue(e.target.name, e.target.files[0]);
              }}
            />
          </div>
          <div className="wrapper">
            <label>
              Brand <span>{showError("brand")}</span>
            </label>
            <select
              name="brand"
              onChange={formik.handleChange}
              value={formik.values.brand}
            >
              <option value="" disabled={true}>
                Brand
              </option>
              <option value="656e72ad16f59789743b0719">Brand1</option>
              <option value="656e72e216f59789743b071a">Brand2</option>
            </select>
          </div>
          <div className="wrapper">
            <label>
              Category <span>{showError("category")}</span>
            </label>
            <select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="" disabled={true}>
                category
              </option>
              <option value="656e72fb16f59789743b071b">category1</option>
              <option value="656e730e16f59789743b071c">category2</option>
            </select>
          </div>
          <div className="wrapper">
            <label>
              Description <span>{showError("description")}</span>
            </label>
            <textarea
              name="description"
              cols="30"
              rows="10"
              placeholder="Description..."
              onInput={formik.handleChange}
              value={formik.values.description}
            ></textarea>
          </div>
          <div className="wrapper">
            <label>
              Width <span>{showError("width")}</span>
            </label>
            <input
              type="number"
              name="width"
              placeholder="Width..."
              onInput={formik.handleChange}
              value={formik.values.width}
            />
          </div>
          <div className="wrapper">
            <label>
              Depth <span>{showError("depth")}</span>
            </label>
            <input
              type="number"
              name="depth"
              placeholder="Depth..."
              onInput={formik.handleChange}
              value={formik.values.depth}
            />
          </div>
          <div className="wrapper">
            <label>
              Height <span>{showError("height")}</span>
            </label>
            <input
              type="number"
              name="height"
              placeholder="Height..."
              onInput={formik.handleChange}
              value={formik.values.height}
            />
          </div>
          <div className="wrapper">
            <label>
              Features <span>{showError("height")}</span>
            </label>
            <textarea
              name="features"
              cols="30"
              rows="10"
              placeholder="Features..."
              onInput={formik.handleChange}
              value={formik.values.features}
            ></textarea>
          </div>
          <div className="wrapper"> </div>

          <button type="submit">Add product</button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
