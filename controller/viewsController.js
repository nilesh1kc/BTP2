const road = require('../models/roadModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
}

exports.getNavigator = (req, res) => {
  res.status(200).render('navigator')
}

exports.getUpdateForm = (req, res) => {
  console.log("Running Forms")
  const data = {
    title: "BTP"
  }
  // res.status(200).render('updateform',{data})
}
exports.getMap = async(req, res) => {
  const data = {
    title: "BTP"
  }
  res.status(200).render('map',{data})
}