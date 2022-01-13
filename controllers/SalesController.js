const SalesService = require('../services/SalesService');

const getAll = async (_req, res) => {
  const sales = await SalesService.getAll();
    res.status(200).json({ sales });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await SalesService.getById(id);
  if (!sale) return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
    res.status(200).json(sale);
};

const create = async (req, res) => {
  const sales = req.body;
  const response = await SalesService.create(sales);
  const { code, message } = response;
  if (code === 'stock_problem') return res.status(404).json({ err: { code, message } });
  if (code) return res.status(422).json({ err: { code, message } });
  res.status(200).json(response);
};

const update = async (req, res) => {
  const { id } = req.params;
  const errMessage = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  const saleData = await SalesService.getById(id);
  if (!saleData) return res.status(422).json(errMessage);
  const sales = req.body;
  const response = await SalesService.update(id, sales);
  const { code, message, updatedSale } = response;
  if (code) return res.status(422).json({ err: { code, message } });
  res.status(200).json(updatedSale);
};

const erase = async (req, res) => {
  const { id } = req.params;
  const errMessage = { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };
  if (id.length !== 24) return res.status(422).json(errMessage);
  const saleData = await SalesService.getById(id);
  if (!saleData) return res.status(422).json(errMessage);
  const deletedSale = await SalesService.erase(id);
  res.status(200).json(deletedSale);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    erase,
};