const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/', projectController.getProjects);
router.post('/assign', projectController.assignEmployeesToProject);

module.exports = router;
