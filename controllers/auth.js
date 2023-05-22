const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {controlWrapper, HttpError} = require('../helpers');

const register = async (req, res) => {
    const {email, password} = req.body;
    const isExist = await User.findOne({email});

    if(isExist){
        throw HttpError(409, "Email in use")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({...req.body, password: hashedPassword});

    res.json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if(!comparePassword){
        throw HttpError(401, "Email or password is wrong")
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '23h'})
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const getCurrent = (req, res) => {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ''});
    res.status(204).end();
}

const updateSubscription = async (req, res) => {
    const {_id} = req.user;
    const {subscription} = req.body;
    const user = await User.findByIdAndUpdate(_id, {subscription}, {new: true});
    res.json({
      email: user.email,
      subscription: user.subscription,
    });
  }
  
  module.exports = {
      register: controlWrapper(register),
      login: controlWrapper(login),
      getCurrent: controlWrapper(getCurrent),
      logout: controlWrapper(logout),
      updateSubscription: controlWrapper(updateSubscription),
  }