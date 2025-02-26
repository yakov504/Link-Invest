const mongoose = require('mongoose')
const slugify =  require('slugify');
const User = require('./usersModuls');

const indicatorsSchema = new mongoose.Schema({

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

indicatorsSchema.statics.getWeeklySummary = async function(agentId) {
   const startDate = new Date(new Date().setDate(new Date().getDate() - 7));  // שבוע אחורה

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
            totalMeetings: { $sum: '$meetings' },
            totalExclusives: { $sum: '$exclusives' },
            totalPriceUpdates: { $sum: '$priceUpdates' },
            totalBuyerTours: { $sum: '$buyerTours' },
            totalPriceOffers: { $sum: '$priceOffers' },
            totalDeals: { $sum: '$deals' }
         }
      }
   ]);

   return stats.length > 0 ? stats[0] : null; // החזרת התוצאה או null אם לא נמצאו נתונים
};

indicatorsSchema.statics.getMonthlySummary = async function(agentId) {
   const startDate = new Date(new Date().setMonth(new Date().getMonth() - 1)); // חודש אחורה

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
            totalMeetings: { $sum: '$meetings' },
            totalExclusives: { $sum: '$exclusives' },
            totalPriceUpdates: { $sum: '$priceUpdates' },
            totalBuyerTours: { $sum: '$buyerTours' },
            totalPriceOffers: { $sum: '$priceOffers' },
            totalDeals: { $sum: '$deals' }
         }
      }
   ]);

   return stats.length > 0 ? stats[0] : null;
};

indicatorsSchema.statics.getAllSummary = async function(agentId) {
   const startDate = new Date('2025-01-01'); // מתחילים מ-2025-01-01

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
            totalMeetings: { $sum: '$meetings' },
            totalExclusives: { $sum: '$exclusives' },
            totalPriceUpdates: { $sum: '$priceUpdates' },
            totalBuyerTours: { $sum: '$buyerTours' },
            totalPriceOffers: { $sum: '$priceOffers' },
            totalDeals: { $sum: '$deals' }
         }
      }
   ]);

   return stats.length > 0 ? stats[0] : null;
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
//    meetings:0,
//    exclusives:0,
//    priceUpdates:0,
//    buyerTours:5,
//    priceOffers:1,
//    deals:0,
// });

// testAgent.save().then(doc => {
//    console.log(doc);
// }).catch(err => {
//    console.log('err:',err);
   
// })

module.exports = Indicator;
