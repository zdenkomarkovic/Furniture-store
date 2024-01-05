const express = require("express");
const router = express.Router();

router.get(
  "/:limit/:page",
  require("../controlers/productControler/pagination")
);
router.get(
  "/getAllProducts",
  require("../controlers/productControler/getAllProducts")
);
router.get("/:id", require("../controlers/productControler/getSingleProduct"));

router.post(
  "/addProduct",
  require("../controlers/productControler/addProduct")
);

router.put(
  "/update/:id",
  require("../controlers/productControler/updateProduct")
);

router.delete(
  "/delete/:id",
  require("../controlers/productControler/deleteProduct")
);

module.exports = router;
