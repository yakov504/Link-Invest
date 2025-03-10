const Indicator = require('../modules/indicatorsModuls');
const AppError = require('../utils/appError');
const User = require('../modules/usersModuls');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
   if(!req.body.user) req.body.user = req.user.id;
   
   next()
}

exports.getWeeklySummary = catchAsync(async (req, res, next) => {
   const { agent } = req.body.id;

   const stats = await Indicator.getWeeklySummary(agent);

   if (!stats) {
      return next(new AppError('No data found for the selected time frame', 404));
   }

   res.status(200).json({
      status: 'success',
      data: stats
   });

   console.log('Request Params:', req.params);
   console.log('Agent ID:', agent);
});

exports.getMonthlySummary = catchAsync(async (req, res, next) => {
   const { agent } = req.body.id;

   const stats = await Indicator.getMonthlySummary(agent);

   if (!stats) {
      return next(new AppError('No data found for the selected time frame', 404));
   }

   res.status(200).json({
      status: 'success',
      data: stats
   });

   console.log('Request Params:', req.params);
   console.log('Agent ID:', agent);
});

exports.getAllSummary = catchAsync(async (req, res, next) => {
   const { agent } = req.body.id;

   const stats = await Indicator.getAllSummary(agent);

   if (!stats) {
      return next(new AppError('No data found for the selected time frame', 404));
   }

   res.status(200).json({
      status: 'success',
      data: stats
   });

   console.log('Request Params:', req.params);
   console.log('Agent ID:', agent);
});


exports.getIndicatorsByAgent = catchAsync(async (req, res, next) => {
   console.log('req.body:', req.body); // הדפסה לבדוק אם יש את ה-id

   const { agent } = req.body.id || {}; // בטיחות בעת הדה-סטרקטורינג
   if (!agent) {
     return res.status(400).json({ message: 'הסוכן לא נמצא ב-body' });
   }
   
   const indicators = await Indicator.find({ agent }).populate({
       path: 'agent',
       select: 'name role'
   });

   if (!indicators || indicators.length === 0) {
       return next(new AppError('No indicators found for this agent', 404));
   }

   res.status(200).json({
       status: 'success',
       results: indicators.length,
       data: {
           indicators
       }
   });
});


exports.getAllIndicators = factory.getAll(Indicator, {path: 'agent', select: 'name role'})
exports.getIndicator = factory.getOne(Indicator, {path: 'agent', select: 'name role'})
exports.createIndicator = factory.createOne(Indicator)
exports.updateIndicator = factory.updateOne(Indicator)
exports.deleteIndicator = factory.deleteOne(Indicator)
