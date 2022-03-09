require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

const adminRoutes = require('./src/routes/admin');
const bookRoutes = require('./src/routes/books');
const cartRoutes = require('./src/routes/carts');
const userRoutes = require('./src/routes/users');

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
  res.send("Welcome to NodeJS API")
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})