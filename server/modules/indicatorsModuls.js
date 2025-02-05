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

   createdAt: { type: Date, default: Date.now},
   agent: [{
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: [true, 'indicator must belong to agent']
      }]

   // {
   //    toJson: {virtuals: true},
   //    toObject: {virtuals: true}
   // }
});


indicatorsSchema.statics.getIndicatorsSummary = async function(agentId, timeFrame = 'weekly') {
   let startDate;

   // קביעת טווח הזמן
   if (timeFrame === 'weekly') {
      startDate = new Date(new Date().setDate(new Date().getDate() - 7));  // שבוע אחורה
   } else if (timeFrame === 'monthly') {
      startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)); // חודש אחורה
   } else if (timeFrame === 'all') {
      startDate = new Date('2025-01-01');
   } else {
      throw new Error('Invalid time frame. Use weekly, monthly, or all');  // אם הזמן לא תקין
   }

   // שאילתת אגרגציה לסיכום הנתונים
   const stats = await this.aggregate([
      {
         $match: {
            agent: new mongoose.Types.ObjectId(agentId),
            createdAt: { $gte: startDate }
         }
      },
      {
         $group: {
            _id: {agentId},
            totalMeetings: { $sum: '$פגישות' },
            totalExclusives: { $sum: '$בלעדיות' },
            totalPriceUpdates: { $sum: '$עדכון_מחיר' },
            totalBuyerTours: { $sum: '$סיור_קונים' },
            totalPriceOffers: { $sum: '$הצעות_מחיר' },
            totalDeals: { $sum: '$עסקאות' }
         }
      }
   ]);

   return stats.length > 0 ? stats[0] : null; // החזרת התוצאה או null אם לא נמצאו נתונים
};

const Indicator = mongoose.model('Indicator', indicatorsSchema);

indicatorsSchema.pre(/^find/, function(next) {
   this.populate({
      path:'agent',
      select:'name'
   })
   next();
})

// const testAgent = new Agents({
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