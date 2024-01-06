import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import ProductService from "../../services/ProductService";
import { Link } from "react-router-dom";
import "./Products.scss";
import { useDispatch, useSelector } from "react-redux";
import { storeAllProducts } from "../../store/productSlice";
import CategoryService from "../../services/CategoryService";
import { SlArrowDown } from "react-icons/sl";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productStore);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownCategoryOpen, setIsDropdownCategoryOpen] = useState(false);

  const dropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((res) => {
        dispatch(storeAllProducts(res.data));

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    CategoryService.allCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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

  const toggleDropdown = () => {
    setIsDropdownCategoryOpen(!isDropdownCategoryOpen);
  };
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsDropdownCategoryOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownCategoryOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortProducts = (products) => {
    if (sortOrder === "lowToHigh") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };
  const sortedProducts = sortProducts(filteredProducts);

  const handleSortOptionClick = (value) => {
    setSortOrder(value);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Header title="Products" />
      <div className="container products-wrapper">
        {isLoading ? (
          <div className="products">
            {Array.from({ length: 6 }).map((_, id) => (
              <motion.div key={id} className="card skeleton"></motion.div>
            ))}
          </div>
        ) : (
          <div>
            <div className="search">
              <input
                type="text"
                placeholder="Search Products..."
                value={search}
                onChange={handleSearchChange}
              />
              <div className="custom-dropdown" ref={categoryDropdownRef}>
                <div className="dropdown-selected" onClick={toggleDropdown}>
                  {selectedCategory === "" ? (
                    <>
                      All Categories <SlArrowDown className="icon" />
                    </>
                  ) : (
                    categories.find((c) => c._id === selectedCategory)?.title
                  )}
                </div>
                {isDropdownCategoryOpen && (
                  <div className="dropdown-options">
                    <div
                      className="dropdown-option"
                      onClick={() => handleCategoryClick("")}
                    >
                      All Categories
                    </div>
                    {categories.map((category, index) => (
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

              <div className="custom-dropdown" ref={dropdownRef}>
                <div
                  className="dropdown-selected"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  {sortOrder === "default" ? (
                    <>
                      Sort by price <SlArrowDown className="icon" />{" "}
                    </>
                  ) : sortOrder === "lowToHigh" ? (
                    "Low to High"
                  ) : (
                    "High to Low"
                  )}
                </div>
                {isDropdownOpen && (
                  <div className="dropdown-options">
                    <div
                      className="dropdown-option"
                      onClick={() => handleSortOptionClick("default")}
                    >
                      Sort by price
                    </div>
                    <div
                      className="dropdown-option"
                      onClick={() => handleSortOptionClick("lowToHigh")}
                    >
                      Low to High
                    </div>
                    <div
                      className="dropdown-option"
                      onClick={() => handleSortOptionClick("highToLow")}
                    >
                      High to Low
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="products">
              {sortedProducts.map((product, i) => (
                <motion.div
                  whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
                  transition={{ duration: 0.5 }}
                  className="card"
                  key={i}
                >
                  <div className="image">
                    <Link to={`/single/${product._id}`}>
                      <img src={product.thumbnail} alt={product.name} />{" "}
                    </Link>
                  </div>
                  <div className="text">
                    <div className="title">
                      <h6>{product.title}</h6>
                      <p>$ {product.price.toLocaleString()}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="product-btn"
                    >
                      <Link to={`/single/${product._id}`}> Details </Link>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
