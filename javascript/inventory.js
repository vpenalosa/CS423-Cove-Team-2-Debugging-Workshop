
function reserveInventory(products, order) {
  if(order.items.length === 0) {
    throw new Error('Order has no items');
  }
  for (const item of order.items) {
    const product = products.find(p => p.id === item.productId);
    if(!product || product.stock < item.quantity) {
      throw new Error('Product ${item.productId} is out of stock');
    }// Fix 1 Check to see if the product is out of stock, and if it is and they ordered it, throw an error
    else if (product) 
      {
      product.stock -= item.quantity; // Fix 2 Reduce the amount of stock by the amount ordered 
    }
  }
  return products;
}

function restockProduct(products, productId, amount) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    return null;
  }
  if(amount < 0) {
    throw new Error('Restock amount cannot be negative');
  }
  product.stock += amount;
  return product;
}

module.exports = {
  reserveInventory,
  restockProduct
};
