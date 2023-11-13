import React from 'react';
import error from './../../assets/error.svg';

const ErrorPage = () => {
  return (
    <div className='error-page container'>
      <img src={error} alt='404-image' />
    </div>
  );
};

export default ErrorPage;
