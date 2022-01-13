const ProductsModel = require('../models/ProductModel');
const val = require('../middlewares/validations');

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await ProductsModel.getById(id);
  return product;
};

const create = async (name, quantity) => {
  const products = await ProductsModel.getAll();
  const validationName = val.checkName(name, products);
  if (validationName.message) return validationName;
  const { _id } = await ProductsModel.create(name, quantity);
  return { product: { _id, name, quantity } };
};

const update = async (id, name, quantity) => {
  const { _id } = await ProductsModel.update(id, name, quantity);
  return { product: { _id, name, quantity } };
};

const erase = async (id) => {
  const deletedProduct = await ProductsModel.erase(id);
  return deletedProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  erase,
};