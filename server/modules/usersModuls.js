const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const slugify =  require('slugify')
const Indicator = require('./indicatorsModuls')
const Goal = require('./goalsModuls')

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
         message: 'המייל שסיפקת קיים מערכת'
     }
   },

   image:{
     type: String,
     required: false,
   },

   role: {
      type: String,
      required: [true, 'לכל אחד חייב להיות תפקיד'],
      enum: [ 'admin', 'agent', 'user' ],
      default: 'agent'
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
   
   passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: 'Passwords are not the same!'
      }
    },

   // agentIndicators: 
   //      [{
   //          type: mongoose.Schema.ObjectId,
   //          ref: 'AgentIndicators',
   //          // required: [true, 'indicator must belong to agent']
   //       }],

   passwordChangedAt: Date,
   passwordResetToken: String,
   passwordResetExpires: Date

});

/// Virtual populate
usersSchema.virtual('indicators', {
   ref: 'Indicators',
   foreignField: 'agent',
   localField: '_id'
})

usersSchema.virtual('goals', {
   ref: 'Goal',
   foreignField: 'agent',
   localField: '_id'
})

usersSchema.pre('save', async function(next) {
   /// מריץ את הפונקציה רק אם הסיסמה שונתה ///
   if(!this.isModified ('password')) return next();

   /// hash the password with cost of 12 ///
   this.password = await bcrypt.hash(this.password, 12);
   next()
});

usersSchema.pre('save', function(next) {
   if(!this.isModified('password') || this.isNew)
      return next()

   this.passwordChangedAt = Date.now() - 1000;
   next();
})

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

usersSchema.methods.createPasswordResetToken = function(){
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto
   .createHash('sha256')
   .update(resetToken)
   .digest('hex')

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

   return resetToken;
}

const User = mongoose.model('User', usersSchema);

module.exports = User;