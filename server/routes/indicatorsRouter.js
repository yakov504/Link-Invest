const express = require('express')
const indicatorsController = require('../controller/indicatorsController');
const authController = require('../controller/authController')

const router = express.Router();

router.route('/').get(indicatorsController.getAllIndicators)
.post(indicatorsController.createIndicator);

router.route('/:id').get(authController.protect, indicatorsController.getIndicator)
.patch(indicatorsController.updateIndicator)
.delete(indicatorsController.deleteIndicatort)

module.exports = router