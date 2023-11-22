import React from 'react';
import './Register.scss';
import { useState } from 'react';
import UserService from '../../services/userService';

const RegisterPage = () => {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleInput = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    UserService.register(inputData)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  return (
    <div className='container'>
      <div className='form-input'>
        <form action='' onSubmit={handleSubmit}>
          <h2>Please register</h2>
          <input
            type='text'
            name='name'
            placeholder='Enter name...'
            value={inputData.name}
            onChange={handleInput}
          />
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
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;