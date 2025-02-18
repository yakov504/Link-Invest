const crypto = require('crypto')
const { promisify } = require('util')
// const jose = require('jose')
const jwt = require('jsonwebtoken')
const User = require('../modules/usersModuls')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const sendEmail = require('../utils/email')

const signToken = (id, email) => {
   return jwt.sign({id, email}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
}

const createSendToken = ( user, statusCode, res ) => {
   const token = signToken (user._id, user.email);

   const cookieOptions = {
      expires: new Date(
         Date.now()+ process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // 7d
      ),
      httpOnly: true, // מונע גישה מה-frontend
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None' // כדי לאפשר שליחת ה-cookie בבקשות רגילות
      
   };
   //remove the password from the output

   res.cookie('jwt', token, cookieOptions);
   user.password = undefined

   res.status(statusCode).json({
      status: 'success',
      token,
      data:{
         user
      }
   });
      

}


exports.signUp = catchAsync(async( req, res ,next ) => {

   const newUser = await User.create(req.body);
   createSendToken(newUser, 201, res)
})


exports.login = catchAsync(async( req, res, next ) => {
   const { email, password } = req.body;
   ///1.לבדוק אם המייל קיים///
   if(!email || !password){
      return next( new AppError('please provide eamil and password', 400))
   }
   ///2.לבדוק אם משתמש קיים והסיסמה נכונה ///
   const user = await User.findOne({email}).select('+password')

   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect email or password', 401))
   }

   console.log('Cookies received:', req.cookies);

   ///3. אם הכל נכון לשלוח token ללקוח 
   createSendToken(user, 200, res)
})


exports.logout = ( req, res ) => {
   res.cookie('token', 'logout', {
      httpOnly: true,
      expires: new Date(Date.now()),
   })
   res.status(200).json({
      status: 'success',
      message: 'user logged out'
   })
}


/// only rendering pages no errors
exports.isLoggedIn = catchAsync(async( req, res, next )=> {
   ///1. get the token and check if there ///
   if (req.cookie.jwt){

   /// 2. verifiction
    const decoded = await promisify(jwt.verify)
      (req.cookies.jwt, 
      process.env.JWT_SECRET
      )
    
    /// 3. check if user still exsits ///
    const currentUser = await User.findById (decoded.id);
    if(!currentUser){
      return next()
    }

    /// 4. check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
      return next()
    };

    // there is logged user
    req.locals.user = currentUser
    next()
   }
   next()

})

exports.restrictTo = (...roles) => {
   return ( req, res, next ) => {
      //roles admin 
      if(!roles.includes(req.user.role)){
         return next (new AppError('you do not have the premission to preform this action',403)
         );
      }

      next()
   }
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}
  .\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = catchAsync( async(req,res,next ) => {
//1. get user based on the token
const hashedToken = crypto
   .createHash('sha256')
   .update(req.params.token)
   .digest('hex');

const user = await User.findOne({passwordResetToken: hashedToken, 
   passwordResetExpires: {$gt: Date.now()}});


//2.if token has not expired and there is user set the new password
if(!user) {
   return next(new AppError('token is invalid or has expires',400))

}
user.password = req.body.password;
// user.passwordConfirm = req.body.passwordConfirm
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined

//3.update changedPassword property for user

//4.log the user in send JWT
createSendToken(user, 200, res)
})

exports.updatePassword = catchAsync(async(req, res, next) =>{
//1.get the user from collection 
const user = await User.findById(req.body.id).select('+password');
if(!user){
   return new AppError('ther is no user with same eamil')
}

//2.check if posted current password is correct
if(!(user.correctPassword(req.body.passwordCurrent, user.password))){
   return new AppError('your password is wrong',401)
}

//3.if so update password
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm
await user.save();

//4.log user in send JWT
createSendToken(user, 200, res)
})


exports.protect = catchAsync(async( req, res, next )=> {
   ///1. get the token and check if there ///
   let token;
   if (req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
   ) {
      token = req.headers.authorization.split(' ')[1];
   } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
   }
   /// אם אין תוקן מחזיר שגיעה
    if (!token) {
      return next(new AppError('you are not logedin',401))
    } 
   /// 2. verifiction
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    /// 3. check if user still exsits ///
    const currentUser = await User.findById (decoded.id);
    if(!currentUser){
      return next(new AppError 
         ('the user beloning to this token does no longer exist',401))
    }

    /// 4. check if user changed password after the token was issued
    if(currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
         new AppError('user recently changed password please login again', 401)
      )
    };
    req.user = currentUser
    next()
})

// exports.protect = async(req, res, next) => {

//    const user = await User.findById(req.body.id)

//    try{
//       const token = req.headers.authorization.split(' ')[1];
//       if (!token) {
//          return next(new AppError('you are not logedin',401))
//       } 
//       const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//       req.userData = {id: decodedToken.id}
//       next()
//    }catch (err){
//       return next(new AppError('you are not logedin',401))
//    }
// }


