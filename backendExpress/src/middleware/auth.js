const ErrorHandler = require("../utils/errorhandler");
const catchAsynErrors = require("./catchAsynErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/registor");

exports.isAuthenticatedUser = catchAsynErrors(async (req, res, next) => {
  try {
    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, error: "No authorization token provided. Please log in." });
    }

    const tokenParts = authHeader.split(" ");
    const rawToken = tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];

    if (!rawToken || rawToken === "false" || rawToken === "null" || rawToken === "undefined") {
      return res.status(401).json({ success: false, error: "Invalid token format. Please log in." });
    }

    const decodedData = jwt.verify(rawToken, process.env.SECRET_KEY);
    const user = await User.findById(decodedData._id);
    if (!user) {
      return res.status(401).json({ success: false, error: "User session expired or user not found. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid or expired token. Please log in again." });
  }
});

exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: `Role (${req.user?.role || "guest"}) is not authorized to access this resource.` });
    }
    next();
  };
};