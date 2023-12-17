import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CheckoutModal from '../../Components/CheckoutModal/CheckoutModal';
import { routes } from '../../router/routes';
import OrderService from '../../services/OrderService';
import './Checkout.scss';
import { clearCart } from '../../store/cartSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cartStore);
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zipCode: '',
    city: '',
    country: '',
    eMoneyNum: '',
    eMoneyPin: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const isEmailValid = email => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const errors = {};
    for (const field in formData) {
      if (formData[field] === '') {
        errors[field] = ` is required`;
      }
    }
    if (formData.email && !isEmailValid(formData.email)) {
      errors.email = `Invalid email address`;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  let total = cart.reduce((acc, value) => {
    return acc + value.quantity * value.price;
  }, 0);

  let shipping = 50;
  let VAT = Math.ceil(total * 0.2);
  let totalPrice = cart.length === 0 ? 0 : total + shipping + VAT;

  let products = cart.map(el => {
    return {
      productId: el._id,
      title: el.title,
      price: el.price,
      quantity: el.quantity,
    };
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      OrderService.addOrder({
        ...formData,
        totalPrice,
        products,
      })
        .then(res => {
          setTimeout(() => {
            dispatch(clearCart());
          }, 2000);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      setToggleModal(true);
    }
  };

  return (
    <div className='checkout-wrapper'>
      <div className='container'>
        {toggleModal ? (
          <CheckoutModal
            setToggleModal={setToggleModal}
            grandTotal={totalPrice}
          />
        ) : null}
        <a onClick={() => navigate(routes.PRODUCTS.path)}>Go back</a>
        <div className='checkout'>
          <div className='details'>
            <h3>Checkout</h3>
            <form onSubmit={handleSubmit}>
              <div className='billing-details'>
                <p className='details-title'>Billing Details</p>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.name ? 'error' : null}>
                      Name
                      {formErrors.name && (
                        <span className='error-msg'>{formErrors.name}</span>
                      )}
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? 'error' : null}
                      placeholder='Enter your name...'
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          name: '',
                        }))
                      }
                    />
                  </div>
                  <div className='input-wrapper'>
                    <label className={formErrors.email ? 'error' : null}>
                      Email address {'  '}
                      {formErrors.email && (
                        <span className='error-msg'>{formErrors.email}</span>
                      )}
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? 'error' : null}
                      placeholder='Enter your email...'
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          email: '',
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.phone ? 'error' : null}>
                      Phone number{' '}
                      {formErrors.phone && (
                        <span className='error-msg'>{formErrors.phone}</span>
                      )}
                    </label>
                    <input
                      type='phone'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? 'error' : null}
                      placeholder='Enter your phone number...'
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          phone: '',
                        }))
                      }
                    />
                  </div>
                  <div className='input-wrapper'></div>
                </div>
              </div>
              <div className='shipping-info'>
                <p className='details-title'>Shiping Info</p>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.address ? 'error' : null}>
                      Address{' '}
                      {formErrors.address && (
                        <span className='error-msg'>{formErrors.address}</span>
                      )}
                    </label>
                    <input
                      className={formErrors.address ? 'error' : null}
                      type='text'
                      name='address'
                      value={formData.address}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          address: '',
                        }))
                      }
                      placeholder='Enter your address...'
                    />
                  </div>
                </div>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.zipCode ? 'error' : null}>
                      ZIP Code{' '}
                      {formErrors.zipCode && (
                        <span className='error-msg'>{formErrors.zipCode}</span>
                      )}
                    </label>
                    <input
                      className={formErrors.zipCode ? 'error' : null}
                      type='number'
                      name='zipCode'
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          zipCode: '',
                        }))
                      }
                      placeholder='Enter your zipcode...'
                    />
                  </div>
                  <div className='input-wrapper'>
                    <label className={formErrors.city ? 'error' : null}>
                      City{' '}
                      {formErrors.city && (
                        <span className='error-msg'>{formErrors.city}</span>
                      )}
                    </label>
                    <input
                      className={formErrors.city ? 'error' : null}
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          city: '',
                        }))
                      }
                      placeholder='Enter your city...'
                    />
                  </div>
                </div>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.country ? 'error' : null}>
                      Country{' '}
                      {formErrors.name && (
                        <span className='error-msg'>{formErrors.country}</span>
                      )}
                    </label>
                    <input
                      className={formErrors.country ? 'error' : null}
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          country: '',
                        }))
                      }
                      placeholder='Enter your country...'
                    />
                  </div>
                  <div className='input-wrapper'></div>
                </div>
              </div>
              <div className='payment-details'>
                <p className='details-title'>Payment Details</p>
                <div className='inputs'>
                  <div className='input-wrapper'>
                    <label className={formErrors.eMoneyNum ? 'error' : null}>
                      e-Money Number{' '}
                      {formErrors.name && (
                        <span className='error-msg'>
                          {formErrors.eMoneyNum}
                        </span>
                      )}
                    </label>
                    <input
                      className={formErrors.eMoneyNum ? 'error' : null}
                      type='number'
                      name='eMoneyNum'
                      value={formData.eMoneyNum}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          eMoneyNum: '',
                        }))
                      }
                      placeholder='Enter your E-Money number'
                    />
                  </div>
                  <div className='input-wrapper'>
                    <label className={formErrors.eMoneyPin ? 'error' : null}>
                      e-Money PIN{' '}
                      {formErrors.name && (
                        <span className='error-msg'>
                          {formErrors.eMoneyPin}
                        </span>
                      )}
                    </label>
                    <input
                      className={formErrors.eMoneyPin ? 'error' : null}
                      type='number'
                      name='eMoneyPin'
                      value={formData.eMoneyPin}
                      onChange={handleInputChange}
                      onFocus={() =>
                        setFormErrors(prevErrors => ({
                          ...prevErrors,
                          eMoneyPin: '',
                        }))
                      }
                      placeholder='Enter your E-mmoney pin'
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='summary'>
            <h6>Summary</h6>

            <div className='summary-middle'>
              {cart.map((item, id) => {
                return (
                  <div key={id} className='product-details'>
                    <div className='product'>
                      <div className='img'>
                        <img src={item.thumbnail} alt='product-image' />
                      </div>
                      <div className='text'>
                        <p>{item.title}</p>
                        <p>${item.price}</p>
                      </div>
                    </div>
                    <div className='qty-delete'>
                      <span className='qty'>x{item.quantity}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='summary-bottom'>
              <div className='price-details'>
                <div className='total'>
                  <span>total</span>
                </div>
                <div className='price'>
                  <span>$ {total.toLocaleString()}</span>
                </div>
              </div>
              <div className='price-details'>
                <div className='total'>
                  <span>Shipping</span>
                </div>
                <div className='price'>
                  {cart.length === 0 ? (
                    <span>$ 0</span>
                  ) : (
                    <span>$ {shipping}</span>
                  )}
                </div>
              </div>
              <div className='price-details'>
                <div className='total'>
                  <span>VAT (included)</span>
                </div>
                <div className='price'>
                  <span>$ {VAT.toLocaleString()}</span>
                </div>
              </div>
              <div className='grand-total'>
                <div className='total'>
                  <span>Grand total</span>
                </div>
                <div className='price'>
                  <span>$ {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {cart.length === 0 ? null : (
              <button className='summary-btn' onClick={handleSubmit}>
                Continue & pay
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
