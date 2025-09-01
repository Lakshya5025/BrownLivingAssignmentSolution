// To run this service, you'll need to install Express:
// npm install express

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Hardcoded product data
const products = [
  { id: 1, name: 'Bottle', price: 250 },
  { id: 2, name: 'Bag', price: 500 },
  { id: 3, name: 'Shirt', price: 750 }
];

// GET API to return the list of products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST API to accept a product ID and quantity, and return the total price
app.post('/cart', (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== 'number' || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid product ID or quantity' });
  }

  const product = products.find(p => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const totalPrice = product.price * quantity;
  res.json({ totalPrice: totalPrice });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
