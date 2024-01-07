import "./Register.scss";
import UserService from "../../services/UserService";
import Header from "../../Components/Header/Header";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must have minimum 3 character.")
        .max(35)
        .required(" is required"),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email format")
        .required(" is required"),
      password: Yup.string().required(" is required"),
    }),
    onSubmit: (values) => {
      UserService.register(values)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Check your email address for authentication link");
          } else {
            toast.warning("User exist");
          }
        })
        .catch((err) => console.log(err));
      formik.resetForm();
    },
  });
  const showError = (name) =>
    formik.errors[name] && formik.touched[name] && formik.errors[name];
  console.log(formik.errors);
  return (
    <div>
      <Header title="Register" />
      <div className="register-wrapper">
        <div className="container ">
          <div className="form-input">
            <form action="" onSubmit={formik.handleSubmit}>
              <label className={showError("name") ? "error" : null}>
                Name: <span>{showError("name")}</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name..."
                value={formik.values.name}
                onChange={formik.handleChange}
                className={showError("name") ? "error" : null}
              />
              <label className={showError("email") ? "error" : null}>
                Email adress <span>{showError("email")}</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email..."
                value={formik.values.email}
                onChange={formik.handleChange}
                className={showError("email") ? "error" : null}
              />
              <label className={showError("password") ? "error" : null}>
                Password <span>{showError("password")}</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password..."
                value={formik.values.password}
                onChange={formik.handleChange}
                className={showError("password") ? "error" : null}
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
