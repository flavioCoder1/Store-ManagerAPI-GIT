const SalesModel = require('../models/SalesModel');
const ProductModel = require('../models/ProductModel');
const { validateSaleQuantity } = require('../middlewares/validations');
const helper = require('../helpers/helpers');

const getAll = async () => {
  const sales = await SalesModel.getAll();
  return sales;
};
  
const getById = async (id) => {
  const sale = await SalesModel.getById(id);
  return sale;
};

const updateProductsById = async (sales) => {
  await sales.forEach(async ({ productId, quantity }) => {
    await ProductModel.updateById(productId, quantity);
  });
};

const create = async (sales) => {
  const productChecked = sales.find(({ quantity }) => validateSaleQuantity(quantity));
  if (productChecked) {
    const validationQuantity = validateSaleQuantity(productChecked.quantity);
    return validationQuantity;
  }
  const products = await ProductModel.getAll();
  const resumeSales = helper.resumeArray(sales);
  const compareSalesAndProducts = helper.checkQuantity(products, resumeSales);
  if (compareSalesAndProducts.length !== resumeSales.length) {
    return { code: 'stock_problem', message: 'Such amount is not permitted to sell' };
  }
  const salesAndQuantities = helper.getSalesAndQuantities(resumeSales, products, 'subtract');
  await updateProductsById(salesAndQuantities);
  const result = await SalesModel.create(sales);
  return result;
};

const update = async (id, sales) => {
  const productValidated = sales.find(({ quantity }) => validateSaleQuantity(quantity));
  if (productValidated) {
    const valQuantity = validateSaleQuantity(productValidated.quantity);
    return valQuantity;
  }
  const updatedSale = await SalesModel.update(id, sales);
  return { updatedSale };
};

const erase = async (id) => {
  const products = await ProductModel.getAll();
  const { itensSold } = await SalesModel.getById(id);
  const salesArray = helper.getSalesAndQuantities(itensSold, products, 'add');
  await updateProductsById(salesArray);
  const deletedSale = await SalesModel.erase(id);
  return deletedSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  erase,
};