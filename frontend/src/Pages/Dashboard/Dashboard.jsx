import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { dashboardSidebarItem, routes } from "../../router/routes";
import "./Dashboard.scss";
import logo from "./../../assets/logo.jpg";
import { SlArrowDown } from "react-icons/sl";
import { logoutUser } from "../../store/userSlice";
import Orders from "../../Components/Orders/Orders";

const Dashboard = () => {
  const [dropdownMenu, setDropdownMenu] = useState(true);
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(routes.LOGIN.path);
  };
  return (
    <section className="dashboard-wrapper">
      <div className="header">
        <div className="container dash-wrapper">
          <div className="nav-logo">
            <Link to={"/"}>
              <img src={logo} alt="logo-image" />
            </Link>
          </div>
          <div
            className="log nav-links"
            onMouseLeave={() => setDropdownMenu(true)}
          >
            <p onMouseOver={() => setDropdownMenu(false)}>
              {user.hasOwnProperty("email") ? user.name : "My Account"}{" "}
              <SlArrowDown className="icon" />
            </p>
            <ul className={`${dropdownMenu && "hide"}`}>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className="container-fluid">
        <div className=" wrapper">
          <aside>
            <ul className="list-group">
              {dashboardSidebarItem.map((item, i) => {
                return (
                  <li key={i}>
                    <NavLink to={item.path} end={true}>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
