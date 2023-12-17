import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './cart.scss';
import { routes } from '../../router/routes';

import {
  removeFromCart,
  clearCart,
  changeQuantityCart,
} from '../../store/cartSlice';

const Cart = ({ setCartDisplay }) => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useSelector(state => state.cartStore);
  const dispatch = useDispatch();

  const changeQuantityHandler = (id, count) => {
    dispatch(changeQuantityCart({ id, count }));
  };

  const handleCheckout = () => {
    setCartDisplay(false);
    setTimeout(() => {
      navigate(routes.CHECKOUT.path);
    }, 500);
  };
  return (
    <div className='overlay' onClick={() => setCartDisplay(false)}>
      {cart.length === 0 ? (
        <div className='cart-wrapper-empty'>
          <h6>Your cart is empty</h6>
          <button onClick={() => navigate(routes.PRODUCTS.path)}>
            add products
          </button>
        </div>
      ) : (
        <motion.div
          onClick={e => e.stopPropagation()}
          whileInView={{ y: [-100, 0] }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className='cart-wrapper'
        >
          <div className='cart-top'>
            <h6>Cart ({cart.length})</h6>
            <p onClick={() => dispatch(clearCart())}>Remove all</p>
          </div>
          <div className='cart-middle'>
            {cart.map((item, i) => {
              return (
                <div className='product-details' key={i}>
                  <div className='product'>
                    <div className='img'>
                      <img src={item.thumbnail} alt='product-image' />
                    </div>
                    <div className='text'>
                      <p>{item.title}</p>
                      <p className='money-tag'>${item.price}</p>
                    </div>
                  </div>
                  <div className='qty-delete'>
                    <div className='changeQty'>
                      <span onClick={() => changeQuantityHandler(item._id, 1)}>
                        +
                      </span>
                      <span onClick={() => changeQuantityHandler(item._id, -1)}>
                        -
                      </span>
                    </div>
                    <span className='qty'>x{item.quantity}</span>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className='delete-btn'
                    >
                      X
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className='cart-bottom'>
            <div className='total'>
              <p>total</p>
            </div>
            <div className='price'>
              <p>$ {totalPrice}</p>
            </div>
          </div>
          <button className='checkout-btn' onClick={handleCheckout}>
            Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
