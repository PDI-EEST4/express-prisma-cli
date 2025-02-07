const express = require('express');
const router = express.Router();
const {{resourceName}}Controller = require('../controllers/{{resourceName}}Controller');

router.get('/', {{resourceName}}Controller.getAll);
router.get('/:id', {{resourceName}}Controller.getById);
router.post('/', {{resourceName}}Controller.create);
router.put('/:id', {{resourceName}}Controller.update);
router.delete('/:id', {{resourceName}}Controller.delete);

module.exports = router;
