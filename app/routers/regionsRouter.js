const Router = require('express');
const router = new Router();

const {check} = require('express-validator');

const controller = require('../controllers/regionsControllers');

router.get('/', controller.getRegions);
router.post('/add', controller.addRegion);
router.post('/edit', controller.editRegion);
router.post('/remove', controller.removeRegion);

module.exports = router;