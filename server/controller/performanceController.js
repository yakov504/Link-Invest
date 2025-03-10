const Indicator = require('../modules/indicatorsModuls');
const Goal = require('../modules/goalsModuls');
const mongoose = require('mongoose');

exports.getMonthlyPerformance = async (req, res, next) => {
  try {
     const { id: agentId } = req.params;  // שלוף את ה-agentId מתוך ה- URL
     const startDate = new Date(new Date().setDate(1)); // תחילת החודש הנוכחי
     const endDate = new Date(new Date().setMonth(new Date().getMonth() + 1, 0)); // סוף החודש

     const performance = await Indicator.aggregate([
        {
           $match: {
              agent: new mongoose.Types.ObjectId(agentId),
              createdAt: { $gte: startDate, $lte: endDate }
           }
        },
        {
           $group: {
              _id: '$agent',
              totalMeetings: { $sum: '$meetings' },
              totalExclusives: { $sum: '$exclusives' },
              totalPriceUpdates: { $sum: '$priceUpdates' },
              totalBuyerTours: { $sum: '$buyerTours' },
              totalPriceOffers: { $sum: '$priceOffers' },
              totalDeals: { $sum: '$deals' }
           }
        }
     ]);

    const goals = await Goal.findOne({ agent: agentId }).populate({
      path: 'agent',
      select: 'name role'  // זה יביא את השם של הסוכן
    });
    
    console.log('goals:', goals);

    if (!goals) {
        return res.status(404).json({ message: 'לא נמצאו יעדים עבור הסוכן' });
    }

    const agentName = goals.agent.name

    const totalWorkDays = 20; // 5 ימים בשבוע * 4 שבועות
    const daysPassed = new Date().getDate();
    const remainingWorkDays = totalWorkDays - daysPassed;

    const summary = {
      // agentName: agentName,
      meetings: {
         actual: performance.totalMeetings || 0,
         goal: goals.meetings,
         percentage: ((performance.totalMeetings || 0) / goals.meetings) * 100,
         forecast: ((performance.totalMeetings || 0) / daysPassed) * totalWorkDays
      },
      exclusives: {
         actual: performance.totalExclusives || 0,
         goal: goals.exclusives,
         percentage: ((performance.totalExclusives || 0) / goals.exclusives) * 100,
         forecast: ((performance.totalExclusives || 0) / daysPassed) * totalWorkDays
      },
      priceUpdates: {
         actual: performance.totalPriceUpdates || 0,
         goal: goals.priceUpdates,
         percentage: ((performance.totalPriceUpdates || 0) / goals.priceUpdates) * 100,
         forecast: ((performance.totalPriceUpdates || 0) / daysPassed) * totalWorkDays
      },
      buyerTours: {
         actual: performance.totalBuyerTours || 0,
         goal: goals.buyerTours,
         percentage: ((performance.totalBuyerTours || 0) / goals.buyerTours) * 100,
         forecast: ((performance.totalBuyerTours || 0) / daysPassed) * totalWorkDays
      },
      priceOffers: {
         actual: performance.totalPriceOffers || 0,
         goal: goals.priceOffers,
         percentage: ((performance.totalPriceOffers || 0) / goals.priceOffers) * 100,
         forecast: ((performance.totalPriceOffers || 0) / daysPassed) * totalWorkDays
      },
      deals: {
         actual: performance.totalDeals || 0,
         goal: goals.deals,
         percentage: ((performance.totalDeals || 0) / goals.deals) * 100,
         forecast: ((performance.totalDeals || 0) / daysPassed) * totalWorkDays
      },
   };

   // החזרת התוצאה למשתמש
   res.status(200).json({
      status: 'success',
      data: summary, agentName
   });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: 'שגיאה בשרת',
      error 
    });
  }
};

