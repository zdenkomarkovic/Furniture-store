const CategoryModel = require("../../model/categoryModel");

const updateCategory = (req, res) => {
  const { id } = req.params;
  const { ...updatedData } = req.body;
  const query = { _id: id };

  CategoryModel.findOneAndUpdate(query, updatedData, { new: true })
    .then((category) => {
      res.status(200).send({ message: "Category is updated", category });
    })
    .catch((err) => res.status(403).send({ error: error.message }));
};
module.exports = updateCategory;
