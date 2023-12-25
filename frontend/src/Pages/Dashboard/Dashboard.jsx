import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { dashboardSidebarItem, routes } from "../../router/routes";
import "./Dashboard.scss";
import logo from "./../../assets/logo.jpg";
import { SlArrowDown } from "react-icons/sl";
import { logoutUser } from "../../store/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Dashboard = () => {
  const [dropdownMenu, setDropdownMenu] = useState(true);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(routes.LOGIN.path);
  };
  const toogleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  return (
    <section className="dashboard-wrapper">
      <div className="header">
        <div className="container dash-wrapper">
          <div className="nav-menu" onClick={toogleMenu}>
            {toggleMenu ? (
              <AiOutlineClose className="menu-icon" />
            ) : (
              <RxHamburgerMenu className="menu-icon" />
            )}
          </div>
          <div className={`nav-menu-links ${toggleMenu ? "show" : "hide"}`}>
            <ul>
              {dashboardSidebarItem.map((li, i) => {
                return (
                  <li key={i}>
                    <NavLink onClick={() => setToggleMenu(false)} to={li.path}>
                      {li.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
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

            <p className={`${dropdownMenu && "hide"}`} onClick={handleLogout}>
              Logout
            </p>
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
