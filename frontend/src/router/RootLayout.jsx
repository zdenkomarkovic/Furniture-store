import React from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { LS_TOKEN, LS_USER } from '../config/config';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { restoreUser } from '../store/userSlice';

axios.interceptors.request.use(config => {
  if (localStorage.hasOwnProperty(LS_TOKEN)) {
    config.headers.authorization = localStorage.getItem(LS_TOKEN);
  }
  return config;
});

const RootLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.hasOwnProperty(LS_USER)) {
      let user = JSON.parse(localStorage.getItem(LS_USER));
      dispatch(restoreUser(user));
    }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
