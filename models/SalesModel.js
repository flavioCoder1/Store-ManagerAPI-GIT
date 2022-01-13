const { ObjectId } = require('mongodb');
const { connection } = require('../connection/connection');

const getAll = async () => connection().then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const create = async (sales) => {
  const salesCollection = await connection().then((db) => db.collection('sales'));
  const { insertedId: _id } = await salesCollection.insertOne({ itensSold: sales });
  return { _id, itensSold: sales };
};

const update = async (id, sales) => {
  const db = await connection();
  const queryId = { _id: ObjectId(id) };
  const updatedVal = { $set: { itensSold: sales } };
  await db.collection('sales').updateOne(queryId, updatedVal);
  const sale = await getById(id);
  return sale;
};

const erase = async (id) => {
  const db = await connection();
  const sale = await getById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  erase,
};