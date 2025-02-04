const express = require('express')
const indicatorsController = require('../controller/indicatorsController');
const authController = require('../controller/authController')

const router = express.Router();

router.route('/').get(authController.protect, authController.restrictTo('admin'),indicatorsController.getAllIndicators)
   .post(authController.protect, indicatorsController.createIndicator);

router.route('/:id')
   .get(authController.protect, indicatorsController.getIndicator)
   .patch(indicatorsController.updateIndicator)
   .delete(authController.protect,indicatorsController.deleteIndicatort)

module.exports = router