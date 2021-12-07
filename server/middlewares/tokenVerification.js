const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('authorization');
  const token = authHeader && authHeader.split(' ')[1]
  if(!token){
    return res.status(401).json({
      status:'fail',
      message:'Access denied'
    });
  }
  try{
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  }catch(err){
    res.status(401).json({
      status:'fail',
      message:'Invalid Token'
    });
  }
}
