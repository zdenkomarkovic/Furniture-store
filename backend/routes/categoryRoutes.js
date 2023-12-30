const express = require("express");
const router = express.Router();

router.get(
  "/allCategories",
  require("../controlers/categoryControler/allCategories")
);

router.post(
  "/addCategory",
  require("../controlers/categoryControler/addCategory.js")
);

module.exports = router;
