const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const slugify =  require('slugify')

const usersSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'לכל משתמש חייב להיות שם'],
   },

   email:{
      type: String,
      required: [true, 'חייב להיות מייל'],
      unique: true,
      lowercase: true,
      validate: {
         validator: validator.isEmail,
         message: 'המייל שסיפקת לא תקין'
     }
   },

   image:{
     type: String,
     required: false,
   },

   rule: {
      type: String,
      required: [true, 'לכל אחד חייב להיות תפקיד'],
      enum: {
         values: [ 'admin', 'agent', 'user' ],
         message: 'זה חייב להיות admin או agent או user '
     }
   },

   phone_number:{
      type: String,
      required: [true,' לכל אחד חייב להיות מספר טלפון']
   },

   password: {
      type: String,
      required: [true,' חסר password'],
      minLength: [8, ' password חייבת להחיל לפחות 8 תווים'],
      select: false,
      /// this is works only Create and save !! ///
      // validate: {
         // validator: function(el){
      //       return el === this.סיסמה
      //    }
      // }     
   },
   passwordChangedAt: Date
});

usersSchema.pre('save', async function(next) {
   /// מריץ את הפונקציה רק אם הסיסמה שונתה ///
   if(!this.isModified ('password')) return next();

   /// hash the password with cost of 12 ///
   this.password = await bcrypt.hash(this.password, 12);
   next()
});

usersSchema.methods.correctPassword = async function(candidatePassword, userPassword){
   return await bcrypt.compare(candidatePassword, userPassword);
}

usersSchema.methods.changedPasswordAfter = function(JWTTimestamp){
   if(this.passwordChangedAt){
      const changedTimestamp = parseInt(
         this.passwordChangedAt.getTime() / 1000,
      10
      );

      console.log(this.passwordChangedAt, JWTTimestamp);
      return JWTTimestamp < changedTimestamp;
   }
   return false
}
const User = mongoose.model('Users', usersSchema);

module.exports = User;