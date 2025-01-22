const jwt = require('jsonwebtoken')
const Users = require('../modules/usersModuls')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = id => {
   return  jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
}

exports.signUp = catchAsync(async( req, res ,next ) => {

   const newUser = await Users.create(req.body);

   const token = signToken(newUser._id)

   res.status(201).json({
      status: 'succes',
      token,
      data:{
         user: newUser
      }
   });
})

exports.login = catchAsync(async( req, res, next ) => {
   const { email, password } = req.body;
   ///1.לבדוק אם המייל קיים///
   if(!email || !password){
      return next( new AppError('please provide eamil and password', 400))
   }
   ///2.לבדוק אם משתמש קיים והסיסמה נכונה ///
   const user = await Users.findOne({email}).select('+password')

   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect email or password', 401))
   }
   // console.log(user);
   
   ///3. אם הכל נכון לשלוח token ללקוח 
   const token = signToken(user._id)
   res.status(200).json({
      status: 'success',
      token
   })
})
