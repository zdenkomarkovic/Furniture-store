import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import { LS_TOKEN } from '../../config/config';
import { routes } from '../../router/routes';
import UserService from '../../services/userService';
import { setUser } from '../../store/userSlice';
import './Login.scss';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const dispatch = useDispatch();
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
          dispatch(setUser(res.data.user));
          localStorage.setItem(LS_TOKEN, res.data.token);
          toast.success('You are logged successfully');
          setTimeout(() => {
            navigate(routes.DASHBOARD.path);
          }, 2000);
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
