const express = require('express')
const goalsController = require('../controller/goalsController')
const authController = require('../controller/authController')
const performanceController = require('../controller/performanceController')

const router = express.Router({mergeParams: true});
router.use(authController.protect)

router.route('/companyPerformance/:year?/:month?')
  .get(authController.restrictTo("admin"), 
   performanceController.getCompanyPerformance);

router.route('/performance/all/:year?/:month?')
  .get(authController.restrictTo("admin"), 
   performanceController.getAgentPerformance);

router.route('/performance/:id/:year?/:month?')
  .get(authController.restrictTo("admin", "agent"), 
   performanceController.getAgentPerformance);

router.route('/').get(
   authController.restrictTo('admin'),
   goalsController.getAllGoals)
   .post(
      authController.restrictTo('admin'),
      goalsController.createGoal, 
      goalsController.setUserIds);

router.route('/:id')
  .patch(authController.restrictTo('admin'), goalsController.updateGoal)
  .delete(authController.restrictTo('admin'), goalsController.deleteGoal)

router.use(authController.restrictTo('agent', 'admin'))
router.route('/getGoalByagentGoal').post(goalsController.getGoalByagentGoal)

module.exports = router