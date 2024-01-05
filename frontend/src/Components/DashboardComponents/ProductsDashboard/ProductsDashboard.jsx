import React, { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import AddProduct from "../AddProduct/AddProduct";
import { GoTrash } from "react-icons/go";
import { LuPenLine } from "react-icons/lu";
import "./ProductsDashboard.scss";

const ProductsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err), setIsLoading(false);
      });
  }, [products]);

  return (
    <div className="products-dash-wrapper">
      <AddProduct />
      <div className="products-dash">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="view">Name:</th>
                <th className="view">Price:</th>
                <th className="view">Stock:</th>
                <th className="view">Discount:</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <p>{i + 1}</p>
                    </td>
                    <td>
                      <p>{product.title}</p>
                    </td>
                    <td className="view">
                      <p>{product.price} $</p>
                    </td>
                    <td className="view">
                      <p>{product.stock}</p>
                    </td>
                    <td className="view">
                      <p>{product.discountPercentage} %</p>
                    </td>
                    <td>
                      <img src={product.thumbnail} />
                    </td>
                    <td>
                      <button>
                        <LuPenLine />
                      </button>
                    </td>
                    <td>
                      <button className="delete">
                        <GoTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;
