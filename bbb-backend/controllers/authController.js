const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userService.findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Invalid user name' });

    //const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (password !== user.password) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { userId: user.id, fullName: user.fullName, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, fullName: user.fullName, username: user.username, role: user.role, id: user.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

