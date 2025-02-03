const User = require('../modules/usersModuls')
const Agents = require('../modules/agentsModuls');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const validator = require('validator')

const filterObj = (obj, ...allowedField) =>{
   Object.keys(obj).forEach(el =>{
      if(allowedField.includes(el)) newObj[el] = obj[el]
   })
   return newObj;
}

exports.getAllUsers = catchAsync(async ( req, res, next ) =>{
      const users = await Users.find();

      res.status(200).json({
         status: 'success',
         results: users.length,
         data:{
            users
         }
      })
})

exports.getUser = catchAsync(async ( req, res ) =>{
      const user = await Users.findOne({email: req.params.email})
      // const user = await Users.findById(req.params.id);
      res.status(200).json({
         status: 'success', 
         data: {
            user
         }
      })
})

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

exports.createUser = catchAsync(async ( req, res ) => {
      const newUser = await User.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            users: newUser
         }
      });
})

exports.updateUser = catchAsync(async( req, res ) => {
      const user = await User.findByIdAndUpdate(req.params.id , req.body, {
         new: true,
         runValidators: true
      });
      res.status(200).json({
         status:'success',
         data:{
            user: user
         }
     })
})

exports.deleteUser = catchAsync(async( req, res ) => {
      await User.findByIdAndDelete(req.params.id)
      res.status(204).json({
         status:'success',
         data: null
     })
})
