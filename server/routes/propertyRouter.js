const express = require('express')
// const multer = require('multer')
const propertyController = require('../controller/propertyController');
const authController = require('../controller/authController')

// const upload = multer({})

const router = express.Router({mergeParams: true});

router.route('/')
  .get(propertyController.getAllPropertys)
  .post(
    authController.protect,
    authController.restrictTo('agent','admin'),
    propertyController.createProperty, 
    propertyController.setUserIds);

router.route('/:id')
  .get(propertyController.getProperty)
  .patch(authController.protect,
   authController.restrictTo('agent','admin'),
   propertyController.updateProperty)
  .delete(authController.protect,
   authController.restrictTo('agent','admin'),
   propertyController.deleteProperty)

module.exports = router