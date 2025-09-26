const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shinespace', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Furniture Schema
const furnitureSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  modelUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  materials: [String],
  polygonCount: Number,
  fileSize: String,
  tags: [String],
  price: { type: String, default: 'free' },
  rating: { type: Number, default: 4.5 },
  downloads: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Furniture = mongoose.model('Furniture', furnitureSchema);

// Seed initial furniture data
const seedFurniture = async () => {
  const count = await Furniture.countDocuments();
  if (count === 0) {
    const initialFurniture = [
      {
        id: 1,
        name: "Modern Sectional Sofa",
        modelUrl: "/models/furniture/sofa_modern.glb",
        category: "seating",
        description: "Spacious L-shaped sectional sofa with premium fabric upholstery and foldable bed mechanism",
        dimensions: { width: 220, height: 90, depth: 80 },
        materials: ["Fabric", "Wood", "Metal"],
        polygonCount: 15000,
        fileSize: "2.5MB",
        tags: ["modern", "sectional", "living room", "comfortable", "foldable"],
        price: "free",
        rating: 4.9,
        downloads: 3250
      },
      {
        id: 2,
        name: "Ergonomic Office Chair",
        modelUrl: "/models/furniture/chair_modern.glb",
        category: "seating",
        description: "Professional office chair with lumbar support, height adjustment, and premium materials",
        dimensions: { width: 65, height: 120, depth: 65 },
        materials: ["Leather", "Metal", "Plastic"],
        polygonCount: 8000,
        fileSize: "1.8MB",
        tags: ["office", "ergonomic", "adjustable", "professional"],
        price: "free",
        rating: 4.7,
        downloads: 2100
      },
      {
        id: 3,
        name: "Queen Platform Bed",
        modelUrl: "/models/furniture/bed_queen.glb",
        category: "bedroom",
        description: "Low-profile platform bed with built-in nightstands and premium mattress",
        dimensions: { width: 160, height: 60, depth: 200 },
        materials: ["Wood", "Fabric", "Cotton"],
        polygonCount: 12000,
        fileSize: "2.8MB",
        tags: ["queen", "platform", "bedroom", "modern", "comfortable"],
        price: "premium",
        rating: 4.9,
        downloads: 4200
      },
      {
        id: 4,
        name: "Solid Wood Dining Table",
        modelUrl: "/models/furniture/table_dining.glb",
        category: "tables",
        description: "Handcrafted oak dining table with polished surface and metallic legs",
        dimensions: { width: 180, height: 75, depth: 90 },
        materials: ["Oak Wood", "Metal"],
        polygonCount: 6000,
        fileSize: "1.2MB",
        tags: ["dining", "wood", "oak", "family", "handcrafted"],
        price: "premium",
        rating: 4.8,
        downloads: 2200
      },
      {
        id: 5,
        name: "Modern Refrigerator",
        modelUrl: "/models/furniture/refrigerator_modern.glb",
        category: "appliances",
        description: "Energy-efficient refrigerator with French doors, interior shelves, and stainless steel finish",
        dimensions: { width: 60, height: 180, depth: 60 },
        materials: ["Stainless Steel", "Plastic", "Glass"],
        polygonCount: 10000,
        fileSize: "2.2MB",
        tags: ["refrigerator", "appliance", "kitchen", "energy-efficient", "french-doors"],
        price: "free",
        rating: 4.8,
        downloads: 1950
      },
      {
        id: 6,
        name: "Tower Air Cooler",
        modelUrl: "/models/furniture/air_cooler.glb",
        category: "appliances",
        description: "Energy-efficient tower air cooler with rotating fan blades and remote control",
        dimensions: { width: 40, height: 150, depth: 30 },
        materials: ["Plastic", "Metal", "Rubber"],
        polygonCount: 7000,
        fileSize: "1.6MB",
        tags: ["air cooler", "tower", "cooling", "energy-efficient", "remote"],
        price: "free",
        rating: 4.6,
        downloads: 1750
      }
    ];

    await Furniture.insertMany(initialFurniture);
    console.log('Initial furniture data seeded successfully');
  }
};

// Routes

// GET /api/furniture - Get all furniture
app.get('/api/furniture', async (req, res) => {
  try {
    const { category, search, limit = 50 } = req.query;
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const furniture = await Furniture.find(query)
      .limit(parseInt(limit))
      .sort({ downloads: -1, rating: -1 });
    
    res.json(furniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/furniture/:id - Get specific furniture
app.get('/api/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findOne({ id: parseInt(req.params.id) });
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json(furniture);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/furniture - Add new furniture (admin only)
app.post('/api/furniture', async (req, res) => {
  try {
    const furnitureData = req.body;
    
    // Generate new ID
    const lastFurniture = await Furniture.findOne().sort({ id: -1 });
    furnitureData.id = lastFurniture ? lastFurniture.id + 1 : 1;
    
    const furniture = new Furniture(furnitureData);
    await furniture.save();
    
    res.status(201).json(furniture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/furniture/:id - Update furniture
app.put('/api/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    
    res.json(furniture);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/furniture/:id - Delete furniture
app.delete('/api/furniture/:id', async (req, res) => {
  try {
    const furniture = await Furniture.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    res.json({ message: 'Furniture deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/furniture/:id/download - Increment download count
app.post('/api/furniture/:id/download', async (req, res) => {
  try {
    const furniture = await Furniture.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      { $inc: { downloads: 1 } },
      { new: true }
    );
    
    if (!furniture) {
      return res.status(404).json({ error: 'Furniture not found' });
    }
    
    res.json({ downloads: furniture.downloads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/furniture/categories - Get all categories
app.get('/api/furniture/categories', async (req, res) => {
  try {
    const categories = await Furniture.distinct('category');
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const count = await Furniture.countDocuments({ category });
        return { name: category, count };
      })
    );
    
    res.json(categoriesWithCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedFurniture();
});

module.exports = app;