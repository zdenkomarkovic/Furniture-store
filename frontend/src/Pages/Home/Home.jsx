import React from 'react';
import { useEffect } from 'react';
import Hero from '../../Components/Hero/Hero';
import UserService from '../../services/userService';

const Home = () => {
  useEffect(() => {
    UserService.getUser('zdenko.staff@gmail.com').then(res => {
      console.log(res.data);
    });
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
