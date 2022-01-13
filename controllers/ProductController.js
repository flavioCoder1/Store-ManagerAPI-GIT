const ProductService = require('../services/ProductService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  res.status(200).json({ products });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  if (!product) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, message, product } = await ProductService.create(name, quantity);
  if (code) return res.status(422).json({ err: { code, message } });
    res.status(201).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const productData = await ProductService.getById(id);
  if (!productData) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  } 
  const { name, quantity } = req.body;
  const { product } = await ProductService.update(id, name, quantity);
  res.status(200).json(product);
};

const erase = async (req, res) => {
  const { id } = req.params;
  const errMessage = { err: { code: 'invalid_data', message: 'Wrong id format' } };
  const productData = await ProductService.getById(id);
  if (!productData) return res.status(422).json(errMessage);
  const deletedProduct = await ProductService.erase(id);
  res.status(200).json(deletedProduct);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  erase,
};