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
    // SEATING
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
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'armchair',
      name: 'Armchair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'armchair',
      width: 90,
      height: 90,
      color: '#92400E',
      price: 'premium',
      rating: 4.9,
      downloads: 890,
      tags: ['comfortable', 'living room', 'armchair'],
      modelPath: '/src/threeD/models/chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'recliner',
      name: 'Recliner Chair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'recliner',
      width: 95,
      height: 100,
      color: '#6B4423',
      price: 'premium',
      rating: 4.7,
      downloads: 650,
      tags: ['recliner', 'comfort', 'relaxation'],
      modelPath: '/src/threeD/models/recliner.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'loveseat',
      name: 'Loveseat',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'loveseat',
      width: 140,
      height: 80,
      color: '#8B5CF6',
      price: 'free',
      rating: 4.6,
      downloads: 780,
      tags: ['loveseat', 'compact', 'cozy'],
      modelPath: '/src/threeD/models/loveseat.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'bench',
      name: 'Wooden Bench',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'bench',
      width: 120,
      height: 45,
      color: '#8B4513',
      price: 'free',
      rating: 4.4,
      downloads: 520,
      tags: ['bench', 'wood', 'simple'],
      modelPath: '/src/threeD/models/bench.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'stool',
      name: 'Bar Stool',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'stool',
      width: 40,
      height: 75,
      color: '#4A5568',
      price: 'free',
      rating: 4.3,
      downloads: 430,
      tags: ['stool', 'bar', 'compact'],
      modelPath: '/src/threeD/models/stool.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'bean_bag',
      name: 'Bean Bag',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'bean_bag',
      width: 80,
      height: 80,
      color: '#E53E3E',
      price: 'free',
      rating: 4.2,
      downloads: 340,
      tags: ['bean bag', 'casual', 'flexible'],
      modelPath: '/src/threeD/models/bean_bag.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'sectional_sofa',
      name: 'Sectional Sofa',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'sectional_sofa',
      width: 250,
      height: 180,
      color: '#2D3748',
      price: 'premium',
      rating: 4.9,
      downloads: 920,
      tags: ['sectional', 'large', 'family'],
      modelPath: '/src/threeD/models/sectional_sofa.glb',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'rocking_chair',
      name: 'Rocking Chair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'rocking_chair',
      width: 85,
      height: 110,
      color: '#8B4513',
      price: 'premium',
      rating: 4.8,
      downloads: 670,
      tags: ['rocking', 'traditional', 'comfort'],
      modelPath: '/src/threeD/models/rocking_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dining_chair',
      name: 'Dining Chair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'dining_chair',
      width: 50,
      height: 85,
      color: '#4A5568',
      price: 'free',
      rating: 4.5,
      downloads: 1100,
      tags: ['dining', 'chair', 'elegant'],
      modelPath: '/src/threeD/models/dining_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'office_chair',
      name: 'Office Chair',
      category: 'seating',
      type: 'furniture',
      furnitureType: 'office_chair',
      width: 65,
      height: 110,
      color: '#1A202C',
      price: 'premium',
      rating: 4.7,
      downloads: 850,
      tags: ['office', 'ergonomic', 'professional'],
      modelPath: '/src/threeD/models/office_chair.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },

    // TABLES
    {
      id: 'coffee_table',
      name: 'Coffee Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'coffee_table',
      width: 120,
      height: 60,
      color: '#8B4513',
      price: 'free',
      rating: 4.6,
      downloads: 1300,
      tags: ['coffee', 'living room', 'center'],
      modelPath: '/src/threeD/models/coffee_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'table',
      name: 'Dining Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'dining_table',
      width: 120,
      height: 60,
      color: '#6B7280',
      price: 'free',
      rating: 4.6,
      downloads: 2100,
      tags: ['wood', 'dining', 'table'],
      modelPath: '/src/threeD/models/table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'side_table',
      name: 'Side Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'side_table',
      width: 50,
      height: 50,
      color: '#8B4513',
      price: 'free',
      rating: 4.4,
      downloads: 890,
      tags: ['side', 'small', 'accent'],
      modelPath: '/src/threeD/models/side_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'console_table',
      name: 'Console Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'console_table',
      width: 140,
      height: 40,
      color: '#4A5568',
      price: 'premium',
      rating: 4.7,
      downloads: 720,
      tags: ['console', 'narrow', 'hallway'],
      modelPath: '/src/threeD/models/console_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'study_desk',
      name: 'Study Desk',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'study_desk',
      width: 120,
      height: 60,
      color: '#2D3748',
      price: 'free',
      rating: 4.5,
      downloads: 950,
      tags: ['study', 'desk', 'work'],
      modelPath: '/src/threeD/models/study_desk.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'office_table',
      name: 'Office Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'office_table',
      width: 160,
      height: 80,
      color: '#1A202C',
      price: 'premium',
      rating: 4.8,
      downloads: 1150,
      tags: ['office', 'professional', 'large'],
      modelPath: '/src/threeD/models/office_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'nightstand_table',
      name: 'Nightstand',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'nightstand',
      width: 45,
      height: 45,
      color: '#8B4513',
      price: 'free',
      rating: 4.3,
      downloads: 780,
      tags: ['nightstand', 'bedroom', 'bedside'],
      modelPath: '/src/threeD/models/nightstand.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'folding_table',
      name: 'Folding Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'folding_table',
      width: 100,
      height: 60,
      color: '#6B7280',
      price: 'free',
      rating: 4.2,
      downloads: 560,
      tags: ['folding', 'portable', 'space-saving'],
      modelPath: '/src/threeD/models/folding_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dressing_table',
      name: 'Dressing Table',
      category: 'tables',
      type: 'furniture',
      furnitureType: 'dressing_table',
      width: 110,
      height: 50,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.6,
      downloads: 640,
      tags: ['dressing', 'vanity', 'mirror'],
      modelPath: '/src/threeD/models/dressing_table.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },

    // BEDROOM
    {
      id: 'bed',
      name: 'Bed Frame',
      category: 'bedroom',
      type: 'bed',
      furnitureType: 'bed_frame',
      width: 160,
      height: 200,
      color: '#059669',
      price: 'free',
      rating: 4.8,
      downloads: 3200,
      tags: ['bed', 'frame', 'sleep'],
      modelPath: '/src/threeD/models/bed.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'mattress',
      name: 'Mattress',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'mattress',
      width: 160,
      height: 200,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.7,
      downloads: 1800,
      tags: ['mattress', 'comfort', 'sleep'],
      modelPath: '/src/threeD/models/mattress.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'wardrobe',
      name: 'Wardrobe',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'wardrobe',
      width: 120,
      height: 200,
      color: '#4A5568',
      price: 'premium',
      rating: 4.8,
      downloads: 1650,
      tags: ['wardrobe', 'storage', 'clothes'],
      modelPath: '/src/threeD/models/wardrobe.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dresser',
      name: 'Dresser',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'dresser',
      width: 140,
      height: 80,
      color: '#8B4513',
      price: 'free',
      rating: 4.5,
      downloads: 1200,
      tags: ['dresser', 'drawers', 'storage'],
      modelPath: '/src/threeD/models/dresser.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'nightstand_bedroom',
      name: 'Nightstand',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'nightstand',
      width: 45,
      height: 60,
      color: '#8B4513',
      price: 'free',
      rating: 4.4,
      downloads: 980,
      tags: ['nightstand', 'bedside', 'storage'],
      modelPath: '/src/threeD/models/nightstand.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'vanity',
      name: 'Vanity Table',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'vanity',
      width: 100,
      height: 50,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.6,
      downloads: 720,
      tags: ['vanity', 'makeup', 'mirror'],
      modelPath: '/src/threeD/models/vanity.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'headboard',
      name: 'Headboard',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'headboard',
      width: 160,
      height: 120,
      color: '#2D3748',
      price: 'premium',
      rating: 4.5,
      downloads: 890,
      tags: ['headboard', 'bed', 'upholstered'],
      modelPath: '/src/threeD/models/headboard.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'chest_of_drawers',
      name: 'Chest of Drawers',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'chest_of_drawers',
      width: 80,
      height: 120,
      color: '#8B4513',
      price: 'free',
      rating: 4.4,
      downloads: 760,
      tags: ['chest', 'drawers', 'tall'],
      modelPath: '/src/threeD/models/chest_of_drawers.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'bunk_bed',
      name: 'Bunk Bed',
      category: 'bedroom',
      type: 'furniture',
      furnitureType: 'bunk_bed',
      width: 100,
      height: 200,
      color: '#4A5568',
      price: 'premium',
      rating: 4.6,
      downloads: 650,
      tags: ['bunk', 'kids', 'space-saving'],
      modelPath: '/src/threeD/models/bunk_bed.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'bedside_lamp',
      name: 'Bedside Lamp',
      category: 'bedroom',
      type: 'light',
      furnitureType: 'bedside_lamp',
      width: 25,
      height: 45,
      color: '#F59E0B',
      price: 'free',
      rating: 4.3,
      downloads: 540,
      tags: ['lamp', 'bedside', 'lighting'],
      modelPath: '/src/threeD/models/bedside_lamp.glb',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },

    // KITCHEN
    {
      id: 'kitchen_cabinet',
      name: 'Kitchen Cabinet',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'kitchen_cabinet',
      width: 80,
      height: 90,
      color: '#8B4513',
      price: 'premium',
      rating: 4.7,
      downloads: 1350,
      tags: ['cabinet', 'storage', 'kitchen'],
      modelPath: '/src/threeD/models/kitchen_cabinet.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'kitchen_island',
      name: 'Kitchen Island',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'kitchen_island',
      width: 180,
      height: 90,
      color: '#4A5568',
      price: 'premium',
      rating: 4.8,
      downloads: 1100,
      tags: ['island', 'kitchen', 'central'],
      modelPath: '/src/threeD/models/kitchen_island.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'pantry_shelf',
      name: 'Pantry Shelf',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'pantry_shelf',
      width: 60,
      height: 180,
      color: '#8B4513',
      price: 'free',
      rating: 4.4,
      downloads: 680,
      tags: ['pantry', 'shelf', 'storage'],
      modelPath: '/src/threeD/models/pantry_shelf.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'kitchen_bar_stool',
      name: 'Kitchen Bar Stool',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'bar_stool',
      width: 40,
      height: 75,
      color: '#1A202C',
      price: 'free',
      rating: 4.3,
      downloads: 590,
      tags: ['bar stool', 'kitchen', 'counter'],
      modelPath: '/src/threeD/models/bar_stool.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dish_rack',
      name: 'Dish Rack',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'dish_rack',
      width: 50,
      height: 30,
      color: '#6B7280',
      price: 'free',
      rating: 4.1,
      downloads: 420,
      tags: ['dish rack', 'drying', 'kitchen'],
      modelPath: '/src/threeD/models/dish_rack.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'countertop',
      name: 'Kitchen Countertop',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'countertop',
      width: 200,
      height: 60,
      color: '#E2E8F0',
      price: 'premium',
      rating: 4.6,
      downloads: 980,
      tags: ['countertop', 'surface', 'kitchen'],
      modelPath: '/src/threeD/models/countertop.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dining_set',
      name: 'Kitchen Dining Set',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'dining_set',
      width: 120,
      height: 120,
      color: '#8B4513',
      price: 'premium',
      rating: 4.7,
      downloads: 850,
      tags: ['dining set', 'table', 'chairs'],
      modelPath: '/src/threeD/models/dining_set.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'sink_unit',
      name: 'Kitchen Sink Unit',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'sink_unit',
      width: 80,
      height: 90,
      color: '#E2E8F0',
      price: 'premium',
      rating: 4.5,
      downloads: 720,
      tags: ['sink', 'unit', 'kitchen'],
      modelPath: '/src/threeD/models/sink_unit.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'storage_rack',
      name: 'Kitchen Storage Rack',
      category: 'kitchen',
      type: 'furniture',
      furnitureType: 'storage_rack',
      width: 40,
      height: 120,
      color: '#4A5568',
      price: 'free',
      rating: 4.2,
      downloads: 460,
      tags: ['storage', 'rack', 'organization'],
      modelPath: '/src/threeD/models/storage_rack.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },

    // APPLIANCES
    {
      id: 'refrigerator',
      name: 'Modern Refrigerator',
      category: 'appliances',
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
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'microwave_oven',
      name: 'Microwave Oven',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'microwave_oven',
      width: 50,
      height: 30,
      color: '#1A202C',
      price: 'premium',
      rating: 4.6,
      downloads: 890,
      tags: ['microwave', 'oven', 'cooking'],
      modelPath: '/src/threeD/models/microwave_oven.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'washing_machine',
      name: 'Washing Machine',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'washing_machine',
      width: 60,
      height: 85,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.7,
      downloads: 1200,
      tags: ['washing machine', 'laundry', 'appliance'],
      modelPath: '/src/threeD/models/washing_machine.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'dishwasher',
      name: 'Dishwasher',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'dishwasher',
      width: 60,
      height: 85,
      color: '#E2E8F0',
      price: 'premium',
      rating: 4.5,
      downloads: 780,
      tags: ['dishwasher', 'kitchen', 'cleaning'],
      modelPath: '/src/threeD/models/dishwasher.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'air_conditioner',
      name: 'Air Conditioner',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'air_conditioner',
      width: 80,
      height: 30,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.6,
      downloads: 950,
      tags: ['air conditioner', 'cooling', 'climate'],
      modelPath: '/src/threeD/models/air_conditioner.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
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
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'blender',
      name: 'Kitchen Blender',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'blender',
      width: 20,
      height: 35,
      color: '#1A202C',
      price: 'free',
      rating: 4.3,
      downloads: 520,
      tags: ['blender', 'kitchen', 'small appliance'],
      modelPath: '/src/threeD/models/blender.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'toaster',
      name: 'Toaster',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'toaster',
      width: 30,
      height: 20,
      color: '#E2E8F0',
      price: 'free',
      rating: 4.2,
      downloads: 480,
      tags: ['toaster', 'breakfast', 'kitchen'],
      modelPath: '/src/threeD/models/toaster.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'electric_kettle',
      name: 'Electric Kettle',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'electric_kettle',
      width: 25,
      height: 25,
      color: '#4A5568',
      price: 'free',
      rating: 4.1,
      downloads: 390,
      tags: ['kettle', 'electric', 'hot water'],
      modelPath: '/src/threeD/models/electric_kettle.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'induction_cooktop',
      name: 'Induction Cooktop',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'induction_cooktop',
      width: 60,
      height: 5,
      color: '#1A202C',
      price: 'premium',
      rating: 4.7,
      downloads: 670,
      tags: ['induction', 'cooktop', 'cooking'],
      modelPath: '/src/threeD/models/induction_cooktop.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'vacuum_cleaner',
      name: 'Vacuum Cleaner',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'vacuum_cleaner',
      width: 30,
      height: 110,
      color: '#E53E3E',
      price: 'premium',
      rating: 4.4,
      downloads: 580,
      tags: ['vacuum', 'cleaner', 'cleaning'],
      modelPath: '/src/threeD/models/vacuum_cleaner.glb',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
    },
    {
      id: 'water_purifier',
      name: 'Water Purifier',
      category: 'appliances',
      type: 'appliance',
      furnitureType: 'water_purifier',
      width: 35,
      height: 50,
      color: '#F7FAFC',
      price: 'premium',
      rating: 4.5,
      downloads: 640,
      tags: ['water purifier', 'health', 'kitchen'],
      modelPath: '/src/threeD/models/water_purifier.glb',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=200',
      preview3D: true
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
          {item.preview3D && (
            <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Realistic 3D
            </span>
          )}
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