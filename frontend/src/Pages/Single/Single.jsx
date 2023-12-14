import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import './Single.scss';
import { addToCart } from '../../store/cartSlice';
import { toast } from 'react-toastify';
import ProductService from '../../services/ProductService';
import { storeAllProducts } from '../../store/productSlice';

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { products } = useSelector(state => state.productStore);

  const product = products.find(item => item._id === id);

  useEffect(() => {
    ProductService.getAllProducts()
      .then(res => {
        dispatch(storeAllProducts(res.data));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success('Added to cart successfully!');
    setTimeout(() => {
      navigate('/products');
    }, 2000);
  };

  return (
    <div className='single-wrapper'>
      <div className='single container'>
        <a onClick={() => navigate('/products')}>Go back</a>
        <div className='product'>
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className='image'
          >
            <img
              src={product?.thumbnail}
              alt='product-image'
              className='product-img'
            />
          </motion.div>
          <motion.div
            whileInView={{ x: [100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className='text'
          >
            {product?.new ? (
              <p className='text-new-product'>New product</p>
            ) : (
              ' '
            )}
            <h2 className='text-product-name'>{product?.title}</h2>
            <p className='text-description'>{product?.description}</p>
            <h6 className='text-price'>$ {product?.price.toLocaleString()}</h6>
            <div className='buttons'>
              <div className='qty-button'>
                <span
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className='minus'
                >
                  -
                </span>
                <span className='qty'>{quantity}</span>
                <span
                  onClick={() =>
                    quantity < product.stock && setQuantity(quantity + 1)
                  }
                  className='plus'
                >
                  +
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className='add-button'
                onClick={handleAddToCart}
              >
                Add to cart
              </motion.button>
            </div>
          </motion.div>
        </div>
        <motion.div
          whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
          transition={{ duration: 0.5 }}
          className='details'
        >
          <div className='features'>
            <h3>FEATURES</h3>
            <p>product features</p>
          </div>
          <div className='includes'>
            <h3>In the box</h3>
            <div className='items'>
              <p className='item-qty'>quantity x</p>
              <p className='item-name'>name x</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
          transition={{ duration: 0.5 }}
          className='gallery'
        >
          <div className='two-imgs'>
            <img src='' alt='product-image' />
            <img src='' alt='product-image' />
          </div>
          <div className='one-img'>
            <img src='' alt='product-image' />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Single;
