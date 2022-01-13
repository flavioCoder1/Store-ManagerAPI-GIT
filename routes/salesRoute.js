const router = require('express').Router();
const SalesController = require('../controllers/SalesController');
const { validateId, checkSaleId } = require('../middlewares/validations');

router.post('/', SalesController.create);
router.get('/', SalesController.getAll);
router.get('/:id', checkSaleId, SalesController.getById);
router.put('/:id', validateId, SalesController.update);
router.delete('/:id', SalesController.erase);

module.exports = router;