const CategoryModel = require("../../model/categoryModel");

const singleCategory = (req, res) => {
  const categoryId = req.params.id;
  CategoryModel.findById(categoryId)
    .then((category) => {
      if (!category) {
        return res.status(404).json({ error: "Category didn't found" });
      }
      res.send(category);
    })
    .catch((err) => {
      res.send(err);
      res.status(500).json({ error: "Server error" });
    });
};

module.exports = singleCategory;
