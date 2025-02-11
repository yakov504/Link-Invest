const crypto = require('crypto')
const { promisify } = require('util')
const jose = require('jose')
const jwt = require('jsonwebtoken')
const User = require('../modules/usersModuls')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
// const sendEmail = require('../utils/email')


exports.withAuth = async (config) =>{
   const token = config.headers.Authorization?.split(' ')[1];

   //Verifies access token if present
   const verified = token ? await verifyToken(token) : false;

   // returns 403 access token is invalid and auth enabled
   if (env.USE_AUTH && !verify){
      return [403, {message: "Unauthorized"}];
   }

   //calls the original mock function
   return typeof data[0] === 'function' ? data[0](config) : data
   // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

};

exports.generateRefreshToken = async (data) => {
   return await new jose.SignJWT(data) // יצירת טוקן עם הנתונים
      .setProtectedHeader({ alg: "HS256" }) // הגדרת אלגוריתם
      .setExpirationTime("7d") // תוקף של 7 ימים
      .sign(new TextEncoder().encode(process.env.JWT_SECRET)); // חתימה עם הסוד
};

const verifyToken = async (token, options = undefined) => {
   try {
      const verification = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return options?.returnPayload ? verification.payload : true;
   } catch (error) {
      console.error("Token verification failed:", error);
      return false;
   }
};

exports.refreshToken = catchAsync(async (req, res, next) => {
   // 1) קבלת ה-Refresh Token מהעוגייה
   console.log("Cookies received:", req.cookies);
   const refreshToken = req.cookies.refreshToken;

   if (!refreshToken) {
     return next(new AppError("No refresh token found", 403));
   }
 
   try {
     // 2) אימות ה-Refresh Token
     const decoded = await promisify(jwt.verify)(refreshToken, process.env.JWT_SECRET);
 
     // 3) בדיקה אם המשתמש קיים
     const user = await User.findById(decoded.id);
     if (!user) {
       return next(new AppError("User no longer exists", 403));
     }
 
     // 4) יצירת Access Token חדש
     const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
       expiresIn: "15m", // תוקף של 15 דקות
     });
 
     res.status(200).json({ accessToken: newAccessToken });
   } catch (error) {
     return next(new AppError("Invalid refresh token", 403));
   }
 });


 exports.login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;
   console.log("Login attempt:", email);

   // 1️⃣ בדיקה אם התקבלו אימייל וסיסמה
   if (!email || !password) {
      console.error("Email or password not provided");
      return next(new AppError("Please provide email and password", 400));
   }

   // 2️⃣ בדיקה אם המשתמש קיים ואם הסיסמה נכונה
   const user = await User.findOne({ email }).select("+password");

   if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", 401));
   }

   // 3️⃣ יצירת Access Token + Refresh Token
   const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // תוקף של 15 דקות
   });

   const refreshToken = await exports.generateRefreshToken({ id: user._id }); // 🛠️ שימוש בפונקציה הנכונה

   // 4️⃣ שמירת ה-Refresh Token בעוגייה מאובטחת
   res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // מונע גישה מהלקוח (XSS)
      secure: process.env.NODE_ENV === "production", // שולח רק על HTTPS בפרודקשן
      sameSite: "Strict", // מגביל שליחת עוגיות רק מהשרת שלנו
      maxAge: 7 * 24 * 60 * 60 * 1000, // תוקף של 7 ימים
   });
   
   user.password = undefined

   // 5️⃣ שליחת ה-Access Token ללקוח בתגובה
   res.status(200).json({
      status: "success",
      data: {
         accessToken,
         user
      }
   });
});