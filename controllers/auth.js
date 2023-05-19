const { User } = require('../models/user');
const controlWrapper = require('../helpers/controlWrapper');
const HttpError = require('../helpers/HttpError');

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const isExist = await User.findOne({email});

    if(isExist){
        throw HttpError(409, "Email is in use")
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({...req.body, password: hashedPassword});

    res.json({
        email: newUser.email,
        password: newUser.password,
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(401, "Email or password invalid")
    }
    const comparePassword = await bcrypt.compare(password, user.password);

    if(comparePassword){
        throw HttpError(401, "Email or password invalid")
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'})
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
}

const getCurrent = (req, res)=> {
    const {email} = req.user;

    res.json({
        email
    })
}

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ''})
}

module.exports = {
    register: controlWrapper(register),
    login: controlWrapper(login),
    getCurrent: controlWrapper(getCurrent),
    logout: controlWrapper(logout)
}