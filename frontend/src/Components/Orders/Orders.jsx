import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderService from '../../services/OrderService';
import { storeAllOrders } from '../../store/orderSlice';

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.orderStore);
  useEffect(() => {
    OrderService.allOrders()
      .then(res => {
        dispatch(storeAllOrders(res.data));
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  });
  return (
    <div className='orders-wrapper'>
      <div className='orders'>
        <h3>Orders</h3>
        {orders?.map((order, i) => {
          return (
            <div key={i} className='order-details'>
              <p>Order from: {order.name}</p>
              <p>Email: {order.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
