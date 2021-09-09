const auth = require("../middlewares/admin_auth");
const router = require("express").Router();
const bookService = require("../services/books");
const bookSalesService = require("../services/book_sales");
const userService = require("../services/users");

router.post("/login", userService.login);

router.get("/users", auth, userService.getUsers);
router.get("/users/:id", auth, userService.getUserById);
router.put("/users/:id", auth, userService.updateUser);
router.delete("/users/:id", auth, userService.deleteUser);

router.get("/books", auth, bookService.getBooks);
router.get("/books/:id", auth, bookService.getBookById);
router.post("/books", auth, bookService.addBook);
router.put("/books/:id", auth, bookService.updateBook);
router.delete("/books/:id", auth, bookService.deleteBook);

router.get("/books-sales", auth, bookSalesService.getBookSales);

module.exports = router