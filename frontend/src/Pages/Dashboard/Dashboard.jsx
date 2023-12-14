import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { dashboardSidebarItem, routes } from '../../router/routes';
import './Dashboard.scss';

const Dashboard = () => {
  const { user } = useSelector(state => state.userStore);
  return (
    <section className='dashboard-wrapper'>
      <div className='header'>
        <div className='container dash-wrapper'>
          <div>
            <h3>Furniture store</h3>
          </div>
          <div>
            <ul className='nav'>
              <li className='dropdown'>
                <button>{user.name}</button>

                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item'>1</Link>
                  </li>
                  <li>
                    <Link className='dropdown-item'>2</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className='container-fluid'>
        <div className=' wrapper'>
          <aside>
            <ul className='list-group'>
              <NavLink to={routes.HOME.path}>{routes.HOME.name}</NavLink>
              {dashboardSidebarItem.map((item, i) => {
                return (
                  <li key={i}>
                    <NavLink to={item.path} end={true}>
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </aside>
          <div className='content-wrapper'>
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
