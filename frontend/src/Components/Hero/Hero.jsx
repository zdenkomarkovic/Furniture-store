import React from 'react';
import './Hero.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../../assets/ugaona-firenca.jpg';

const Hero = () => {
  return (
    <div className='hero-wrapper'>
      <div className='hero container'>
        <motion.div
          whileInView={{ x: [-100, 0], opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className='text'
        >
          <p className='hero-new-product'>NEW PRODUCT</p>
          <h1 className='hero-header'>SOFA CORNER FIRENCA</h1>
          <p className='hero-description'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae,
            illum. Ea explicabo dolorem eum dolore magni numquam.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className='hero-btn'
          >
            <Link to={'products'}>See Products</Link>
          </motion.button>
        </motion.div>
        <div className='image'>
          <motion.img
            whileInView={{ scale: [0, 1] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            src={heroImg}
            alt='hero-image'
            className='hero-image'
          ></motion.img>
        </div>
      </div>
    </div>
  );
};

export default Hero;
