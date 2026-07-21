const jwt = require("jsonwebtoken");

// Protect Routes Middleware
const protect = (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      // Extract Token
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Store User Information
      req.user = decoded;

      return next();
    }

    return res.status(401).json({
      success: false,
      message: "Not Authorized. Token Missing.",
    });
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Not Authorized. Invalid Token.",
    });
  }
};

module.exports = protect;