const table_name = "books";

const addBook = `INSERT INTO ${table_name} (name, description, author, price, quantity) VALUES ($1, $2, $3, $4, $5)`;
const findByNameAndAuthor = `SELECT * FROM ${table_name} WHERE name = $1 AND author = $2`;
const deleteBook = `UPDATE ${table_name} SET deleted_at = NOW() WHERE ID = $1`;
const getBooks = `SELECT id, name, author, description, price, quantity FROM ${table_name} WHERE deleted_at IS NULL ORDER BY id DESC`;
const getBookById = `SELECT id, name, author, description, price, quantity FROM ${table_name} WHERE id = $1 AND deleted_at IS NULL`;
const updateBook = `UPDATE ${table_name} SET name = $2, description = $3, author = $4, price = $5, quantity = $6 WHERE ID = $1`;
const updateBookQuantity = `UPDATE ${table_name} SET quantity = $2 WHERE ID = $1`;

module.exports = {
  addBook,
  findByNameAndAuthor,
  deleteBook,
  getBooks,
  getBookById,
  updateBook,
  updateBookQuantity
}