const jwt = require("jsonwebtoken");

// Protect Routes Middleware
const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Save user information in request
      req.user = decoded;

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Token Missing.",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized. Invalid Token.",
    });
  }
};

module.exports = protect;