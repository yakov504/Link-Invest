const express = require('express')
const usersController = require('../controller/usersController');
const authController = require('../controller/authController');
const indicatorsController = require('../controller/indicatorsController')
const indicatorsRouter = require('../routes/indicatorsRouter')

const router = express.Router();

router.use('/:userId/indicators', indicatorsRouter)
/// הראטור לא עובד מביא לי הרר שאני לא מחובר כנראה יש בעיה בחיבור בין הראוטר של אינדיקטור ויוסרים לבדוק בהמשך

router.post('/signUp', authController.signUp)
router.post('/login', authController.login)

// router.get('/logme', authController.protect, usersController.getUser)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.patch('/updateMyPassword', authController.protect, authController.updatePassword)

router.get('/me', authController.protect, usersController.getMe, usersController.getUser)
router.patch('/updateMe', authController.protect, usersController.updateMe)

router.route('/').get(usersController.getAllUsers)
.post(usersController.createUser);

router.route('/:id').get(usersController.getUser)
.patch(usersController.updateUser)
.delete(authController.protect,authController.restrictTo('admin'),
   usersController.deleteUser)

module.exports = router