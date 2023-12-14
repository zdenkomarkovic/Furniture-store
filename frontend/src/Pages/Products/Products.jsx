import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header/Header';
import ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import './Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllProducts } from '../../store/productSlice';

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.productStore);

  useEffect(() => {
    ProductService.getAllProducts()
      .then(res => {
        dispatch(storeAllProducts(res.data));

        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header title='Products' />
      <div className='container products-wrapper'>
        {isLoading ? (
          <div className='products'>
            {Array.from({ length: 6 }).map((_, id) => (
              <motion.div key={id} className='card skeleton'></motion.div>
            ))}
          </div>
        ) : (
          <div className='products'>
            {products.map((product, i) => (
              <Link to={`/single/${product._id}`} key={i}>
                <motion.div
                  whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                  transition={{ duration: 0.5 }}
                  className='card'
                >
                  <div className='image'>
                    <img src={product.thumbnail} alt={product.name} />
                  </div>
                  <div className='text'>
                    <h6>{product.title}</h6>
                    <p>$ {product.price.toLocaleString()}</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                      className='product-btn'
                    >
                      Details
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
