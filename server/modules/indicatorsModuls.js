const mongoose = require('mongoose')
const slugify =  require('slugify');
const User = require('./usersModuls');

const indicatorsSchema = new mongoose.Schema({

   פגישות:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },

   בלעדיות:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },

   עדכון_מחיר:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },

   סיור_קונים:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },

   הצעות_מחיר:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },

   עסקאות:{
      type: Number,
      required: [true, 'גם 0 זה מספר']
   },
   agent: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: [true, 'indicator must belong to agent']
      }
   // {
   //    toJson: {virtuals: true},
   //    toObject: {virtuals: true}
   // }
});

const Indicator = mongoose.model('Indicator', indicatorsSchema);


// indicatorsSchema.pre('save', async function(next){
//    const agentPromises = this.agent.map(async id => User.findById(id))
//    this.agent = await Promise.all(agentPromises);
//    next()
// })

indicatorsSchema.pre(/^find/, function(next) {
   this.populate({
      path:'agent',
      selcet:'name'
   })
   next();
})

// const testAgent = new Agents({
//    שם:"יעקוב",
//    פגישות:0,
//    בלעדיות:0,
//    עדכון_מחיר:0,
//    סיור_קונים:5,
//    הצעות_מחיר:1,
//    עסקאות:0,
// });

// testAgent.save().then(doc => {
//    console.log(doc);
// }).catch(err => {
//    console.log('err:',err);
   
// })

module.exports = Indicator;