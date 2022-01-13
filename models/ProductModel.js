const { ObjectId } = require('mongodb');
const { connection } = require('../connection/connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

const create = async (name, quantity) => {
  const products = await connection().then((db) => db.collection('products'));
  const { insertedId: _id } = await products.insertOne({ name, quantity });
  return { _id, name, quantity };
};

const update = async (id, name, quantity) => {
  const db = await connection();
  const queryId = { _id: ObjectId(id) };
  const updatedVal = { $set: { name, quantity } };
  await db.collection('products').updateOne(queryId, updatedVal);
  return { _id: id, name, quantity };
};

const updateById = async (id, quantity) => {
  const db = await connection();
  const queryId = { _id: ObjectId(id) };
  const updatedVal = { $set: { quantity } };
  const { result } = await db.collection('products').updateOne(queryId, updatedVal);
  return result;
};

const erase = async (id) => {
  const db = await connection();
  const product = await getById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    updateById,
    erase,
};