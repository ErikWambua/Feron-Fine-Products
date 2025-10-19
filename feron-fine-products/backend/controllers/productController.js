const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// Cloudinary config via CLOUDINARY_URL
cloudinary.config({
  secure: true,
});

async function listProducts(req, res) {
  const { category, minPrice, maxPrice, minRating, q } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);
  if (minRating) filter.rating = { $gte: Number(minRating) };
  if (q) filter.name = { $regex: q, $options: 'i' };

  const products = await Product.find(filter).sort({ createdAt: -1 });
  return res.json(products);
}

async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.json(product);
}

async function createProduct(req, res) {
  const { name, category, price, stock, description } = req.body;
  if (!name || !category || price == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  let imageUrl = '';
  let imagePublicId = '';
  if (req.file && req.file.path) {
    imageUrl = req.file.path;
    imagePublicId = req.file.filename || '';
  } else if (req.body.image && typeof req.body.image === 'string') {
    // Optional: support base64 image uploads
    const upload = await cloudinary.uploader.upload(req.body.image, { folder: 'ffp' });
    imageUrl = upload.secure_url;
    imagePublicId = upload.public_id;
  }

  const product = await Product.create({ name, category, price, stock, description, imageUrl, imagePublicId });
  return res.status(201).json(product);
}

async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const updatable = ['name', 'category', 'price', 'stock', 'description'];
  updatable.forEach((key) => {
    if (req.body[key] !== undefined) product[key] = req.body[key];
  });

  if (req.file && req.file.path) {
    // destroy old image if exists
    if (product.imagePublicId) {
      try { await cloudinary.uploader.destroy(product.imagePublicId); } catch (e) {}
    }
    product.imageUrl = req.file.path;
    product.imagePublicId = req.file.filename || '';
  }

  const saved = await product.save();
  return res.json(saved);
}

async function deleteProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (product.imagePublicId) {
    try { await cloudinary.uploader.destroy(product.imagePublicId); } catch (e) {}
  }
  await product.deleteOne();
  return res.json({ message: 'Product deleted' });
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
