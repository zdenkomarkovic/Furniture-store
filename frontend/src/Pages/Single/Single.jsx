import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useSelector(state => state.productStore);
  console.log(id);
  console.log(products);

  const product = products.find(item => item._id === id);
  console.log(product);
  if (!product) {
    return <p>Product not found</p>;
  }
  return (
    <>
      <div className='container single'>
        <h1>{product.title}</h1>
        <img src={product?.thumbnail} alt='' />
      </div>
    </>
  );
};

export default Single;
