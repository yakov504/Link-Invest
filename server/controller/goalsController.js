const Goal = require('../modules/goalsModuls')
const AppError = require('../utils/appError');
const User = require('../modules/usersModuls');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.setUserIds = (req, res, next) => {
  if(!req.body.user) req.body.user = req.user.id;
  
  next()
}

exports.getGoalByagentGoal = catchAsync(async (req, res, next) => {
  const { agent } = req.body.id;  // מקבל את ה-agent מה-body של הבקשה

  const goals = await Goal.find({ agent }).populate({
      path: 'agent',
      select: 'name role'
  });

  if (!goals || goals.length === 0) {
      return next(new AppError('No goals found for this agent', 404));
  }

  res.status(200).json({
      status: 'success',
      results: goals.length,
      data: {
        goals
      }
  });
});

exports.getAllGoals = factory.getAll(Goal, {path: 'agent', select: 'name role'})
exports.createGoal = factory.createOne(Goal)
exports.updateGoal = factory.updateOne(Goal)
exports.deleteGoal = factory.deleteOne(Goal)