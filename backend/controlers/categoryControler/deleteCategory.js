const CategoryModel = require("../../model/categoryModel");
const { httpStatus } = require("../../config/constants");

const deleteCategory = (req, res) => {
  const { id } = req.params;

  CategoryModel.deleteOne({ _id: id })
    .then((result) => {
      if (result.deletedCount === 1) {
        res.send({ msg: "Category deleted" });
      } else {
        res
          .status(httpStatus.NOT_FOUND.status)
          .send({ msg: "Category doesnt exist" });
      }
    })
    .catch((error) => {
      res
        .status(httpStatus.SERVICE_ERROR.status)
        .send({ error: error.message });
    });
};

module.exports = deleteCategory;
