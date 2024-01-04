import axios from "axios";
class CategoryService {
  static allCategories = () => axios.get("/category/allCategories");

  static getCategoryById = (id) => axios.get(`/category/singleCategory/${id}`);

  static addCategory = (category) =>
    axios.post("/category/addCategory", category);

  static updateCategory = (id, category) =>
    axios.put(`/category/update/${id}`, category);

  static deleteCategory = (id) => axios.delete(`/category/delete/${id}`);
}

export default CategoryService;
