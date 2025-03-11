const Property =require('../modules/propertyModuls')
const AppError = require('../utils/appError');
const User = require('../modules/usersModuls');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
  if(!req.body.user) req.body.user = req.user.id;
  
  next()
}

exports.getAllPropertys = factory.getAll(Property, {path: 'agent', select: 'name role'})
exports.getProperty = factory.getOne(Property, {path: 'agent', select: 'name role'})
exports.createProperty = factory.createOne(Property)
exports.updateProperty = factory.updateOne(Property)
exports.deleteProperty = factory.deleteOne(Property)