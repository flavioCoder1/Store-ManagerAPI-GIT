const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const val = require('../middlewares/validations');

router.post('/', 
  val.validateNameAndQuantity,
  val.validateQuantity,
  val.validateNameLength,
  ProductController.create);
router.get('/', ProductController.getAll);
router.get('/:id', val.validateProductId, ProductController.getById);
router.put('/:id',
  val.validateProductId,
  val.validateNameAndQuantity,
  val.validateQuantity,
  val.validateNameLength,
  ProductController.update);
router.delete('/:id', val.validateProductId, ProductController.erase);

module.exports = router;