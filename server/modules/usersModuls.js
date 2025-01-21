const mongoose = require('mongoose')
const slugify =  require('slugify')

const usersSchema = new mongoose.Schema({
   שם: {
      type: String,
      required: [true, 'לכל משתמש חייב להיות שם'],
   },

   מייל:{
      type: String,
      required: [true, 'חייב להיות מייל'],
   },

   rule: {
      type: String,
      required: [true, 'לכל אחד חייב להיות תפקיד'],
      enum: {
         values: [ 'admin', 'agent', 'user' ],
         message: 'זה חייב להיות admin או agent או user '
     }
   },

   מספר_טלפון:{
      type: Number,
      required: [true,' לכל אחד חייב להיות מספר טלפון']
   },

   סיסמה: {
      type: String,
      required: [true,' חסר סיסמה'],
      minLength: [8, ' סיסמה חייבת להחיל לפחות 8 תווים']     
   }
   
})

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;