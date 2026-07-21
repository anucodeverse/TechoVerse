const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect Routes Middleware
const protect = async (req, res, next) => {
  try {

    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {

      token = req.headers.authorization.split(" ")[1];


      // Verify JWT
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );


      // Get user from database
      const user = await User.findById(decoded.id);


      if (!user) {
        return res.status(401).json({
          success:false,
          message:"User not found"
        });
      }


      // Attach complete user
      req.user = user;


      return next();

    }


    return res.status(401).json({
      success:false,
      message:"Not Authorized. Token Missing."
    });


  } catch(error){

    console.error("Auth Middleware Error:",error);


    return res.status(401).json({
      success:false,
      message:"Not Authorized. Invalid Token."
    });

  }
};


module.exports = protect;