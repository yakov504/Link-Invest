const express = require('express')
const usersController = require('../controller/usersController');
const authController = require('../controller/authController');
const indicatorsController = require('../controller/indicatorsController')
const newAuthController = require('../controller/newAuthController')
const indicatorsRouter = require('../routes/indicatorsRouter')

const router = express.Router();

router.use('/:userId/indicators', indicatorsRouter)

router.post('/signUp', authController.signUp)
// router.post('/login', authController.login)
router.post('/login', newAuthController.login)
router.post('/refreshToken', newAuthController.refresh)

router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword/:token', authController.resetPassword)

// router.use(authController.protect)

router.patch('/updateMyPassword',authController.updatePassword)

// router.get('/logme', usersController.getUser)
router.get('/me',authController.protect, 
   usersController.getMe
   , usersController.getUser)
   // newAuthController.authMiddleware, 
router.patch('/updateMe', usersController.updateMe)


router.route('/').get(usersController.getAllUsers, authController.restrictTo('admin'))
.post(usersController.createUser);

router.route('/:id').get(usersController.getUser, authController.restrictTo('admin', 'agent'))
.patch(usersController.updateUser)
.delete(authController.restrictTo('admin'),usersController.deleteUser)

module.exports = router