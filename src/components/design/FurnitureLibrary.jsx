import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download,
  Star,
  Heart,
  Plus,
  X,
  ChevronDown,
  Package,
  Sofa,
  Bed,
  ChefHat,
  Monitor,
  Bath,
  TreePine,
  Lightbulb,
  Car,
  Home,
  Refrigerator,
  AirVent,
  BookOpen,
  Armchair,
  Table,
  Lamp,
  Wind,
  Archive
} from 'lucide-react';

const FurnitureLibrary = ({ onAddElement, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced furniture categories with more variety
  const categories = [
    { id: 'all', name: 'All Items', icon: Grid3X3, count: 24 },
    { id: 'seating', name: 'Seating', icon: Sofa, count: 4 },
    { id: 'tables', name: 'Tables', icon: Table, count: 3 },
    { id: 'storage', name: 'Storage', icon: Archive, count: 3 },
    { id: 'bedroom', name: 'Bedroom', icon: Bed, count: 3 },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat, count: 2 },
    { id: 'bathroom', name: 'Bathroom', icon: Bath, count: 2 },
    { id: 'lighting', name: 'Lighting', icon: Lightbulb, count: 3 },
    { id: 'plants', name: 'Plants', icon: TreePine, count: 2 },
    { id: 'appliances', name: 'Appliances', icon: Refrigerator, count: 2 }
  ];

  // Comprehensive furniture items with realistic 3D models
  const furnitureItems = [
    // Seating Category
    {
      id: 'sofa_modern',
      name: 'Modern Sectional Sofa',
      category: 'seating',
      type: 'furniture',
      width: 220,
      height: 90,
      color: '#8B5CF6',
      price: 'free',
      rating: 4.9,
      downloads: 3250,
      tags: ['modern', 'sectional', 'living room', 'comfortable'],
      modelPath: '/models/furniture/sofa_modern.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spacious L-shaped sectional sofa with premium fabric upholstery'
    },
    {
      id: 'armchair_leather',
      name: 'Premium Leather Armchair',
      category: 'seating',
      type: 'furniture',
      width: 85,
      height: 90,
      color: '#92400E',
      price: 'premium',
      rating: 4.8,
      downloads: 1890,
      tags: ['leather', 'premium', 'armchair', 'classic'],
      modelPath: '/models/furniture/office_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Handcrafted leather armchair with ergonomic design'
    },
    {
      id: 'office_chair_ergonomic',
      name: 'Ergonomic Office Chair',
      category: 'seating',
      type: 'furniture',
      width: 65,
      height: 65,
      color: '#374151',
      price: 'free',
      rating: 4.7,
      downloads: 2100,
      tags: ['office', 'ergonomic', 'adjustable', 'work'],
      modelPath: '/models/furniture/office_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Professional office chair with lumbar support and height adjustment'
    },
    {
      id: 'dining_chair_set',
      name: 'Dining Chair Set',
      category: 'seating',
      type: 'furniture',
      width: 50,
      height: 50,
      color: '#7C2D12',
      price: 'free',
      rating: 4.6,
      downloads: 1650,
      tags: ['dining', 'wooden', 'set', 'family'],
      modelPath: '/models/furniture/office_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Set of 4 matching wooden dining chairs with cushioned seats'
    },

    // Tables Category
    {
      id: 'coffee_table_glass',
      name: 'Glass Coffee Table',
      category: 'tables',
      type: 'furniture',
      width: 120,
      height: 60,
      color: '#6B7280',
      price: 'free',
      rating: 4.8,
      downloads: 2800,
      tags: ['glass', 'modern', 'coffee table', 'transparent'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Tempered glass coffee table with chrome steel legs'
    },
    {
      id: 'dining_table_wood',
      name: 'Solid Wood Dining Table',
      category: 'tables',
      type: 'furniture',
      width: 180,
      height: 90,
      color: '#92400E',
      price: 'premium',
      rating: 4.9,
      downloads: 2200,
      tags: ['wood', 'dining', 'family', 'oak'],
      modelPath: '/models/furniture/dining_table_wood.glb',
      thumbnail: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Handcrafted oak dining table seats 6-8 people comfortably'
    },
    {
      id: 'side_table_modern',
      name: 'Modern Side Table',
      category: 'tables',
      type: 'furniture',
      width: 50,
      height: 50,
      color: '#374151',
      price: 'free',
      rating: 4.5,
      downloads: 1420,
      tags: ['side table', 'modern', 'minimalist', 'bedside'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Minimalist side table with hidden storage compartment'
    },

    // Storage Category
    {
      id: 'bookshelf_tall',
      name: 'Tall Bookshelf',
      category: 'storage',
      type: 'furniture',
      width: 80,
      height: 200,
      color: '#92400E',
      price: 'free',
      rating: 4.7,
      downloads: 1850,
      tags: ['bookshelf', 'storage', 'books', 'tall'],
      modelPath: '/models/furniture/bookshelf_tall.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '6-shelf tall bookcase with adjustable shelves'
    },
    {
      id: 'wardrobe_large',
      name: 'Large Wardrobe',
      category: 'storage',
      type: 'furniture',
      width: 150,
      height: 60,
      color: '#374151',
      price: 'premium',
      rating: 4.8,
      downloads: 1320,
      tags: ['wardrobe', 'clothes', 'storage', 'large'],
      modelPath: '/models/furniture/bookshelf_tall.glb',
      thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '3-door wardrobe with hanging space and drawers'
    },
    {
      id: 'tv_console',
      name: 'TV Console Unit',
      category: 'storage',
      type: 'furniture',
      width: 160,
      height: 45,
      color: '#1F2937',
      price: 'free',
      rating: 4.6,
      downloads: 1680,
      tags: ['tv console', 'entertainment', 'storage', 'media'],
      modelPath: '/models/furniture/bookshelf_tall.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Modern TV console with cable management and storage'
    },

    // Bedroom Category
    {
      id: 'bed_queen',
      name: 'Queen Size Platform Bed',
      category: 'bedroom',
      type: 'bed',
      width: 160,
      height: 200,
      color: '#059669',
      price: 'free',
      rating: 4.9,
      downloads: 4200,
      tags: ['queen', 'platform', 'bedroom', 'modern'],
      modelPath: '/models/furniture/bed_queen.glb',
      thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Low-profile platform bed with built-in nightstands'
    },
    {
      id: 'nightstand_modern',
      name: 'Modern Nightstand',
      category: 'bedroom',
      type: 'furniture',
      width: 50,
      height: 40,
      color: '#7C2D12',
      price: 'free',
      rating: 4.5,
      downloads: 1980,
      tags: ['nightstand', 'modern', 'storage', 'bedside'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Sleek nightstand with drawer and open shelf'
    },
    {
      id: 'dresser_6drawer',
      name: '6-Drawer Dresser',
      category: 'bedroom',
      type: 'furniture',
      width: 140,
      height: 50,
      color: '#92400E',
      price: 'premium',
      rating: 4.7,
      downloads: 1450,
      tags: ['dresser', 'storage', 'drawers', 'bedroom'],
      modelPath: '/models/furniture/bookshelf_tall.glb',
      thumbnail: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spacious 6-drawer dresser with soft-close mechanisms'
    },

    // Kitchen Category
    {
      id: 'kitchen_island',
      name: 'Kitchen Island with Seating',
      category: 'kitchen',
      type: 'kitchen',
      width: 200,
      height: 100,
      color: '#DC2626',
      price: 'premium',
      rating: 4.9,
      downloads: 2450,
      tags: ['island', 'kitchen', 'seating', 'storage'],
      modelPath: '/models/furniture/dining_table_wood.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Multi-functional kitchen island with bar seating and storage'
    },
    {
      id: 'refrigerator_modern',
      name: 'Modern Refrigerator',
      category: 'kitchen',
      type: 'appliance',
      width: 60,
      height: 60,
      color: '#6B7280',
      price: 'free',
      rating: 4.8,
      downloads: 1950,
      tags: ['refrigerator', 'appliance', 'kitchen', 'stainless'],
      modelPath: '/models/furniture/refrigerator_modern.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Energy-efficient refrigerator with French doors'
    },

    // Bathroom Category
    {
      id: 'bathtub_freestanding',
      name: 'Freestanding Bathtub',
      category: 'bathroom',
      type: 'bathroom',
      width: 170,
      height: 80,
      color: '#F9FAFB',
      price: 'premium',
      rating: 4.9,
      downloads: 1680,
      tags: ['bathtub', 'freestanding', 'luxury', 'spa'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elegant freestanding bathtub with overflow drain'
    },
    {
      id: 'vanity_double',
      name: 'Double Vanity Unit',
      category: 'bathroom',
      type: 'bathroom',
      width: 150,
      height: 60,
      color: '#374151',
      price: 'premium',
      rating: 4.7,
      downloads: 1320,
      tags: ['vanity', 'double', 'bathroom', 'storage'],
      modelPath: '/models/furniture/bookshelf_tall.glb',
      thumbnail: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Double sink vanity with marble countertop and storage'
    },

    // Lighting Category
    {
      id: 'pendant_light_modern',
      name: 'Modern Pendant Light',
      category: 'lighting',
      type: 'light',
      width: 30,
      height: 30,
      color: '#F59E0B',
      price: 'free',
      rating: 4.8,
      downloads: 3100,
      tags: ['pendant', 'modern', 'ceiling', 'ambient'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Minimalist pendant light with adjustable height'
    },
    {
      id: 'floor_lamp_arc',
      name: 'Arc Floor Lamp',
      category: 'lighting',
      type: 'light',
      width: 40,
      height: 40,
      color: '#EAB308',
      price: 'free',
      rating: 4.6,
      downloads: 2200,
      tags: ['floor lamp', 'arc', 'reading', 'adjustable'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Curved arc floor lamp perfect for reading corners'
    },
    {
      id: 'chandelier_crystal',
      name: 'Crystal Chandelier',
      category: 'lighting',
      type: 'light',
      width: 80,
      height: 80,
      color: '#F3F4F6',
      price: 'premium',
      rating: 4.9,
      downloads: 1580,
      tags: ['chandelier', 'crystal', 'luxury', 'dining'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elegant crystal chandelier with LED bulbs'
    },

    // Plants Category
    {
      id: 'plant_large_monstera',
      name: 'Large Monstera Plant',
      category: 'plants',
      type: 'plant',
      width: 60,
      height: 60,
      color: '#16A34A',
      price: 'free',
      rating: 4.9,
      downloads: 4500,
      tags: ['monstera', 'large', 'tropical', 'air purifying'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Beautiful monstera deliciosa in decorative ceramic pot'
    },
    {
      id: 'plant_small_succulent',
      name: 'Succulent Collection',
      category: 'plants',
      type: 'plant',
      width: 25,
      height: 25,
      color: '#22C55E',
      price: 'free',
      rating: 4.7,
      downloads: 3200,
      tags: ['succulent', 'small', 'collection', 'low maintenance'],
      modelPath: '/models/furniture/coffee_table_glass.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Set of 3 small succulents in modern geometric planters'
    },

    // Appliances Category
    {
      id: 'air_cooler_tower',
      name: 'Tower Air Cooler',
      category: 'appliances',
      type: 'appliance',
      width: 40,
      height: 30,
      color: '#374151',
      price: 'free',
      rating: 4.6,
      downloads: 1750,
      tags: ['air cooler', 'tower', 'cooling', 'energy efficient'],
      modelPath: '/models/furniture/air_cooler.glb',
      thumbnail: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Energy-efficient tower air cooler with remote control'
    },
    {
      id: 'washing_machine',
      name: 'Front Load Washing Machine',
      category: 'appliances',
      type: 'appliance',
      width: 60,
      height: 60,
      color: '#F9FAFB',
      price: 'premium',
      rating: 4.8,
      downloads: 1420,
      tags: ['washing machine', 'front load', 'energy star', 'quiet'],
      modelPath: '/models/furniture/refrigerator_modern.glb',
      thumbnail: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'High-efficiency front-loading washing machine'
    }
  ];

  // Filter furniture items
  const filteredItems = furnitureItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle add furniture
  const handleAddFurniture = (item) => {
    const newElement = {
      ...item,
      id: `element_${Date.now()}`,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      rotation: 0,
      opacity: 1,
      locked: false,
      zIndex: Date.now()
    };
    
    onAddElement(newElement);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = `${item.name} added to design`;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 2000);
  };

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(itemId)) {
      newFavorites.delete(itemId);
    } else {
      newFavorites.add(itemId);
    }
    setFavorites(newFavorites);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">3D Furniture Library</h2>
              <p className="text-gray-600">Realistic household furniture models for your design</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search realistic 3D furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-purple-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* 3D Model Indicator */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-xl">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">3D Models</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Categories Sidebar */}
            <div className="w-72 border-r border-gray-200 p-6 overflow-y-auto bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Furniture Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="flex-1 font-medium">{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Featured Section */}
              <div className="mt-8 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">✨ Featured Models</h4>
                <p className="text-sm text-amber-700">
                  High-quality 3D models optimized for web performance with realistic materials and textures.
                </p>
              </div>
            </div>

            {/* Furniture Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
              {filteredItems.length > 0 ? (
                viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                      <FurnitureCard
                        key={item.id}
                        item={item}
                        onAdd={() => handleAddFurniture(item)}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                        isFavorite={favorites.has(item.id)}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredItems.map((item, index) => (
                      <FurnitureListItem
                        key={item.id}
                        item={item}
                        onAdd={() => handleAddFurniture(item)}
                        onToggleFavorite={() => toggleFavorite(item.id)}
                        isFavorite={favorites.has(item.id)}
                        delay={index * 0.02}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Package className="h-12 w-12 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No 3D models found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your search or category filter</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-5 w-5" />
                    <span>Clear Filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredItems.length} of {furnitureItems.length} 3D furniture models
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4 text-blue-500" />
                <span>GLB/GLTF Format</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4 text-green-500" />
                <span>Web Optimized</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>PBR Materials</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Furniture Card Component with 3D Model Info
const FurnitureCard = ({ item, onAdd, onToggleFavorite, isFavorite, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* 3D Model Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-all duration-300 flex items-end justify-center pb-4 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button
            onClick={onAdd}
            className="flex items-center space-x-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-gray-900 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-105 font-semibold"
          >
            <Plus className="h-5 w-5" />
            <span>Add to Design</span>
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {item.price === 'premium' && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              ⭐ Premium
            </span>
          )}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            🎯 3D Model
          </span>
          {item.category === 'appliances' && (
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              ⚡ Smart
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all shadow-lg ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Model Info Badge */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full">
          GLB Model
        </div>
      </div>

      {/* Enhanced Info Section */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {item.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{item.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Package className="h-4 w-4 text-purple-500" />
              <span className="font-medium">3D</span>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            item.price === 'free' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
          }`}>
            {item.price === 'free' ? '🆓 FREE' : '💎 PREMIUM'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={onAdd}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 font-semibold shadow-lg"
        >
          Add 3D Model to Design
        </button>
      </div>
    </motion.div>
  );
};

// Enhanced List Item Component
const FurnitureListItem = ({ item, onAdd, onToggleFavorite, isFavorite, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-6">
        {/* Enhanced Thumbnail */}
        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 relative">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs font-bold px-1 py-0.5 rounded">
            3D
          </div>
        </div>

        {/* Enhanced Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{item.rating}</span>
              </div>
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                item.price === 'free' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'
              }`}>
                {item.price === 'free' ? 'FREE' : 'PREMIUM'}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-3 text-sm">{item.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4 text-blue-500" />
              <span className="font-medium">{item.downloads.toLocaleString()} downloads</span>
            </div>
            <div className="flex items-center space-x-1">
              <Package className="h-4 w-4 text-purple-500" />
              <span className="font-medium">GLB Format</span>
            </div>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">
              {item.category}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleFavorite}
            className={`p-3 rounded-xl transition-all ${
              isFavorite 
                ? 'text-red-600 bg-red-50 hover:bg-red-100 shadow-md' 
                : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onAdd}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-semibold shadow-lg transform hover:scale-105"
          >
            Add 3D Model
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FurnitureLibrary;