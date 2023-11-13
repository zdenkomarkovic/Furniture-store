import React from 'react';
import './Header.scss';
import { motion } from 'framer-motion';

const Header = ({ title }) => {
  return (
    <div className='header-wrapper'>
      <motion.h1
        whileInView={{ scale: [0, 1], opacity: [0, 0.5, 1] }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className='header-title'
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default Header;
