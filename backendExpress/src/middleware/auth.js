const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("./catchAsynErrors");
const jwt = require("jsonwebtoken")
// const User = require("../models/userModels");
const User = require("../model/registor");

exports.isAuthenticatedUser = catchAsynErrors(async (req, res, next) => {

  try {
    const token = req?.headers.authorization;
    if (!token) {
      res.status(401).json("no Token or invalid token")
      return next(new ErrorHandler("please login to access this resource", 401))
    }
    let Rowtoken = token.split(" ")[1]

    const decodedData = jwt.verify(Rowtoken, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData._id);
    next();
  }
  catch (error) {
    res.status(401).json("invalid token")
  }
   
})

exports.authorizeRole = (...roles) => {

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role:${req.user.role} is not allowed to use this resource`, 403));
    }
    next();
  }
} 