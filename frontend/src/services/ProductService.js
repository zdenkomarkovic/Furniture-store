import axios from "axios";

class ProductService {
  static getAllProducts = () => axios.get("/product/getAllProducts");
  static pagination = (limit, page) => axios.get(`/product/${limit}/${page}`);

  static addProduct = (product) => axios.post("/product/addProduct", product);

  static updateProduct = (id, product) =>
    axios.put(`/product/update/${id}`, product);

  static deleteProduct = (id) => axios.delete(`/product/delete/${id}`);
}
export default ProductService;
