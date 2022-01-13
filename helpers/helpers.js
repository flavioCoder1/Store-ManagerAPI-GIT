const resumeArray = (array) => {
  const newObject = array.reduce((acc, item) => {
    acc[item.productId] = (acc[item.productId] || 0) + Number(item.quantity); return acc;
  }, {});
  const productIds = Object.keys(newObject);
  const quantities = Object.values(newObject);
  const newArray = productIds
    .map((item, index) => ({ productId: item, quantity: quantities[index] }));
  return newArray;
};

const getQuantity = (id, array) => {
  const product = array.find(({ _id }) => _id.toString() === id);
  return product.quantity;
};
  
const checkQuantity = (products, resumeSales) => {
  const newArray = products.filter(({ _id, quantity }) => resumeSales
  .some((sale) => _id.toString() === sale.productId && Number(quantity) > Number(sale.quantity)));
  return newArray;
};

const getSalesAndQuantities = (sales, products, addOrSubtract) => {
  if (addOrSubtract === 'add') {
    const result = sales.reduce((acc, { productId, quantity }) => {
      acc.push({ productId, quantity: getQuantity(productId, products) + quantity }); return acc;
    }, []);
    return result;
  }
  const result = sales.reduce((acc, { productId, quantity }) => {
    acc.push({ productId, quantity: getQuantity(productId, products) - quantity }); return acc;
  }, []);
  return result;
};

module.exports = {
  resumeArray, 
  checkQuantity,
  getSalesAndQuantities,
};