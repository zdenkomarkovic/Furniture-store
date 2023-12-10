import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { dashboardSidebarItem } from '../../router/routes';
import './Dashboard.scss';

const Dashboard = () => {
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
                <button>User</button>

                <ul className='dropdown-menu'>
                  <li>
                    <Link className='dropdown-item'>Action</Link>
                  </li>
                  <li>
                    <Link className='dropdown-item'>Another action</Link>
                  </li>
                  <li>
                    <Link className='dropdown-item'>Something else here</Link>
                  </li>
                  <li>
                    <Link className='dropdown-item'>Another link</Link>
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
