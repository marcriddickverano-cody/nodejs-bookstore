const auth = require("../middlewares/auth");
const router = require("express").Router();
const controller = require("../controller/books");

router.get("/", auth, controller.getBooks);
router.get("/:id", auth, controller.getBookById);
router.post("/purchase", auth, controller.purchaseBook);

module.exports = router