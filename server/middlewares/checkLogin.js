const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.status(401).json({
      status: "fail",
      message: "User already logged in",
    });
  } catch(error) {
    next();
  }
}
