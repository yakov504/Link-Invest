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

})