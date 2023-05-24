const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const gravatar = require('gravatar');
const jimp = require('jimp');
const path = require('path');
const fs = require('fs/promises');
const {controlWrapper, HttpError} = require('../helpers');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

const register = async (req, res) => {
    const {email, password} = req.body;
    const isExist = await User.findOne({email});

    if(isExist){
        throw HttpError(409, "Email in use")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const tempAvatar = gravatar.url(email);
    console.log(tempAvatar)
    const newUser = await User.create({...req.body, password: hashedPassword, avatarURL: tempAvatar});

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

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const newFileName = `${_id}_${originalname}`;
    const targetDir = path.join(avatarsDir, newFileName);

    const image = await jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(tempUpload);

    await fs.rename(tempUpload, targetDir);
    const avatarURL = path.join('avatars', newFileName);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })
}
  
  module.exports = {
      register: controlWrapper(register),
      login: controlWrapper(login),
      getCurrent: controlWrapper(getCurrent),
      logout: controlWrapper(logout),
      updateSubscription: controlWrapper(updateSubscription),
      updateAvatar: controlWrapper(updateAvatar)
  }