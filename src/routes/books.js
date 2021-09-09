const auth = require("../middlewares/auth");
const router = require("express").Router();
const service = require("../services/books");

router.get("/", auth, service.getBooks);
router.get("/:id", auth, service.getBookById);
router.post("/purchase", auth, service.purchaseBook);

module.exports = router