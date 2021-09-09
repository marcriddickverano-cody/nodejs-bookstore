const Joi = require('joi');
const pool = require('../../database');
const book_queries = require('../queries/books');
const book_sales_queries = require('../queries/book_sales');

const addBook = (req, res) => {
  const { error } = _validateBook(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }

  let {name, description, author, price, quantity} = req.body;
  
  pool.query(book_queries.findByNameAndAuthor, [name, author], async (error, results) => {
    if (results.rows.length) {
      return res.status(409).send({message: "Book with the same name and author already exists."});
    } else {
      pool.query(
        book_queries.addBook,
        [name, description, author, price, quantity],
        (error, results) => {
        if (error) {
          throw error;
        }
    
        return res.status(201).send({
          error: false,
          message: "Book added successfully."
        });
      });
    }
  });
}

const deleteBook = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await _getBookById(id);

  if (book) {
    pool.query(book_queries.deleteBook, [id], (error, results) => {
      if (error) {
        throw error;
      }
  
      return res.status(200).send({
        error: false,
        message: `${book.name} has been removed successfully.`
      });
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book ID."
    });
  }
}

const getBooks = (req, res) => {
  pool.query(book_queries.getBooks, (error, results) => {
    if (error) {
      throw error;
    }

    return res.status(200).json(results.rows);
  });
}

const getBookById = async (req, res) => {
  const id = parseInt(req.params.id);
  const book = await _getBookById(id);

  if (book) {
    return res.status(200).json({
      error: false,
      data: book
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book ID."
    });
  }
}

const purchaseBook = async (req, res) => {
  const book_id = parseInt(req.body.book_id);
  const user_id = parseInt(req.userData.user_id);
  const quantity = parseInt(req.body.quantity);

  const book = await _getBookById(book_id);

  if (book) {
    const total_price = book.price * quantity;
    const old_quantity = book.quantity;

    if (quantity > old_quantity) {
      return res.status(400).send({
        error: true,
        message: `Insuficient quantity requested. Only ${old_quantity} is available.`
      })
    }

    pool.query(
      book_sales_queries.purchaseBook,
      [book_id, user_id, quantity, total_price],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          const new_quantity = old_quantity - quantity;
          
          pool.query(book_queries.updateBookQuantity, [book_id, new_quantity], (error, results) => {
            if (error) {
              throw error;
            } else {
              return res.status(200).json({
                error: false,
                message: `Book ${book.name} has been purchased. Thank you.`
              });
            }
          });
        }
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book ID."
    });
  }
}

const updateBook = async (req, res) => {
  const id = parseInt(req.params.id);

  const { error } = _validateBook(req.body);
  if (error) {
    return res.status(404).send({
      message: error.details[0].message
    });
  }

  const book = await _getBookById(id);

  if (book) {
    const {name, description, author, price, quantity} = req.body;

    pool.query(
      book_queries.updateBook,
      [id, name, description, author, price, quantity],
      (error, results) => {
      if (error) {
        throw error;
      }
  
      return res.status(200).json({
        error: false,
        message: "Book successfully updated."
      });
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid Book ID."
    });
  }
}

async function _getBookById(id) {
  const {rows} = await pool.query(book_queries.getBookById, [id]);

  if (rows.length) {
    return rows[0];
  } else {
    return 0;
  }
}

function _validateBook(params) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    author: Joi.string().min(2).max(255).required(),
    price: Joi.number().integer().required(),
    quantity: Joi.number().integer().required()
  });

  return schema.validate(params);
}

module.exports = {
  addBook,
  deleteBook,
  getBooks,
  getBookById,
  updateBook,
  purchaseBook
}