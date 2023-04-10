const road = require('../models/roadModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getLoginPage = async(req, res) => {
  if(req.cookies.jwt){
    const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (currentUser){
      return res.status(200).render('logout',{
        name: currentUser.name,
        msg: 'Looks like you are already logged in!'
      })
    }
  }
  res.status(200).render('login');
}

exports.getNavigator = (req, res) => {
  res.status(200).render('navigator')
}

exports.getUpdateForm = (req, res) => {
  // console.log("Running Forms")
  const data = {
    title: "BTP"
  }
  res.status(200).render('updateform',{data})
}
exports.getMap = async(req, res) => {
  const data = {
    title: "BTP"
  }
  res.status(200).render('map',{data})
}