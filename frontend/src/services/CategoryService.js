import axios from "axios";

class CategoryService {
  static allCategories = () => axios.get("/category/allCategories");

  static addCategory = (category) =>
    axios.post("/category/addCategory", category);
}

export default CategoryService;
