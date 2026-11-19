const { getProducts, getCustomers, getOrders, getTaxRates } = require("./data");
const { processOrder, calculateSubtotal } = require("./orders");
const { findProductByName, lowStockProducts, categorySummary } = require("./reports");
const { isNonEmptyString, findProductById, findCustomerById, validateOrder } = require("./validators");

function check(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function main() {
  const products = getProducts();
  const customers = getCustomers();
  const orders = getOrders();
  const taxRates = getTaxRates();


  // check(findProductByName(products, "  keyboard "), "Search should trim and ignore case");
  // check(findProductByName(products, "MOUSE"), "Search should ignore case");

  //const lowNames = lowStockProducts(products, 5).map(p => p.name);
  // check(lowNames.includes("Pen Pack"), "Low-stock report should include out-of-stock products");

  //const summary = categorySummary(products);
  // check(summary.Electronics.productCount === 2, "Electronics should have 2 products");
  // check(summary.Electronics.totalStock === 16, "Electronics should have 16 total stock");

  //const subtotal = calculateSubtotal(orders[0], products);
  // check(Math.abs(subtotal - 119.97) < 0.001, "Order 1001 subtotal should be 119.97");

  //const result = processOrder(orders[0], products, customers, taxRates);
  // check(result.valid === true, "Order 1001 should be valid");
  // check(products[0].stock === 10, "Keyboard stock should decrease by 2");
  // check(products[1].stock === 3, "Mouse stock should decrease by 1");

  //const invalidResult = processOrder(orders[1], products, customers, taxRates);
  // check(invalidResult.valid === false, "Order 1002 should be invalid because Pen Pack is out of stock");

  check(isNonEmptyString("Hello"), "isNonEmptyString should return true for non-empty strings");
  check(!isNonEmptyString(""), "isNonEmptyString should return false for empty strings");
  check(!isNonEmptyString(123), "isNonEmptyString should return false for non-string values");
  check(!isNonEmptyString("            "), "isNonEmptyString should return false for whitespace-only strings");

  check(findProductById(products, "P100").name === "Keyboard", "findProductById should return the correct product");
  check(findCustomerById(customers, "C001").name === "Alice Carter", "findCustomerById should return the correct customer");
  check(validateOrder(orders[0], products, customers), "Order 1001 should be valid");
  const overStock = {...orders[0], items: [{ productId: "P101", quantity: 5 }]};
  check(validateOrder(overStock, products, customers).some(error => error.includes("Not enough inventory")), "An order exceeding available stock should be invalid");

  console.log("All debugging scenarios passed.");
}

main();
