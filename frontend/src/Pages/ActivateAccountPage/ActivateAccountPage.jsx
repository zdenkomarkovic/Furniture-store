import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from '../../router/routes';
import UserService from '../../services/UserService';
import './ActivateAccountPage.scss';

const ActivateAccountPage = () => {
  const [message, setMessage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    UserService.activateAccount(id)
      .then(() => {
        setMessage('Your account is activated');
        setTimeout(() => {
          navigate(routes.LOGIN.path);
        }, 500);
      })
      .catch(() => {
        setMessage('Something went wrong');
        setTimeout(() => {
          navigate(routes.REGISTER.path);
        }, 2000);
      });
  });
  return (
    <div className='container activate'>
      <h1>{message}</h1>
    </div>
  );
};

export default ActivateAccountPage;
