import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  Download,
  Star,
  Heart,
  Play,
  Eye,
  Clock,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  ChevronDown,
  SortAsc,
  SortDesc,
  Home,
  ChefHat,
  Bed,
  Monitor,
  Bath,
  TreePine,
  Car,
  X,
  Check,
  Baby
} from 'lucide-react';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { templates, loadDesign, createNewDesign } = useDesignStore();
  const { isAuthenticated } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Grid3X3, count: templates.length },
    { id: 'living', name: 'Living Room', icon: Home, count: templates.filter(t => t.category === 'living').length },
    { id: 'bedroom', name: 'Bedroom', icon: Bed, count: templates.filter(t => t.category === 'bedroom').length },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat, count: templates.filter(t => t.category === 'kitchen').length },
    { id: 'office', name: 'Office', icon: Monitor, count: templates.filter(t => t.category === 'office').length },
    { id: 'bathroom', name: 'Bathroom', icon: Bath, count: templates.filter(t => t.category === 'bathroom').length }
  ];

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case 'downloads':
          comparison = (a.downloads || 0) - (b.downloads || 0);
          break;
        default: // 'popular'
          comparison = (a.downloads || 0) - (b.downloads || 0);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const handleUseTemplate = (template) => {
    // Create a new design from template
    const newDesign = {
      id: `design_${Date.now()}`,
      name: `${template.name} (From Template)`,
      description: template.description,
      elements: [...template.elements],
      category: template.category,
      isTemplate: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    loadDesign(newDesign);
    navigate('/create');
    
    // Show success notification
    showNotification(`Template "${template.name}" loaded successfully!`, 'success');
  };

  const toggleFavorite = (templateId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(templateId)) {
      newFavorites.delete(templateId);
    } else {
      newFavorites.add(templateId);
    }
    setFavorites(newFavorites);
  };

  // Get template image based on category
  const getTemplateImage = (category) => {
    const templateImages = {
      living: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      bedroom: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=400',
      kitchen: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
      office: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=400',
      bathroom: 'https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=400',
      dining: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=400',
      child: 'https://images.pexels.com/photos/1571470/pexels-photo-1571470.jpeg?auto=compress&cs=tinysrgb&w=400',
      outdoor: 'https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    return templateImages[category] || templateImages.living;
  };

  const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightest-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Design Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional room layouts to jumpstart your creativity
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-10 bg-white"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                  <option value="downloads">Downloads</option>
                </select>
                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
                </button>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Templates Display */}
        {filteredTemplates.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  onToggleFavorite={() => toggleFavorite(template.id)}
                  isFavorite={favorites.has(template.id)}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {filteredTemplates.map((template, index) => (
                <TemplateListItem
                  key={template.id}
                  template={template}
                  onUse={() => handleUseTemplate(template)}
                  onToggleFavorite={() => toggleFavorite(template.id)}
                  isFavorite={favorites.has(template.id)}
                  isLast={index === filteredTemplates.length - 1}
                />
              ))}
            </div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-cream-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or category filter</p>
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

const TemplateCard = ({ template, onUse, onToggleFavorite, isFavorite, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Template Preview */}
      <div className="aspect-video bg-gradient-to-br from-primary-50 to-cream-50 p-6 relative overflow-hidden">
        {/* Template Image */}
        <img
          src={getTemplateImage(template.category)}
          alt={template.name}
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Overlay with elements preview */}
        <div className="absolute inset-0 bg-black/20 rounded-lg">
          {template.elements && template.elements.length > 0 && (
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">
              {template.elements.length} items
            </div>
          )}
        </div>
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <button
              onClick={onUse}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              <Play className="h-4 w-4 text-primary-600" />
              <span className="text-primary-600 font-medium">Use Template</span>
            </button>
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all ${
            isFavorite 
              ? 'bg-red-100 text-red-600' 
              : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Template Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm text-gray-600">{template.rating || 4.5}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>{template.downloads || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Grid3X3 className="h-4 w-4" />
              <span>{template.elements?.length || 0} items</span>
            </div>
          </div>
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
            {template.category}
          </span>
        </div>

        <button
          onClick={onUse}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 font-medium"
        >
          Use This Template
        </button>
      </div>
    </motion.div>
  );
};

const TemplateListItem = ({ template, onUse, onToggleFavorite, isFavorite, isLast }) => {
  return (
    <div className={`flex items-center p-6 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Preview */}
      <div className="w-20 h-16 bg-gradient-to-br from-primary-50 to-cream-50 rounded-lg flex-shrink-0 mr-6 relative overflow-hidden">
        {template.elements && template.elements.slice(0, 4).map((element, index) => (
          <div
            key={element.id}
            className="absolute rounded-sm"
            style={{
              left: `${(element.x / 400) * 100}%`,
              top: `${(element.y / 300) * 100}%`,
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={getTemplateImage(item.category)}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ))}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 text-lg">{template.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm text-gray-600">{template.rating || 4.5}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-2 text-sm">{template.description}</p>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span>{template.elements?.length || 0} elements</span>
          <span>{template.downloads || 0} downloads</span>
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
            {template.category}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
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
          onClick={onUse}
          className="px-6 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all font-medium"
        >
          Use Template
        </button>
      </div>
    </div>
  );
};

export default TemplatesPage;