const auth = require("../middlewares/auth");
const router = require("express").Router();
const controller = require("../controller/carts");

router.delete("/books/:id", auth, controller.removeBook);
router.get("/books", auth, controller.getList);
router.post("/books", auth, controller.addBook);
router.put("/books/:id", auth, controller.updateCart);

module.exports = router