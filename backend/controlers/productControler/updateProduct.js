const { httpStatus } = require("../../config/constants");
const ProductModel = require("../../model/productModel");

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const query = { _id: id };
  ProductModel.findOneAndUpdate(query, updatedData, { new: true })
    .then((category) => {
      res
        .status(httpStatus.SUCCESS.status)
        .send({ msg: "Product is updated", category });
    })
    .catch((err) => {
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send(httpStatus.SERVICE_ERROR.send);
    });
};
module.exports = updateProduct;
