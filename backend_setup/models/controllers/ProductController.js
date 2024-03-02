const Product = require('../models/Product');

exports.updateProductQuantity = async (req, res) => {
  try {
    const { productId, changeInQuantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    product.quantity += changeInQuantity;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).send(error.toString());
  }
};
