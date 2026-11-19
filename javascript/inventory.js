
function reserveInventory(products, order) {
  for (const item of order.items) {
    const product = products.find(p => p.id === item.productId);
    if(product.stock === 0) {
      throw new Error('Product ${product.id} is out of stock');
    }// Fix 1 Check to see if the product is out of stock, and if it is and they ordered it, throw an error
    else if (product) 
      {
      product.stock -= item.quantity; // Fix 2 Reduce the amount of stock by the amount ordered 
    }
  }
}

function restockProduct(products, productId, amount) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    return null;
  }

  product.stock = amount;
  return product;
}

module.exports = {
  reserveInventory,
  restockProduct
};
