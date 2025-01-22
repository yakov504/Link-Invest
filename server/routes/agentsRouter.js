const express = require('express')
const agentsController = require('../controller/agentsController');
const authController = require('../controller/authController')

const router = express.Router();

router.route('/').get(agentsController.getAllAgents)
.post(agentsController.createAgent);

router.route('/:id').get(authController.protect, agentsController.getAgent)
.patch(agentsController.updateAgent)
.delete(agentsController.deleteAgent)

module.exports = router