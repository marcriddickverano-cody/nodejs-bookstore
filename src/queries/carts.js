const table_name = "carts";

const add = `INSERT INTO ${table_name} (book_id, user_id, quantity) VALUES ($1, $2, $3)`;
const remove = `UPDATE ${table_name} SET deleted_at = NOW() WHERE ID = $1`;
const getByBookIdAndUserId = `SELECT * FROM ${table_name} WHERE book_id = $1 AND user_id = $2 AND deleted_at IS NULL`;
const getById = `SELECT c.id, c.user_id, b.name as book_name, c.quantity, c.created_at, c.updated_at 
FROM carts c 
INNER JOIN books AS b ON c.book_id=b.id
INNER JOIN users AS u ON c.user_id=u.id
WHERE c.id = $1 AND c.deleted_at IS NULL ORDER BY c.id DESC`;
const getList = `SELECT c.id, b.name as book_name, c.quantity, c.created_at, c.updated_at 
FROM carts c 
INNER JOIN books AS b ON c.book_id=b.id
INNER JOIN users AS u ON c.user_id=u.id
WHERE c.user_id = $1 AND c.deleted_at IS NULL ORDER BY c.id DESC`;
const updateBookQuantity = `UPDATE ${table_name} SET quantity = $2 WHERE ID = $1`;

module.exports = {
  add,
  remove,
  getByBookIdAndUserId,
  getById,
  getList,
  updateBookQuantity
}