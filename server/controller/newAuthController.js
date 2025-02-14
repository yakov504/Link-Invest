const crypto = require('crypto')
const { promisify } = require('util')
// const jose = require('jose')
const jwt = require('jsonwebtoken')
const User = require('../modules/usersModuls')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
// const { error } = require('console')


exports.login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;

   // 1️ בדיקה אם התקבלו אימייל וסיסמה
   if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
   }

   // 2️ בדיקה אם המשתמש קיים ואם הסיסמה נכונה
   const user = await User.findOne({ email }).select("+password");

   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
   }

   // 3️ יצירת Access Token + Refresh Token
   const accessToken = jwt.sign(
      {
       id: user._id,
       name: user.name 
      }, 
      process.env.JWT_SECRET, {
      expiresIn: "15m", 
   });
   console.log("Access Token Sent:", accessToken);

   const refreshToken = jwt.sign(
      { 
        id: user._id ,
        name: user.name   
      },  process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_COOKIE_EXPIRES_IN , //7d
      }); 
   console.log("Generated tokens", { accessToken, refreshToken })

   // 4️. create secure cookie with refresh token
   res.cookie("jwt", refreshToken, {
      httpOnly: true, // מונע גישה מהלקוח (XSS)
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      // secure: process.env.NODE_ENV === "production",
       // מגביל שליחת עוגיות רק מהשרת שלנו
      maxAge: 7 * 24 * 60 * 60 * 1000, // תוקף של 7 ימים
   });

   user.password = undefined

   // 5️ שליחת ה-Access Token ללקוח בתגובה
   res.status(200).json({
      status: "success",
      data: {
         accessToken,
         user
      }
   });

   console.log("Login successful for user:", user._id);
});


exports.refresh = ( req, res ) => {
   const cookies = req.cookies

   if(!cookies?.jwt){
      // return next(new AppError("Incorrect email or password", 401));
       return res.status(401).json({message: 'Unauthorized'})
       
   }

   const refreshToken = cookies.jwt

   jwt.verify(refreshToken, process.env.JWT_SECRET,
      catchAsync(async (err, decoded) => {
         // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
         if(err){
            return res.status(403).json({message:'Forbidden'})

         }

         const user = await User.findOne({email: decoded.email})

         if(!user) {
            return res.status(401).json({message: 'Unauthorized'})
    
         }

         const accessToken = jwt.sign(
            {
             id: user._id,
             name: user.name 
            }, 
            process.env.JWT_SECRET, {
            expiresIn: "10s", 
         });

         res.status(200).json({
            status: "success",
            data: {
               accessToken,
            }
         });
      })
   )
}

exports.logout = ( req, res ) =>{
   const cookies = req.cookies
   if(!cookies?.jwt){
      return res.sendStatus(204) // no content
      res.clearCookies('jwt', 
         {
            httpOnly: true,
            sameSite: 'None',
            secure: true
         })
         res.json({ message: 'Cookie cleared'})
   }
}


exports.verifyJWT = ( req, res, next ) => {
   const authHeader = req.headers.authorization || req.headers.authorization

   if(!authHeader?.startsWith('Bearer ')){
      return res.status(401).json({message: 'Unauthorized'})
   }

   const token = authHeader.split(' ')[1]

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(err){
         return res.status(403).json({message: 'forbidden'})
      }
      req.user = decoded.User.name
      req.role = decoded.User.role
      next()
   })

}

// מידלוואר לאימות המשתמש על בסיס הטוקן מהקוקי
exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // הוספת המשתמש המבוסס על ה-ID לטוקן
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};


// exports.withAuth = async (config) =>{
//    const token = config.headers.Authorization?.split(' ')[1];

//    //Verifies access token if present
//    const verified = token ? await verifyToken(token) : false;

//    // returns 403 access token is invalid and auth enabled
//    if (env.USE_AUTH && !verify){
//       return [403, {message: "Unauthorized"}];
//    }

//    //calls the original mock function
//    return typeof data[0] === 'function' ? data[0](config) : data
//    // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

// };

// exports.generateRefreshToken = async (data) => {
//    return await new jose.SignJWT(data) // יצירת טוקן עם הנתונים
//       .setProtectedHeader({ alg: "HS256" }) // הגדרת אלגוריתם
//       .setExpirationTime("7d") // תוקף של 7 ימים
//       .sign(new TextEncoder().encode(process.env.JWT_SECRET)); // חתימה עם הסוד
// };













