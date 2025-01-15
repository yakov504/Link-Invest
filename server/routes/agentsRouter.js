const express = require('express')
const agentsController = require('../controller/agentsController');

const router = express.Router();

router.route('/').get(agentsController.getAllAgents)
.post(agentsController.createAgent);

router.route('/:id').get(agentsController.getAgent)
.patch(agentsController.updateAgent)
.delete(agentsController.deleteAgent)

module.exports = router