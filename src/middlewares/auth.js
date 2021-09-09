const queries = require('../queries/users');
const jwt = require('jsonwebtoken');
const pool = require('../../database');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.APP_KEY);

    pool.query(queries.getUserById, [decoded.user_id], (error, results) => {
      if (error) {
        throw error;
      } 
      
      if (!results.rows.length) {
        return res.status(403).json({message: "Invalid token."});
      } else {
        decoded.is_admin = results.rows[0].is_admin;

        if (!decoded.is_admin) {
          req.userData = decoded;
          next();
        } else {
          return res.status(403).json({message: "Permission denied. Admin users should only access admin routes."});
        }
      }
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token. Unable to access API."
    });
  }
}