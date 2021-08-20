const { Router } = require('express');
const router = Router();
const controller = require('../Controllers/controller');

router.get('/', controller.print);
module.exports = router;
