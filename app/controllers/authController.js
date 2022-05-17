const User = require('../models/user');

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const {secret} = require('../config/keys');

const jwt = require('jsonwebtoken');

const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username
  };
  return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthController {

  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array()[0]["msg"]);
        return res.status(400).json({message: errors.array()[0]["msg"]});
      }

      const {username, password} = req.body;
      const candidate = await User.findOne({username});
      if (candidate) {
        return res.status(400).json({message: "A user with the same name already exists"});
      }

      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({username: username, password: hashPassword});
      await user.save();
      
      const token = generateAccessToken(user._id, user.username);
      return res.json({token: token});
    } catch(e) {
      console.log(e);
      res.status(400).json({massage: "Registration error"});
    }
  }

  async login(req, res) {
    try {
      const {username, password} = req.body;
      const user = await User.findOne({username});

      if (!user) {
        return res.status(400).json({message: `User ${username} is not found`});
      }

      const validPassword = bcrypt.compareSync(password, user.password);

      if (!validPassword) {
        return res.status(400).json({message: "Invalid password"});
      }

      const token = generateAccessToken(user._id, user.username);
      return res.json({token: token});

    } catch(e) {
      console.log(e);
      res.status(400).json({massage: "Login error"});
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find(); 
      res.json(users)
    } catch(e) {
      console.log(e);
    }
  }

}

module.exports = new AuthController()