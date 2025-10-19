const jwt = require('jsonwebtoken');

function generateToken(userId, role) {
  const secret = process.env.JWT_SECRET;
  const payload = { sub: userId, role };
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

module.exports = generateToken;
