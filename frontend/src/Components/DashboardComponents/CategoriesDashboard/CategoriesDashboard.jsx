import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CategoryService from "../../../services/CategoryService";
import { setAllCategories } from "../../../store/categorySlice";
import AddCategory from "../AddCategory/AddCategory";
import "./CategoriesDashboard.scss";
import { GoTrash } from "react-icons/go";
import { LuPenLine } from "react-icons/lu";

const CategoriesDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  const handleDeleteCategory = (item) => {
    CategoryService.deleteCategory(item._id)
      .then((res) => {
        toast.success("Category deleted");
      })
      .catch((err) => console.log(err));
  };
  const handleEditCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="category-dash-wrapper ">
      <AddCategory item={selectedCategoryId} />
      <div className="categories-dash">
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          <table>
            <tbody>
              {categories.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <p>{i + 1}</p>
                    </td>
                    <td>
                      <p>{item.title}</p>{" "}
                    </td>
                    <td>
                      <img src={item.image} />
                    </td>
                    <td>
                      <button onClick={() => handleEditCategory(item)}>
                        <LuPenLine />
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteCategory(item)}
                        className="delete"
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

export default CategoriesDashboard;
