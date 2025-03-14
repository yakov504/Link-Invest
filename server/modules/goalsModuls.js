const mongoose = require('mongoose')
const User = require('./usersModuls');
const Indicator = require('./indicatorsModuls')

const goalsSchema = new mongoose.Schema({

  meetings:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  exclusives:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  priceUpdates:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  buyerTours:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  priceOffers:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  deals:{
    type: Number,
    required: [true, 'גם 0 זה מספר']
  },

  createdAt: { type: Date, default: Date.now},

  agent:[{
  type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'goal must belong to agent']
  }]
})
const Goal = mongoose.model('Goal', goalsSchema);


goalsSchema.pre(/^find/, function(next) {
  this.populate({
     path:'agent',
     select:'name'
  })
  next();
})

module.exports = Goal;