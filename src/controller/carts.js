const book_queries = require('../queries/books');
const cart_queries = require('../queries/carts');
const pool = require('../../database');
const Joi = require('joi');

async function _getBookById(id) {
  const { rows } = await pool.query(book_queries.getBookById, [id]);

  if (rows.length) {
    return rows[0];
  } else {
    return 0;
  }
}

async function _getCartById(id) {
  const { rows } = await pool.query(cart_queries.getById, [id]);

  if (rows.length) {
    return rows[0];
  } else {
    return 0;
  }
}

const getList = (req, res) => {
  const user_id = parseInt(req.userData.user_id);

  pool.query(
    cart_queries.getList,
    [
      user_id
    ],
    (error, results) => {
    if (error) {
      return res.status(500).json({
        error: true,
        message: error.message
      });
    } else {
      return res.status(200).json({
        error: false,
        data: results.rows
      });
    }
  });
}

const addBook = async (req, res) => {
  const book_id = parseInt(req.body.book_id);
  const user_id = parseInt(req.userData.user_id);
  const quantity = parseInt(req.body.quantity);

  const book = await _getBookById(book_id);

  if (book) {
    const { rows } = await pool.query(cart_queries.getByBookIdAndUserId, [book_id, user_id]);

    if (rows.length) {
      // Update book quantity from cart
      const new_quantity = rows[0].quantity + quantity;

      pool.query(
        cart_queries.updateBookQuantity,
        [rows[0].id, new_quantity],
        (error, results) => {
        if (error) {
          return res.status(500).json({
            error: true,
            message: error.message
          });
        } else {
          return res.status(200).json({
            error: false,
            message: `Book ${book.name} quantity has been updated.`
          });
        }
      });
    } else {
      // Add book to cart
      pool.query(
        cart_queries.add,
        [
          book_id,
          user_id,
          quantity
        ],
        (error, results) => {
          if (error) {
            return res.status(500).json({
              error: true,
              message: error.message
            });
          } else {
            return res.status(200).json({
              error: false,
              message: `Book ${book.name} has been added to cart successfully.`
            });
          }
      });
    }
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book ID."
    });
  }
}

const removeBook = async (req, res) => {
  const cart_id = parseInt(req.params.id);
  const cart = await _getCartById(cart_id);
  const user_id = parseInt(req.userData.user_id);

  if (cart) {
    if (cart.user_id != user_id) {
      return res.status(500).json({
        error: true,
        message: 'Unable to remove book from cart.'
      });
    }

    pool.query(
      cart_queries.remove,
      [cart_id],
      (error, results) => {
      if (error) {
        return res.status(500).json({
          error: true,
          message: error.message
        });
      } else {
        return res.status(200).send({
          error: true,
          message: "Book has been removed successfully."
        });
      }
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book Cart ID."
    });
  }
}

const updateCart = async (req, res) => {
  const cart_id = parseInt(req.params.id);
  const new_quantity = parseInt(req.body.quantity);

  pool.query(
    cart_queries.updateBookQuantity,
    [cart_id, new_quantity],
    (error, results) => {
    if (error) {
      return res.status(500).json({
        error: true,
        message: error.message
      });
    } else {
      return res.status(200).json({
        error: false,
        message: `Book quantity has been updated.`
      });
    }
  });
}

module.exports = {
  addBook,
  getList,
  removeBook,
  updateCart
}