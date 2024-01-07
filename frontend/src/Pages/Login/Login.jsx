import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import { LS_TOKEN } from "../../config/config";
import { routes } from "../../router/routes";
import UserService from "../../services/UserService";
import { setUser } from "../../store/userSlice";
import "./Login.scss";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const handleInput = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };
  const isEmailValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const errors = {};
    for (const field in inputData) {
      if (inputData[field] === "") {
        errors[field] = ` is required`;
      }
    }
    if (inputData.email && !isEmailValid(inputData.email)) {
      errors.email = `Invalid email address`;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      UserService.login(inputData)
        .then((res) => {
          if (res.status === 201) {
          } else {
            dispatch(setUser(res.data.user));
            localStorage.setItem(LS_TOKEN, res.data.token);
            toast.success("You are logged successfully");
            setTimeout(() => {
              navigate(routes.DASHBOARD.path);
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("Error");
          console.log(err);
        });
    }
  };
  return (
    <div>
      <Header title="Login" />
      <div className="login-wrapper">
        <div className="container">
          <div className="form-input">
            <form action="" onSubmit={handleSubmit}>
              <label className={formErrors.email ? "error" : null}>
                Email adress{" "}
                <span className="error-msg">{formErrors.email}</span>
              </label>
              <input
                className={formErrors.email ? "error" : null}
                type="email"
                name="email"
                placeholder="Enter email..."
                value={inputData.email}
                onChange={handleInput}
                onFocus={() =>
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    email: "",
                  }))
                }
              />
              <label className={formErrors.password ? "error" : null}>
                Password{" "}
                <span className="error-msg">{formErrors.password}</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter password..."
                value={inputData.password}
                onChange={handleInput}
                onFocus={() =>
                  setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    password: "",
                  }))
                }
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
