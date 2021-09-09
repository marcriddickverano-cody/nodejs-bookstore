const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const pool = require('../../database')
const queries = require('../queries/users');

const deleteUser = async (req, res) => {
  const id = req.userData.is_admin ? parseInt(req.params.id) : parseInt(req.userData.user_id);
  const user_results = await _getByUserId(id);

  if (user_results) {
    pool.query(queries.deleteUser, [id], (error, results) => {
      if (error) {
        throw error;
      } else {
        return res.status(200).send({
          error: true,
          message: "User has been deactivated."
        });
      }
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "User doesn't exist."
    });
  }
}

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) {
      throw error;
    }

    return res.status(200).json({
      error: false,
      data: results.rows
    });
  })
}

const getUserById = async(req, res) => {
  const id = req.userData.is_admin ? parseInt(req.params.id) : parseInt(req.userData.user_id);
  
  const user = await _getByUserId(id);

  if (user) {
    return res.status(200).json({
      error: false,
      data: user
    });
  } else {
    return res.status(404).send({
      error: true,
      message: "User doesn't exist."
    });
  }
}

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const {email, password} = req.body;
  const user = await _getByEmail(email);

  if (user) {
    if (user.deleted_at) {
      return res.status(401).send({
        error: true,
        message: "Authentication failed. User account is deactivated."
      });
    }

    bcrypt.compare(password, user.password, (error, results) => {
      if (error) {
        return res.status(401).send({
          error: true,
          message: "Authentication failed."
        });
      }

      if (!results) {
        return res.status(400).send({
          error: true,
          message: "Invalid credentials."
        });
      } else {
        const token = jwt.sign({user_id: user.id}, process.env.APP_KEY, {expiresIn:"1D"});

        return res.status(200).send({
          error: false,
          message: "You have logged in successfully.",
          acces_token: token
        });
      }
    });
  } else {
    return res.status(400).send({
      error: true,
      message: "Invalid credentials."
    });
  }
}

const registerUser = async (req, res) => {
  const { error } = _validateUser(req.body);

  if (error) {
    if (error.details[0].context.label == "confirm_password") {
      return res.status(400).send({
        error: true,
        message: "Password doesn't match."
      });
    } else {
      return res.status(400).send({
        error: true,
        message: error.details[0].message
      });
    }
  }

  const {name, age, email, password} = req.body;
  const email_results = await _getByEmail(email);

  if (!email_results) {
    let hashed_password = await bcrypt.hash(password, 10);
    
    pool.query(
      queries.addUser,
      [name, age, email, hashed_password],
      (error, results) => {
      if (error) {
        throw error;
      }
  
      return res.status(200).send({
        error: false,
        message: "You have successfully registered."
      });
    });
  } else {
    return res.status(409).send({
      error: true,
      message: "Email already exists."
    });
  }
}

const updateUser = async (req, res) => {
  const id = req.userData.is_admin ? parseInt(req.params.id) : parseInt(req.userData.user_id);
  const { error } = _validateUser(req.body);

  if (error) {
    if (error.details[0].context.label == "confirm_password") {
      return res.status(400).send({
        error: true,
        message: "Password doesn't match."
      });
    } else {
      return res.status(400).send({
        error: true,
        message: error.details[0].message
      });
    }
  }

  const {name, age, email, password} = req.body;
  const user_results = await _getByUserId(id);

  if (user_results) {
    const email_results = await _getByEmail(email);

    if (email_results && email_results.id != id) {
      return res.status(409).send({
        error: true,
        message: "Email already exists."
      });
    } else {
      const hashed_password = await bcrypt.hash(password, 10);

      pool.query(
        queries.updateUser,
        [id, name, age, email, hashed_password],
        (error, results) => {
        if (error) {
          throw error;
        } else {
          return res.status(201).send({
            error: false,
            message: "User updated successfully."
          });
        }
      });
    }
  } else {
    return res.status(404).send({
      error: true,
      message: "Invalid User ID."
    });
  }
}

async function _getByEmail(email) {
  const {rows} = await pool.query(queries.getByEmail, [email]);

  if (rows.length) {
    return rows[0];
  } else {
    return 0;
  }
}

async function _getByUserId(user_id) {
  const {rows} = await pool.query(queries.getUserById, [user_id]);

  if (rows.length) {
    return rows[0];
  } else {
    return 0;
  }
}

function _validateUser(params) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    age: Joi.number().integer().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.ref('password')
  });

  return schema.validate(params);
}

module.exports = {
  deleteUser,
  getUsers,
  getUserById,
  login,
  registerUser,
  updateUser
}