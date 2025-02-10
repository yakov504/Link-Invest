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
router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

router.use('/refreshToken', authController.refreshToken)
router.use(authController.protect)

router.patch('/updateMyPassword',authController.updatePassword)

// router.get('/logme', usersController.getUser)
router.get('/me', usersController.getMe, usersController.getUser)
router.patch('/updateMe', usersController.updateMe)

router.route('/').get(usersController.getAllUsers, authController.restrictTo('admin'))
.post(usersController.createUser);

router.route('/:id').get(usersController.getUser, authController.restrictTo('admin', 'agent'))
.patch(usersController.updateUser)
.delete(authController.restrictTo('admin'),usersController.deleteUser)

module.exports = router