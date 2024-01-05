import { useEffect, useState } from "react";
import ProductService from "../../../services/ProductService";
import AddProduct from "../AddProduct/AddProduct";
import { GoTrash } from "react-icons/go";
import { LuPenLine } from "react-icons/lu";
import "./ProductsDashboard.scss";
import { toast } from "react-toastify";

const ProductsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleDeleteProduct = (id) => {
    const isConfirmed = window.confirm("Do you want to delete product");
    if (isConfirmed) {
      ProductService.deleteProduct(id)
        .then((res) => {
          toast.success("Product deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("delete product canceled");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="products-dash-wrapper">
      <AddProduct item={selectedProduct} />
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
                      <button onClick={() => handleEditProduct(product)}>
                        <LuPenLine />
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
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
