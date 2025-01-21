const mongoose = require('mongoose')
const slugify =  require('slugify')

const agentsSchema = new mongoose.Schema({
   שם:{
      type: String,
      required: [true, 'agent must have name'],
   },

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