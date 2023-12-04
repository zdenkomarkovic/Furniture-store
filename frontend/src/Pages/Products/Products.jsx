import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import ProductCard from '../../Components/ProductCard/ProductCard';
import ProductService from '../../services/ProductService';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  let limit = searchParams.get('limit')
    ? parseInt(searchParams.get('limit'))
    : 9;
  let page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;

  useEffect(() => {
    setSearchParams({ limit, page });
    ProductService.pagination(limit, page)
      .then(res => {
        setProducts(res.data.products);
        setCount(res.data.count);
      })
      .catch(err => {});
  }, [searchParams]);

  const showProducts = () => {
    return products.map((product, i) => {
      return <ProductCard key={i} product={product} />;
    });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ limit, page: page - 1 });
    }
  };
  const handleNextPage = () => {
    if (page < Math.ceil(count / limit)) {
      setSearchParams({ limit, page: page + 1 });
    }
  };
  const renderPageBtn = () => {
    let numberPage = Math.ceil(count / limit);
    return Array(numberPage)
      .fill(1)
      .map((el, i) => {
        return (
          <li className='page-item' key={i}>
            <button className='page-link' name={el + i} onClick={changePage}>
              {el + i}
            </button>
          </li>
        );
      });
  };

  const changePage = e => {
    setSearchParams({ limit, page: e.target.name });
  };

  return (
    <div>
      <Header title='Products' />
      <div className='container'>
        <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className='page-item'>
              <button
                href='#'
                className='page-link'
                aria-label='Previous'
                onClick={handlePreviousPage}
              >
                <span aria-hidden='true'>&laquo;</span>
              </button>
            </li>
            {count && renderPageBtn()}
            <li className='page-item'>
              <button
                href='#'
                className='page-link'
                aria-label='Next'
                onClick={handleNextPage}
              >
                <span aria-hidden='true'>&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Products;
