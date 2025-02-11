const User = require('../modules/usersModuls')
const Indicator = require('../modules/indicatorsModuls');
const jwt = require('jsonwebtoken')
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory')

// const validator = require('validator')

const filterObj = (obj, ...allowedField) =>{
   Object.keys(obj).forEach(el =>{
      if(allowedField.includes(el)) newObj[el] = obj[el]
   })
   return newObj;
}

exports.getMe = (req , res, next) => {
   req.params.id = req.user.id;
   next();
}

exports.updateMe = catchAsync(async( req, res, next ) =>{
   //1.create err if user post password data
   if(req.body.password || req.body.passwordConfirm){
      return next(new AppError('this route is not for password update please use updateMyPassword'))
   }

   //2.filtered out unwanted feilds names are not allwod to be updated
   const filteredBody = filterObj(req.body, 'name','eamil');
   const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators:true
   })
   
   res.status(200).json({
      status: 'succes',
      data: {
         user: updatedUser
      }
   })
   //3.
})

exports.getAllUsers = factory.getAll(User)
exports.getUser = factory.getOne(User)
exports.createUser = factory.createOne(User)
exports.updateUser = factory.updateOne(User)
exports.deleteUser = factory.deleteOne(User)

