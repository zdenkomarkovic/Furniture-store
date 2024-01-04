const ProductModel = require("../../model/productModel");

const getSingleProduct = (req, res) => {
  const productId = req.params.id;
  ProductModel.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.send(product);
    })
    .catch((err) => {
      res.send(err);
      res.status(500).json({ error: "Server error" });
    });
};
module.exports = getSingleProduct;
