import { useEffect, useRef, useState } from "react";
import ProductService from "../../../services/ProductService";
import AddProduct from "../AddProduct/AddProduct";
import { GoTrash } from "react-icons/go";
import { LuPenLine } from "react-icons/lu";
import "./ProductsDashboard.scss";
import { toast } from "react-toastify";
import { SlArrowDown } from "react-icons/sl";

const ProductsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [importCategories, setImportCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleImportCategories = (categories) => {
    setImportCategories(categories);
  };

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      search ? product.title.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    );

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="products-dash-wrapper">
      <AddProduct
        item={selectedProduct}
        exportCategories={handleImportCategories}
      />

      <div className="products-dash">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <div>
            <div className="search">
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={handleSearchChange}
              />
              <div className="custom-dropdown" ref={dropdownRef}>
                <div className="dropdown-selected" onClick={toggleDropdown}>
                  {selectedCategory === "" ? (
                    <>
                      All Categories <SlArrowDown className="icon" />
                    </>
                  ) : (
                    importCategories.find((c) => c._id === selectedCategory)
                      ?.title
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-options">
                    <div
                      className="dropdown-option"
                      onClick={() => handleCategoryClick("")}
                    >
                      All Categories
                    </div>
                    {importCategories.map((category, index) => (
                      <div
                        key={index}
                        className="dropdown-option"
                        onClick={() => handleCategoryClick(category._id)}
                      >
                        {category.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
                {filteredProducts?.map((product, i) => {
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsDashboard;
