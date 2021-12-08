const User = require('../models/User');

module.exports = (roles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const userRole = user.role;
    if (roles.includes(userRole)){
      next();
    }else{
      res.status(401).json({
        status: "fail",
        message: "Permission Denied",
      });
    }
  }
}
