import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from './../../assets/logo.jpg';
import { motion } from 'framer-motion';
import cartIcon from '../../assets/icon-cart.svg';
import './Navbar.scss';
import { mainNavbarItem } from '../../router/routes';

const Navbar = () => {
  return (
    <div className='navbar-wrapper'>
      <div className='navbar container'>
        <div className='nav-logo'>
          <Link to={'/'}>
            <img src={logo} alt='logo-image' />
          </Link>
        </div>
        <div className='nav-links'>
          {mainNavbarItem.map((link, i) => {
            return (
              <NavLink key={i} to={link.path}>
                {link.name}
              </NavLink>
            );
          })}
        </div>
        <div className='cart'>
          <motion.img
            src={cartIcon}
            alt='cart-icon'
            whileHover={{ scale: 1.3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          />
          <span className='cart-qty'>(1)</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
