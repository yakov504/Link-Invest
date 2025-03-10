const express = require('express')
const goalsController = require('../controller/goalsController')
const authController = require('../controller/authController')
const performanceController = require('../controller/performanceController')

const router = express.Router({mergeParams: true});
router.use(authController.protect)

router.route('/companyPerformance').get(
  performanceController.getCompanyPerformance,
  authController.restrictTo("admin"))

router.route('/performance/all').get( 
  performanceController.getAgentPerformance,
  authController.restrictTo("admin"));

router.route('/performance/:id').get( 
  performanceController.getAgentPerformance,
  authController.restrictTo("admin", "agent"));

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