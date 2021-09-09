const addUser = "INSERT INTO users (name, age, email, password) VALUES ($1, $2, $3, $4)";
const deleteUser = "UPDATE users SET deleted_at = NOW() WHERE ID = $1";
const getUsers = "SELECT * FROM users WHERE deleted_at IS NULL ORDER BY id DESC";
const getUserById = "SELECT * FROM users WHERE id = $1";
const getByEmail = "SELECT * FROM users WHERE email = $1";
const updateUser = "UPDATE users SET name = $2, age = $3, email = $4, password = $5 WHERE ID = $1";

module.exports = {
  addUser,
  deleteUser,
  getUsers,
  getUserById,
  getByEmail,
  updateUser
}