const express = require('express')
const indicatorsController = require('../controller/indicatorsController');
const authController = require('../controller/authController')

const router = express.Router({mergeParams: true});
router.use(authController.protect)

router.route('/').get(
   authController.restrictTo('admin'),
    indicatorsController.getAllIndicators)
   .post(
      authController.restrictTo('agent','admin'),
      indicatorsController.createIndicator, 
      indicatorsController.setUserIds);

router.use(authController.restrictTo('agent','admin'))

router.route('/:id')
   .get(indicatorsController.getIndicator)
   .patch(indicatorsController.updateIndicator)
   .delete(indicatorsController.deleteIndicator)

router.get('/summary/:agentId/:timeFrame', indicatorsController.getIndicatorsSummary)
   

module.exports = router