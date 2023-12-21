import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./../../assets/logo.jpg";
import { motion } from "framer-motion";
import cartIcon from "../../assets/icon-cart.svg";
import "./Navbar.scss";
import { mainNavbarItem, routes } from "../../router/routes";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = ({ setCartDisplay }) => {
  const { user } = useSelector((store) => store.userStore);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartStore);
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleCart = () => {
    setCartDisplay((prev) => !prev);
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar container">
        <div
          className="nav-menu"
          onClick={() => setToggleMenu((prev) => !prev)}
        >
          {toggleMenu ? (
            <AiOutlineClose className="menu-icon" />
          ) : (
            <RxHamburgerMenu className="menu-icon" />
          )}
        </div>
        <div className={`nav-menu-links ${toggleMenu ? "show" : "hide"}`}>
          <ul>
            {mainNavbarItem.map((li, i) => {
              return (
                <li key={i}>
                  <NavLink onClick={() => setToggleMenu(false)} to={li.path}>
                    {li.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="log-menu">
            <button>
              {user.hasOwnProperty("email") ? user.name : "My Account"}
            </button>

            <Link to={routes.REGISTER.path}>Register</Link>
            {user.hasOwnProperty("email") ? (
              <div>
                <Link to={routes.DASHBOARD.path}>{routes.DASHBOARD.name}</Link>
                <button onClick={() => dispatch(logoutUser())}>Logout</button>
              </div>
            ) : (
              <Link to={routes.LOGIN.path}>Login</Link>
            )}
          </div>
        </div>
        <div className="nav-logo">
          <Link to={"/"}>
            <img src={logo} alt="logo-image" />
          </Link>
        </div>
        <div className="nav-links">
          {mainNavbarItem.map((link, i) => {
            return (
              <NavLink key={i} to={link.path}>
                {link.name}
              </NavLink>
            );
          })}
        </div>
        <div className="cart">
          <motion.img
            src={cartIcon}
            alt="cart-icon"
            whileHover={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={toggleCart}
          />
          {cart.length > 0 ? (
            <span className="cart-qty">({cart.length})</span>
          ) : null}
        </div>
        <div className="log nav-links">
          <button>
            {user.hasOwnProperty("email") ? user.name : "My Account"}
          </button>

          <Link to={routes.REGISTER.path}>Register</Link>
          {user.hasOwnProperty("email") ? (
            <div>
              <Link to={routes.DASHBOARD.path}>{routes.DASHBOARD.name}</Link>
              <button onClick={() => dispatch(logoutUser())}>Logout</button>
            </div>
          ) : (
            <Link to={routes.LOGIN.path}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
