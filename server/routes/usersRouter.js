const express = require('express')
const usersController = require('../controller/usersController');
const authController = require('../controller/authController');

const router = express.Router();

router.post('/signUp', authController.signUp)
router.post('/login', authController.login)


router.route('/').get(usersController.getAllUsers)
.post(usersController.createUser);

router.route('/:id').get(usersController.getUser)
.patch(usersController.updateUser)
.delete(usersController.deleteUser)

module.exports = router