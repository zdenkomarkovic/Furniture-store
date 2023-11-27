import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { LS_KEY } from '../../config/config';
import { routes } from '../../router/routes';
import UserService from '../../services/userService';
import './Login.scss';

const Login = () => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleInput = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    UserService.login(inputData)
      .then(res => {
        if (res.status === 201) {
          console.log(res.data.msg);
        } else {
          console.log(res.data);
          localStorage.setItem(LS_KEY, res.data.token);
          setTimeout(() => {
            navigate(routes.HOME.path);
          }, 500);
        }
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
      });
  };
  return (
    <div>
      <Header title='Login' />
      <div className='container'>
        <div className='form-input'>
          <form action='' onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              placeholder='Enter email...'
              value={inputData.email}
              onChange={handleInput}
            />
            <input
              type='password'
              name='password'
              placeholder='Enter password...'
              value={inputData.password}
              onChange={handleInput}
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
