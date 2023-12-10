const ProductModel = require('../../model/productModel');

const getAllProducts = (req, res) => {
  ProductModel.find({})
    .then(products => res.send(products))
    .catch(err => res.send(err));
};
module.exports = getAllProducts;
