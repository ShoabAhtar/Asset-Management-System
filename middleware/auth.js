const jwt = require('jsonwebtoken');
// import jwt_decode from 'jwt-decode';
const jwt_decode = require('jwt-decode');

const verifyToken = (req, res, next) => {
  // console.log(`headers are ${req.headers}`);
  const token = req.headers['authorization'];
  const newToken = token.replace('Bearer ', '');
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(newToken, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    // console.log(err);
    return res.status(401).send('Invalid Token');
  }
  const decodedToken = jwt.decode(newToken);
  // console.log(`decodedToken is`, decodedToken);
  role = decodedToken.role;
  // console.log('Role is ', role);
  if (role == 'hr') return next();
  else res.send('you are not authorized');
};
module.exports = verifyToken;
