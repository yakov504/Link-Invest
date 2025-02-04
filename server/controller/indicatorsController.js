const Indicator = require('../modules/indicatorsModuls');
// const catchAsync = require('../utils/catchAsync')
// const AppError = require('../utils/appError');
const User = require('../modules/usersModuls')
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
   if(!req.body.user) req.body.user = req.user.id;
   
   next()
}

exports.getAllIndicators = factory.getAll(Indicator, {path: 'agent', select: 'name role'})
exports.getIndicator = factory.getOne(Indicator, {path: 'agent', select: 'name role'})
exports.createIndicator = factory.createOne(Indicator)
exports.updateIndicator = factory.updateOne(Indicator)
exports.deleteIndicator = factory.deleteOne(Indicator)
