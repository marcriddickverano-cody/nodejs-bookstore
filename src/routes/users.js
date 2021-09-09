const auth = require("../middlewares/auth");
const router = require("express").Router();
const controller = require("../controller/users");

router.get("/", auth, controller.getUserById);
router.get("/profile", auth, controller.getUserById);
router.post("/login", controller.login);
router.post("/register", controller.registerUser);
router.put("/", auth, controller.updateUser);
router.delete("/profile/delete", auth, controller.deleteUser);

module.exports = router