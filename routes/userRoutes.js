const express = require("express");
const {
  signupUser,
  loginUser,
  getSellerInfo,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/sellerInfo").get(getSellerInfo);

module.exports = router;
