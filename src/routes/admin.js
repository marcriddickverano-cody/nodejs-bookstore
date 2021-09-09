const auth = require("../middlewares/admin_auth");
const router = require("express").Router();
const bookController = require("../controller/books");
const bookSalesController = require("../controller/book_sales");
const userController = require("../controller/users");

router.post("/login", userController.login);
router.get("/users", auth, userController.getUsers);
router.get("/users/:id", auth, userController.getUserById);
router.put("/users/:id", auth, userController.updateUser);
router.delete("/users/:id", auth, userController.deleteUser);

router.get("/books", auth, bookController.getBooks);
router.get("/books/:id", auth, bookController.getBookById);
router.post("/books", auth, bookController.addBook);
router.put("/books/:id", auth, bookController.updateBook);
router.delete("/books/:id", auth, bookController.deleteBook);

router.get("/books-sales", auth, bookSalesController.getBookSales);

module.exports = router