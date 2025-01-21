const fs = require('fs')
const Users = require('../modules/usersModuls')

exports.getAllUsers =async ( req, res ) =>{
   try{
      const users = await Users.find();

      res.status(200).json({
         status: 'success',
         results: users.length,
         data:{
            users
         }
      })
   } catch(err){
      res.status(404).json({
         status: 'fail',
         message: err
      });
   }
}

exports.getUser = async ( req, res ) =>{
   try{
      user = await Users.findById(req.params.id);
      res.status(200).json({
         status: 'success', 
         data: {
            user
         }
      })
   }catch(err) {
      res.status(404).json({
         status: 'fail',
         messege: err.message
       })
   }   
}

exports.createUser = async ( req, res ) => {
   try{
      const newUser = await Users.create( req.body );

      res.status(201).json({
         status:'success',
         data: {
            users: newUser
         }
      });
   } catch (err) {
      res.status(400).json({
         status:'fail',
         message: err 
      })
   }
};

exports.updateUser = async ( req, res ) => {
   try{
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
   }catch(err){
      res.status(404).json({
            status:'fail',
            messege: err
      })
   }
};

exports.deleteUser = async ( req, res ) => {
   try{
      await Users.findByIdAndDelete(req.params.id)
      res.status(204).json({
         status:'success',
         data: null
     })
      
   }catch(err){
      res.status(404).json({
         status:'fail',
         messege: err
     })
 }
};
