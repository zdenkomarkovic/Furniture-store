import React from 'react';
import { Navigate } from 'react-router-dom';
import { LS_USER } from '../config/config';

function AuthGuarding({ children }) {
  function isLoaggedUser() {
    if (localStorage.hasOwnProperty(LS_USER)) {
      return localStorage.getItem(LS_USER);
    }
  }

  return isLoaggedUser() ? children : <Navigate to={'/login'} />;
}

export default AuthGuarding;
