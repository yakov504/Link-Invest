const Goal = require('../modules/goalsModuls')
const AppError = require('../utils/appError');
const User = require('../modules/usersModuls');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory')

exports.getGoalByagentGoal = catchAsync(async (req, res, next) => {
  const { agentGoal } = req.body.id;  // מקבל את ה-agent מה-body של הבקשה

  const goals = await Goal.find({ agentGoal }).populate({
      path: 'agentGoal',
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