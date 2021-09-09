const auth = require("../middlewares/auth");
const router = require("express").Router();
const service = require("../services/users");

router.get("/", auth, service.getUserById);
router.get("/profile", auth, service.getUserById);
router.post("/login", service.login);
router.post("/register", service.registerUser);
router.put("/", auth, service.updateUser);
router.delete("/profile/delete", auth, service.deleteUser);

module.exports = router