const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    return res.status(433).json({ error: "Token must be required." });
  }
  const token = authHeader.split(" ")[1];
  // verify a token symmetric
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, user) => {
    if (!user) {
      return res.json({ error: "Invalid Token !" });
    }
    const currentUser = await User.findById(user._id);

    if(currentUser == null){
      return res.json({ error: "Invalid Token !" });
    }
    currentUser.password = undefined
    req.user = currentUser;
    next();
  });
};
