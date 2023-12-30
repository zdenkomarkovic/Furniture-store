import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryService from "../../../services/CategoryService";
import { setAllCategories } from "../../../store/categorySlice";
import AddCategory from "../AddCategory/AddCategory";
import "./CategoriesDashboard.scss";

const CategoriesDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryStore);

  useEffect(() => {
    CategoryService.allCategories()
      .then((res) => {
        dispatch(setAllCategories(res.data));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [categories]);
  return (
    <div className="category-wrapper ">
      <h6>Categories</h6>
      <AddCategory />
      <div className="categories">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <table>
            <tbody>
              {categories.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.title} </td>
                    <td>
                      <img src={item.image} />
                    </td>
                    <td>
                      <button>Update</button>
                    </td>
                    <td>
                      <button>Delete</button>
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

export default CategoriesDashboard;
