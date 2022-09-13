const router = require("express").Router();

const {
  register,
  login,
  get,
  getById,
  updateById,
  deleteById,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/").get(get);

router.route("/get/:id").get(getById);

router.route("/update/:id").put(updateById);

router.route("/delete/:id").delete(deleteById);

module.exports = router;
