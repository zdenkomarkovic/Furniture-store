import "./Footer.scss";
import logo from "../../assets/logo.jpg";
import facebook from "../../assets/icon-facebook.svg";
import twitter from "../../assets/icon-twitter.svg";
import instagram from "../../assets/icon-instagram.svg";

import { NavLink } from "react-router-dom";
import { mainNavbarItem, routes } from "../../router/routes";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer container">
        <div className="text">
          <img src={logo} alt="logo-image" />
          <p className="footer-text">
            Discover our wide range of modern and classic pieces, perfect for
            any home. Visit us today and find the ideal furniture that will give
            your space a unique touch
          </p>
          <p className="copyright">
            Copyright{" "}
            <a href="" target="_blank" rel="noreferrer">
              Zdenko Markovic
            </a>{" "}
            All Rights Reserved
          </p>
        </div>
        <div className="links">
          <div className="nav-links">
            <ul>
              {mainNavbarItem.map((link, i) => {
                return (
                  <NavLink key={i} to={link.path}>
                    {link.name}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="socials">
            <img src={facebook} alt="social-icon" />
            <img src={twitter} alt="social-icon" />
            <img src={instagram} alt="social-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
