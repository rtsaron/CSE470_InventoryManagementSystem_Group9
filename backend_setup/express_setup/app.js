const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies

mongoose.connect('mongodb://localhost/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
