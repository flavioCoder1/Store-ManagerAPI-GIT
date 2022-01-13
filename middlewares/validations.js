const validateSaleQuantity = (quantity) => {
  if (typeof (quantity) !== 'number' || Number(quantity) < 1) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  return false;
};

const checkSaleId = (req, res, next) => {
  const { id } = req.params;
  const errMessage = { err: { code: 'not_found', message: 'Sale not found' } };
  if (id.length !== 24) return res.status(404).json(errMessage);
  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;
  const errMessage = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  if (id.length !== 24) return res.status(422).json(errMessage);
  next();
};

const validateProductId = (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  next();
};

const checkName = (name, array) => {
  if (array.some((product) => product.name === name)) {
    return { code: 'invalid_data', message: 'Product already exists' };
  }
  return false;  
};

const validateNameLength = (req, res, next) => {
  const code = 'invalid_data';
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422)
    .json({ err: { code, message: '"name" length must be at least 5 characters long' } });
  }
  next();
};
  
const validateQuantity = (req, res, next) => {
  const code = 'invalid_data';
  const { quantity } = req.body;
  if (typeof (quantity) !== 'number') {
    return res.status(422).json({ err: { code, message: '"quantity" must be a number' } });
  }
  if (Number(quantity) < 1) {
    return res
    .status(422)
    .json({ err: { code, message: '"quantity" must be larger than or equal to 1' } });
  }
  next();
};

const validateNameAndQuantity = (req, res, next) => {
  const code = 'invalid_data';
  const { name, quantity } = req.body;
  if (!name) {
    return res.status(422).json({ err: { code, message: '"name" não encontrado' } });
  }
  if (!(quantity || quantity === 0)) {
    return res.status(422).json({ err: { code, message: '"quantity" não encontrado' } });
  }
  next();
};

module.exports = {
  validateSaleQuantity,
  validateId,
  checkSaleId,
  validateProductId,
  validateNameAndQuantity,
  checkName,
  validateNameLength,
  validateQuantity,
};