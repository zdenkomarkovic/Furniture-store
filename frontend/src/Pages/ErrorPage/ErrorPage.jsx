import React from 'react';
import { Link } from 'react-router-dom';
import error from './../../assets/error.svg';

const ErrorPage = () => {
  return (
    <div className='error-page'>
      <div className='container'>
        <Link className='goto' to={'/'}>
          <h3>go to Home page</h3>
        </Link>
        <img src={error} alt='404-image' />
      </div>
    </div>
  );
};

export default ErrorPage;
