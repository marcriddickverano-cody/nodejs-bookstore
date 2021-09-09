const table_name = "book_sales";

const getBookSales = `SELECT bs.id, bs.book_id, bs.user_id, b.name as book_name, u.name as user_name, bs.quantity, bs.total_price, bs.created_at 
FROM book_sales bs
INNER JOIN books AS b ON bs.book_id=b.id
INNER JOIN users AS u ON bs.user_id=u.id
ORDER BY bs.id DESC`;
const purchaseBook = `INSERT INTO ${table_name} (book_id, user_id, quantity, total_price) VALUES ($1, $2, $3, $4)`;

module.exports = {
  getBookSales,
  purchaseBook
}