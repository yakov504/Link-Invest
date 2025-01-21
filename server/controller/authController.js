const Users = require('../modules/usersModuls')

exports.signUp = async ( reqq, res ,next ) => {
   const newUser = await Users.create(reqq.body);

   res.status(201).json({
      status: 'succes',
      data:{
         user: newUser
      }
   });
}