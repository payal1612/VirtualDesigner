import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid3x3 as Grid3X3, List, Download, Star, Heart, Plus, X, ChevronDown, Package, Sofa, Bed, ChefHat, Monitor, Bath, TreePine, Lightbulb, Car, Home } from 'lucide-react';

const FurnitureLibrary = ({ onAddElement, isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Furniture items with 3D model paths
  const furnitureItems = [
    // Seating
    {
      id: 'sofa',
      name: 'Modern Sofa',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'sofa',
      width: 180,
      height: 80,
      color: '#8B5CF6',
      price: 'free',
      rating: 4.8,
      downloads: 1250,
      tags: ['modern', 'living room', 'comfortable'],
      modelPath: '/src/threeD/models/sofa.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'chair',
      name: 'Modern Chair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'chair',
      width: 90,
      height: 90,
      color: '#92400E',
      price: 'premium',
      rating: 4.9,
      downloads: 890,
      tags: ['modern', 'office', 'chair'],
      modelPath: '/src/threeD/models/chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    // Tables
    {
      id: 'table',
      name: 'Dining Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'table',
      width: 120,
      height: 60,
      color: '#6B7280',
      price: 'free',
      rating: 4.6,
      downloads: 2100,
      tags: ['wood', 'dining', 'table'],
      modelPath: '/src/threeD/models/table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    // Bedroom
    {
      id: 'bed',
      name: 'Queen Size Bed',
      category: 'bedroom',
      type: 'bed',
      furnitureType: 'bed',
      width: 160,
      height: 200,
      color: '#059669',
      price: 'free',
      rating: 4.8,
      downloads: 3200,
      tags: ['queen', 'bedroom', 'sleep'],
      modelPath: '/src/threeD/models/bed.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    // Kitchen
    {
      id: 'refrigerator',
      name: 'Modern Refrigerator',
      category: 'kitchen',
      type: 'appliance',
      furnitureType: 'refrigerator',
      width: 60,
      height: 180,
      color: '#FFFFFF',
      price: 'premium',
      rating: 4.9,
      downloads: 1450,
      tags: ['refrigerator', 'kitchen', 'appliance'],
      modelPath: '/src/threeD/models/refrigerator.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    // Appliances
    {
      id: 'air_cooler',
      name: 'Tower Air Cooler',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'air_cooler',
      width: 50,
      height: 150,
      color: '#6B7280',
      price: 'free',
      rating: 4.6,
      downloads: 1120,
      tags: ['air cooler', 'cooling', 'appliance'],
      modelPath: '/src/threeD/models/air_cooler.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  // Furniture categories with 3D model support
  const categories = [
    { id: 'all', name: 'All Items', icon: Grid3X3, count: furnitureItems.length },
    { id: 'seating', name: 'Seating', icon: Sofa, count: furnitureItems.filter(item => item.category === 'seating').length },
    { id: 'tables', name: 'Tables', icon: Monitor, count: furnitureItems.filter(item => item.category === 'tables').length },
    { id: 'bedroom', name: 'Bedroom', icon: Bed, count: furnitureItems.filter(item => item.category === 'bedroom').length },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat, count: furnitureItems.filter(item => item.category === 'kitchen').length },
    { id: 'appliances', name: 'Appliances', icon: Package, count: furnitureItems.filter(item => item.category === 'appliances').length }
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
      zIndex: Date.now(),
      furnitureType: item.furnitureType || item.type
    };
    
    onAddElement(newElement);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = `${item.name} added to design`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
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
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Furniture Library</h2>
              <p className="text-gray-600">Add furniture and objects to your design</p>
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
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search furniture..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <div className="flex h-full">
            {/* Categories Sidebar */}
            <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <category.icon className="h-5 w-5" />
                    <span className="flex-1">{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
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
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No furniture found</h3>
                  <p className="text-gray-600">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Furniture Card Component
const FurnitureCard = ({ item, onAdd, onToggleFavorite, isFavorite, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/0 transition-all duration-300 flex items-center justify-center ${
          isHovered ? 'bg-black/20' : ''
        }`}>
          <button
            onClick={onAdd}
            className={`p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all transform ${
              isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {item.price === 'premium' && (
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Premium
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
            3D Model
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
            isFavorite 
              ? 'bg-red-100 text-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span className="text-xs text-gray-600">{item.rating}</span>
            </div>
            <span className="text-xs text-gray-500">•</span>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-600">{item.downloads}</span>
            </div>
          </div>
          <span className={`text-xs font-semibold ${
            item.price === 'free' ? 'text-green-600' : 'text-purple-600'
          }`}>
            {item.price === 'free' ? 'FREE' : 'PREMIUM'}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onAdd}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
        >
          Add to Design
        </button>
      </div>
    </motion.div>
  );
};

// Furniture List Item Component
const FurnitureListItem = ({ item, onAdd, onToggleFavorite, isFavorite, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <span className={`text-sm font-semibold ${
              item.price === 'free' ? 'text-green-600' : 'text-purple-600'
            }`}>
              {item.price === 'free' ? 'FREE' : 'PREMIUM'}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
              <span>{item.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="h-3 w-3" />
              <span>{item.downloads} downloads</span>
            </div>
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
              3D Model
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleFavorite}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite 
                ? 'text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
          >
            Add to Design
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default FurnitureLibrary;