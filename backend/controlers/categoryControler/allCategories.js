const CategoryModel = require("../../model/categoryModel");

const allCategories = (req, res) => {
  CategoryModel.find({})
    .then((category) => res.send(category))
    .catch((err) => res.send(err));
};
module.exports = allCategories;
