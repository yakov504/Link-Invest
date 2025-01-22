const Users = require('../modules/usersModuls')
const Agents = require('../modules/agentsModuls');
const catchAsync = require('../utils/catchAsync')
// const validator = require('validator')

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

exports.createUser = catchAsync(async ( req, res ) => {
      const newUser = await Users.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            users: newUser
         }
      });
})

exports.updateUser = catchAsync(async( req, res ) => {
      const user = await Users.findByIdAndUpdate(req.params.id , req.body, {
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
      await Users.findByIdAndDelete(req.params.id)
      res.status(204).json({
         status:'success',
         data: null
     })
})
