const { promisify } = require('util')
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

exports.protect = catchAsync(async( req, res, next )=> {
   ///1. get the token and check if there ///
   let token;
   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
   ){
      const token = req.headers.authorization.spilt(' ')[1] 
    } 

    if (!token) {
      return next(new AppError('you are not logedin',401))
    };
    
   /// 2. verifiction
    const decoded = await promisify(jwt.verify(token, process.env.JWT_SECRET))
    
    /// 3. check if user still exsits ///
    const currentUser = await Users.findById (decoded.id);
    if(!currentUser){
      return next(new AppError 
         ('the user beloning to this token does no longer exist',401))
    }

    /// 4. check if user changed password after the token was issued
    if(currentUser.changesPasswordAfter(decoded.iat)) {
      return next(
         new AppError('user recently changed password please login again', 401)
      )
    };
    req.user = currentUser
    next()
})