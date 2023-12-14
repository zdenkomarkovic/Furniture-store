import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CheckoutModal.scss';
import orderComfirmation from '../../assets/icon-order-confirmation.svg';
import { motion } from 'framer-motion';
import { useState } from 'react';

const CheckoutModal = ({ setToggleModal, grandTotal }) => {
  const { cart } = useSelector(state => state.cartStore);
  const navigate = useNavigate();
  const [copyCart, setCopycart] = useState({ cart });
  const [copyTotal, setCopyTotal] = useState(grandTotal);

  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className='overlay' onClick={handleClick}>
      <motion.div
        onClick={e => e.stopPropagation()}
        whileInView={{ y: [-100, 0] }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className='checkout-modal-wrapper'
      >
        <img src={orderComfirmation} alt='check-mark' />
        <h3>Thank you for your order</h3>
        <p className='info'>You will receive an email confirmation shortly.</p>
        <div className='order-details'>
          <div className='products'>
            <div className='product-details'>
              <div className='product'>
                <div className='img'>
                  <img src={copyCart.cart[0]?.thumbnail} alt='product-image' />
                </div>
                <div className='text'>
                  <p>{copyCart.cart[0].title}</p>
                  <p>${copyCart.cart[0].price}</p>
                </div>
              </div>
              <div className='qty-wrapper'>
                <span className='qty'>x{copyCart.cart[0]?.quantity}</span>
              </div>
            </div>
            <hr className='line' />
            {copyCart.cart.length <= 1 ? null : (
              <p className='items-number'>
                and {copyCart.cart.length - 1} other item(s)
              </p>
            )}
          </div>
          <div className='total'>
            <p className='grand-total'>Grand total</p>
            <p className='price-total'>$ {copyTotal.toLocaleString()}</p>
          </div>
        </div>
        <button onClick={handleClick} className='back-to-home-btn'>
          Back to home
        </button>
      </motion.div>
    </div>
  );
};

export default CheckoutModal;
