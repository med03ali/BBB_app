const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET ;

console.log('jwt secret:' + JWT_SECRET);

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied. No token.' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
