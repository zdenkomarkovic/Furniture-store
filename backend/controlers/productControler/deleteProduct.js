const { httpStatus } = require("../../config/constants");
const ProductModel = require("../../model/productModel");

const deleteProduct = (req, res) => {
  const { id } = req.params;

  ProductModel.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 1) {
        res.send({ msg: "Product deleted" });
      } else {
        res
          .status(httpStatus.NOT_FOUND.status)
          .send({ msg: "Product doesn't exists" });
      }
    })
    .catch((error) => {
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send({ error: error.message });
    });
};
module.exports = deleteProduct;
