const express = require("express");
const router = express.Router();

router.get(
  "/allCategories",
  require("../controlers/categoryControler/allCategories")
);
router.get(
  "/singleCategory/:id",
  require("../controlers/categoryControler/singlecategory")
);

router.post(
  "/addCategory",
  require("../controlers/categoryControler/addCategory.js")
);

router.put(
  "/update/:id",
  require("../controlers/categoryControler/updateCategory")
);

router.delete(
  "/delete/:id",
  require("../controlers/categoryControler/deleteCategory")
);

module.exports = router;
