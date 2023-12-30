const CategoryModel = require("../../model/categoryModel");

const addCategory = (req, res) => {
  let newCategory = new CategoryModel(req.body);
  newCategory
    .save()
    .then(() => res.send("Category added"))
    .catch((err) => res.send(err));
};
module.exports = addCategory;
