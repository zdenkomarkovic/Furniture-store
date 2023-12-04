import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';

const MyAccount = () => {
  return (
    <div>
      MyAccount <Link to={routes.HOME.path}>HOME</Link>
    </div>
  );
};

export default MyAccount;
