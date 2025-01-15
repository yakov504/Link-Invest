const mongoose = require('mongoose')
const slugify =  require('slugify')

const agentsSchema = new mongoose.Schema({
   שם:{
      type: String,
      required: [true, 'agent must have name'],
      trim: true
   },
   
   פגישות:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

   בלעדיות:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

   עדכון_מחיר:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

   סיור_קונים:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

   הצעות_מחיר:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

   עסקאות:{
      type: Number,
      required: [true, 'גם 0 זה מספר'],
      trim: true
   },

});

const Agents = mongoose.model('Agents', agentsSchema);

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

module.exports = Agents;