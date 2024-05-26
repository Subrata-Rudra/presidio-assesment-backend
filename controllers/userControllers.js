const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const signupUser = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, isSeller } =
    req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    if (isSeller) {
      throw new Error("Seller already exists");
    } else {
      throw new Error("Buyer already exists");
    }
  }

  let user;
  if (isSeller) {
    user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      isSeller,
    });
  } else {
    user = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
  }

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if ((user, await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      isSeller: user.isSeller,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

const getSellerInfo = async (req, res) => {
  const id = req.query.id;
  const seller = await User.findById(id);
  if (seller) {
    const sellerInfo = {
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      phoneNumber: seller.phoneNumber,
    };
    res.status(200).send(sellerInfo);
  } else {
    res.status(404);
    throw new Error("Seller not found.");
  }
};

module.exports = { signupUser, loginUser, getSellerInfo };
