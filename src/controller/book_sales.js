const Joi = require('joi');
const pool = require('../../database');
const book_sales_queries = require('../queries/book_sales');

const getBookSales = (req, res) => {
  pool.query(book_sales_queries.getBookSales, (error, results) => {
    if (error) {
      throw error;
    } else {
      return res.status(200).json({
        error: false,
        data: results.rows
      });
    }
  });
}

module.exports = {
  getBookSales
}