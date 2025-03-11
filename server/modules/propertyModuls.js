const mongoose = require('mongoose')
const User = require('./usersModuls');

const propertySchema = new mongoose.Schema({
  category: { 
    type: String,
    required: [true, 'קטוגריה זה חובה'],
    enum: ['דירה', 'בית','אחר'] 
  }, 
  
  subTypes: [{ type: String }],
  
  rooms: {
    type: Number,
    required: [true, 'חובה להציג חדרים']
  },

  floor: {
    type: Number
  },

  size: {
    type: Number,
    required: [true, 'חובה להציג גודל(מ"ר)']
  },

  city: {
    type: String,
    required: [true, 'חובה שיהיה עיר']
  },
 
  address: {
    type: String,
    required: [true, 'חובה שיהיה כתובת']
  },

  price: {
    type: Number,
    required: [true, 'חובה להציג מחיר']
  },

  typeTransaction: {
    type: String,
    required: [true, 'חובה שיהיה סוג עסקה']
  },

  entryDate: {
    type: String,
    required: [true, ' חובה תוקף כניסה'],
    enum: ['גמיש', 'מידי', Date, 'לפי הסכם']
  },

  propertyCondition: {
    type: String,
  },

  features: [{
    type: String,
    enum: ['מעלית','גישה לנכים', 'מזגן טורנדו','דלתות רב-בריח',
          'מיזוג','סורגים', 'מחסן','דוד שמש','משופצת','ממ"ד','מרפסת' ]
  }],

  image: {
    type: String,
    required: false,
  },

  descrption: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  agent: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Property must belong to an agent']
  },


})

const Property = mongoose.model('Property', propertySchema);

propertySchema.pre(/^find/, function(next){
  this.populate({
    path:'agent',
    select:'name'
  })
  next();
})

module.exports = Property;