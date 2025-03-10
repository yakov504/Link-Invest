const Indicator = require('../modules/indicatorsModuls');
const Goal = require('../modules/goalsModuls');
const mongoose = require('mongoose');

exports.getAgentPerformance = async (req, res, next) => {
   try {
     const { agentId, year, month } = req.query;
 
     const startDate = new Date(`${year || new Date().getFullYear()}-${month || (new Date().getMonth() + 1)}-01`);
     const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1, 0));
 
     const matchStage = {
       createdAt: { $gte: startDate, $lte: endDate }
     };
 
     if (agentId) {
       matchStage.agent = new mongoose.Types.ObjectId(agentId);
     }
 
     const performance = await Indicator.aggregate([
       { $match: matchStage },
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
 
     const goals = await Goal.find({}).populate({
       path: 'agent',
       select: 'name role'
     });

     console.log(goals); 
 
     const calculatePercentage = (actual, goal) => (goal ? ((actual || 0) / goal) * 100 : 0).toFixed(2);
 
     const summary = performance.map(perf => {
      // יש לוודא ש-agent הוא אובייקט ולא מערך, ואם כן אז לבחור את האובייקט הראשון במערך
      const agentGoals = goals.find(goal => goal.agent && goal.agent[0]._id.toString() === perf._id.toString());
      
      if (!agentGoals) return null;
    
      return {
        agentName: agentGoals.agent[0].name,  // התייחסות לשם של הסוכן מתוך האובייקט במערך
        meetings: {
          actual: perf.totalMeetings || 0,
          goal: agentGoals.meetings,
          percentage: calculatePercentage(perf.totalMeetings, agentGoals.meetings)
        },
        exclusives: {
          actual: perf.totalExclusives || 0,
          goal: agentGoals.exclusives,
          percentage: calculatePercentage(perf.totalExclusives, agentGoals.exclusives)
        },
        priceUpdates: {
          actual: perf.totalPriceUpdates || 0,
          goal: agentGoals.priceUpdates,
          percentage: calculatePercentage(perf.totalPriceUpdates, agentGoals.priceUpdates)
        },
        buyerTours: {
          actual: perf.totalBuyerTours || 0,
          goal: agentGoals.buyerTours,
          percentage: calculatePercentage(perf.totalBuyerTours, agentGoals.buyerTours)
        },
        priceOffers: {
          actual: perf.totalPriceOffers || 0,
          goal: agentGoals.priceOffers,
          percentage: calculatePercentage(perf.totalPriceOffers, agentGoals.priceOffers)
        },
        deals: {
          actual: perf.totalDeals || 0,
          goal: agentGoals.deals,
          percentage: calculatePercentage(perf.totalDeals, agentGoals.deals)
        }
      };
    }).filter(item => item !== null);
 
     res.status(200).json({
       status: 'success',
       data: summary
     });
   } catch (error) {
     console.error(error);
     res.status(500).json({
       message: 'שגיאה בשרת',
       error
     });
   }
 };

exports.getCompanyPerformance = async (req, res, next) => {
    try {
        const { year, month } = req.query;

        const startDate = new Date(`${year || new Date().getFullYear()}-${month || (new Date().getMonth() + 1)}-01`);
        const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1, 0));

        const matchStage = {
            createdAt: { $gte: startDate, $lte: endDate }
        };

        const performance = await Indicator.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null, // קבוצה אחת עבור כל המסמכים
                    totalMeetings: { $sum: '$meetings' },
                    totalExclusives: { $sum: '$exclusives' },
                    totalPriceUpdates: { $sum: '$priceUpdates' },
                    totalBuyerTours: { $sum: '$buyerTours' },
                    totalPriceOffers: { $sum: '$priceOffers' },
                    totalDeals: { $sum: '$deals' }
                }
            }
        ]);

        const goals = await Goal.aggregate([
            {
                $group: {
                    _id: null, // קבוצה אחת עבור כל המסמכים
                    totalMeetings: { $sum: '$meetings' },
                    totalExclusives: { $sum: '$exclusives' },
                    totalPriceUpdates: { $sum: '$priceUpdates' },
                    totalBuyerTours: { $sum: '$buyerTours' },
                    totalPriceOffers: { $sum: '$priceOffers' },
                    totalDeals: { $sum: '$deals' }
                }
            }
        ]);

        const calculatePercentage = (actual, goal) => (goal ? ((actual || 0) / goal) * 100 : 0).toFixed(2);

        if (performance.length === 0 || goals.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'לא נמצאו נתונים עבור התקופה המבוקשת.'
            });
        }

        const companyPerformance = {
            companyName: 'לינק',
            meetings: {
                actual: performance[0].totalMeetings || 0,
                goal: goals[0].totalMeetings || 0,
                percentage: calculatePercentage(performance[0].totalMeetings, goals[0].totalMeetings)
            },
            exclusives: {
                actual: performance[0].totalExclusives || 0,
                goal: goals[0].totalExclusives || 0,
                percentage: calculatePercentage(performance[0].totalExclusives, goals[0].totalExclusives)
            },
            priceUpdates: {
                actual: performance[0].totalPriceUpdates || 0,
                goal: goals[0].totalPriceUpdates || 0,
                percentage: calculatePercentage(performance[0].totalPriceUpdates, goals[0].totalPriceUpdates)
            },
            buyerTours: {
                actual: performance[0].totalBuyerTours || 0,
                goal: goals[0].totalBuyerTours || 0,
                percentage: calculatePercentage(performance[0].totalBuyerTours, goals[0].totalBuyerTours)
            },
            priceOffers: {
                actual: performance[0].totalPriceOffers || 0,
                goal: goals[0].totalPriceOffers || 0,
                percentage: calculatePercentage(performance[0].totalPriceOffers, goals[0].totalPriceOffers)
            },
            deals: {
                actual: performance[0].totalDeals || 0,
                goal: goals[0].totalDeals || 0,
                percentage: calculatePercentage(performance[0].totalDeals, goals[0].totalDeals)
            }
        };

        res.status(200).json({
            status: 'success',
            data: companyPerformance
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'שגיאה בשרת',
            error
        });
    }
};
