const Goal = require('../modules/goalsModuls');
const mongoose = require('mongoose');
const Indicator = require('../modules/indicatorsModuls');

exports.getAgentPerformance = async (req, res, next) => {
  try {
    const { year, month } = req.params;
    const agentId = req.params.id || req.query.agentId;

    const startDate = new Date(`${year || new Date().getFullYear()}-${month || (new Date().getMonth() + 1)}-01`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1, 0));
    const currentDate = new Date();

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

    const calculatePercentage = (actual, goal) => parseFloat((goal ? ((actual || 0) / goal) * 100 : 0).toFixed(2));
    const calculateForecast = (actual, daysPassed, totalDays) => parseFloat(((actual / daysPassed) * totalDays).toFixed(2));

    const daysPassed = (currentDate - startDate) / (1000 * 60 * 60 * 24);
    const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    const summary = performance.map(perf => {
      const agentGoals = goals.find(goal => {
        if (goal.agent && Array.isArray(goal.agent) && goal.agent.length > 0) {
          return goal.agent[0]._id.toString() === perf._id.toString();
        }
        return goal.agent._id.toString() === perf._id.toString();
      });

      if (!agentGoals) return null;

      return {
        agentName: Array.isArray(agentGoals.agent) ? agentGoals.agent[0].name : agentGoals.agent.name,
        meetings: {
          actual: perf.totalMeetings || 0,
          goal: agentGoals.meetings,
          percentage: calculatePercentage(perf.totalMeetings, agentGoals.meetings),
          forecast: calculateForecast(perf.totalMeetings, daysPassed, totalDays)
        },
        exclusives: {
          actual: perf.totalExclusives || 0,
          goal: agentGoals.exclusives,
          percentage: calculatePercentage(perf.totalExclusives, agentGoals.exclusives),
          forecast: calculateForecast(perf.totalExclusives, daysPassed, totalDays)
        },
        priceUpdates: {
          actual: perf.totalPriceUpdates || 0,
          goal: agentGoals.priceUpdates,
          percentage: calculatePercentage(perf.totalPriceUpdates, agentGoals.priceUpdates),
          forecast: calculateForecast(perf.totalPriceUpdates, daysPassed, totalDays)
        },
        buyerTours: {
          actual: perf.totalBuyerTours || 0,
          goal: agentGoals.buyerTours,
          percentage: calculatePercentage(perf.totalBuyerTours, agentGoals.buyerTours),
          forecast: calculateForecast(perf.totalBuyerTours, daysPassed, totalDays)
        },
        priceOffers: {
          actual: perf.totalPriceOffers || 0,
          goal: agentGoals.priceOffers,
          percentage: calculatePercentage(perf.totalPriceOffers, agentGoals.priceOffers),
          forecast: calculateForecast(perf.totalPriceOffers, daysPassed, totalDays)
        },
        deals: {
          actual: perf.totalDeals || 0,
          goal: agentGoals.deals,
          percentage: calculatePercentage(perf.totalDeals, agentGoals.deals),
          forecast: calculateForecast(perf.totalDeals, daysPassed, totalDays)
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
  }catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'שגיאה בשרת',
      error
    });
  }
};
