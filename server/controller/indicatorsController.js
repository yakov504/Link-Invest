const Indicator = require('../modules/indicatorsModuls');
// const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const User = require('../modules/usersModuls');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
   if(!req.body.user) req.body.user = req.user.id;
   
   next()
}

exports.getIndicatorsSummary = catchAsync(async (req, res, next) => {
   const { agentId, timeFrame } = req.params;
   const stats = await Indicator.getIndicatorsSummary(agentId, timeFrame);
      if(!stats){
         return next(new AppError('No data found for the selected time frame',404))
      }
      res.status(200).json({
         status: 'success',
         data: stats
      });

      console.log('Request Params:', req.params);
console.log('Agent ID:', agentId);
console.log('Time Frame:', timeFrame);
});

exports.getAllIndicators = factory.getAll(Indicator, {path: 'agent', select: 'name role'})
exports.getIndicator = factory.getOne(Indicator, {path: 'agent', select: 'name role'})
exports.createIndicator = factory.createOne(Indicator)
exports.updateIndicator = factory.updateOne(Indicator)
exports.deleteIndicator = factory.deleteOne(Indicator)
