import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Eye, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Download,
  Share2,
  Copy,
  Star,
  Clock,
  Layers,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  FolderOpen,
  Archive,
  Tag,
  X,
  CheckSquare,
  Square
} from 'lucide-react';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';

const MyDesignsPage = () => {
  const navigate = useNavigate();
  const { savedDesigns, deleteDesign, loadDesign, duplicateDesign } = useDesignStore();
  const { isAuthenticated } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('updated');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDesigns, setSelectedDesigns] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const filteredDesigns = savedDesigns
    .filter(design => {
      const matchesSearch = design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           design.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || 
                           (filterBy === 'recent' && isRecent(design.updatedAt)) ||
                           (filterBy === 'complex' && design.elements.length > 5) ||
                           (filterBy === 'simple' && design.elements.length <= 5);
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'created':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'elements':
          comparison = a.elements.length - b.elements.length;
          break;
        default: // 'updated'
          comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

  const isRecent = (date) => {
    const now = new Date();
    const designDate = new Date(date);
    const diffTime = Math.abs(now - designDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const handleDelete = (designId) => {
    if (window.confirm('Are you sure you want to delete this design?')) {
      deleteDesign(designId);
      setSelectedDesigns(prev => {
        const newSet = new Set(prev);
        newSet.delete(designId);
        return newSet;
      });
      showNotification('Design deleted successfully', 'success');
    }
  };

  const handleBulkDelete = () => {
    if (selectedDesigns.size === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedDesigns.size} design(s)?`)) {
      selectedDesigns.forEach(designId => deleteDesign(designId));
      setSelectedDesigns(new Set());
      showNotification(`${selectedDesigns.size} designs deleted`, 'success');
    }
  };

  const handleSelectDesign = (designId) => {
    setSelectedDesigns(prev => {
      const newSet = new Set(prev);
      if (newSet.has(designId)) {
        newSet.delete(designId);
      } else {
        newSet.add(designId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selectedDesigns.size === filteredDesigns.length) {
      setSelectedDesigns(new Set());
    } else {
      setSelectedDesigns(new Set(filteredDesigns.map(d => d.id)));
    }
  };

  const handleDuplicate = (design) => {
    const newDesign = duplicateDesign(design);
    showNotification(`"${design.name}" duplicated successfully`, 'success');
  };

  const exportDesign = async (design) => {
    try {
      const dataStr = JSON.stringify(design, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${design.name}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotification('Design exported successfully', 'success');
    } catch (error) {
      showNotification('Export failed. Please try again.', 'error');
    }
  };

  const shareDesign = async (design) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: design.name,
          text: `Check out my design "${design.name}" created with ShineSpace!`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Link copied to clipboard!', 'info');
    }
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
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Close bulk actions when no designs are selected
  useEffect(() => {
    if (selectedDesigns.size === 0) {
      setShowBulkActions(false);
    } else {
      setShowBulkActions(true);
    }
  }, [selectedDesigns.size]);

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Designs</h1>
            <p className="text-gray-600">
              {filteredDesigns.length} of {savedDesigns.length} design{savedDesigns.length !== 1 ? 's' : ''}
              {selectedDesigns.size > 0 && ` • ${selectedDesigns.size} selected`}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Link
              to="/create"
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              <span>New Design</span>
            </Link>
          </div>
        </motion.div>

        {/* Bulk Actions Bar */}
        <AnimatePresence>
          {showBulkActions && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-primary-600 text-white rounded-lg p-4 mb-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <span className="font-medium">{selectedDesigns.size} design{selectedDesigns.size !== 1 ? 's' : ''} selected</span>
                <button
                  onClick={() => setSelectedDesigns(new Set())}
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleBulkDelete}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Selected</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search designs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center space-x-2 px-4 py-3 border rounded-lg transition-colors ${
                    showFilters ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Filter className="h-5 w-5" />
                  <span>Filter</span>
                </button>
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="updated">Last Updated</option>
                  <option value="created">Date Created</option>
                  <option value="name">Name</option>
                  <option value="elements">Complexity</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
                </button>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Select All */}
              {filteredDesigns.length > 0 && (
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 px-3 py-3 text-sm text-primary-600 hover:text-primary-700 font-medium border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  {selectedDesigns.size === filteredDesigns.length ? (
                    <CheckSquare className="h-4 w-4" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                  <span>{selectedDesigns.size === filteredDesigns.length ? 'Deselect All' : 'Select All'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: 'all', label: 'All Designs', icon: FolderOpen },
                    { id: 'recent', label: 'Recent (7 days)', icon: Clock },
                    { id: 'complex', label: 'Complex (5+ elements)', icon: Layers },
                    { id: 'simple', label: 'Simple (≤5 elements)', icon: Tag }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setFilterBy(filter.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                        filterBy === filter.id
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <filter.icon className="h-4 w-4" />
                      <span className="text-sm">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Designs Display */}
        {filteredDesigns.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design, index) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onExport={exportDesign}
                  onShare={shareDesign}
                  isSelected={selectedDesigns.has(design.id)}
                  onSelect={() => handleSelectDesign(design.id)}
                  delay={index * 0.1}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {filteredDesigns.map((design, index) => (
                <DesignListItem
                  key={design.id}
                  design={design}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onExport={exportDesign}
                  onShare={shareDesign}
                  isSelected={selectedDesigns.has(design.id)}
                  onSelect={() => handleSelectDesign(design.id)}
                  isLast={index === filteredDesigns.length - 1}
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
              {searchTerm || filterBy !== 'all' ? (
                <Search className="h-12 w-12 text-primary-500" />
              ) : (
                <Plus className="h-12 w-12 text-primary-500" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || filterBy !== 'all' ? 'No designs found' : 'No designs yet'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              {searchTerm || filterBy !== 'all'
                ? 'Try adjusting your search terms or filters'
                : 'Start creating your first design and bring your ideas to life'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
              >
                <Plus className="h-5 w-5" />
                <span>Create Your First Design</span>
              </Link>
              {(searchTerm || filterBy !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBy('all');
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <X className="h-5 w-5" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DesignCard = ({ design, onDelete, onDuplicate, onExport, onShare, isSelected, onSelect, delay }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`group bg-white rounded-2xl shadow-lg border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 ${
        isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-100'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isSelected 
              ? 'bg-primary-600 border-primary-600 text-white' 
              : 'border-white bg-white/80 hover:bg-white'
          }`}
        >
          {isSelected && <CheckSquare className="h-3 w-3" />}
        </button>
      </div>

      {/* Design Preview */}
      <div className="aspect-video bg-gradient-to-br from-primary-50 to-cream-50 p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        {design.elements.length > 0 ? (
          <div className="relative h-full">
            {design.elements.slice(0, 8).map((element, index) => (
              <div
                key={element.id}
                className="absolute rounded-lg shadow-sm"
                style={{
                  left: `${Math.min(Math.max((element.x / 400) * 100, 0), 85)}%`,
                  top: `${Math.min(Math.max((element.y / 300) * 100, 0), 85)}%`,
                  width: `${Math.min((element.width / 400) * 100, 20)}%`,
                  height: `${Math.min((element.height / 300) * 100, 20)}%`,
                  backgroundColor: element.color,
                  opacity: 0.8,
                  transform: `rotate(${element.rotation}deg)`,
                  zIndex: index
                }}
              />
            ))}
            {design.elements.length > 8 && (
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm text-primary-700 text-xs font-semibold px-2 py-1 rounded-full">
                +{design.elements.length - 8} more
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Layers className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500">Empty design</p>
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Link
              to={`/create?design=${design.id}`}
              className="p-2 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Edit className="h-4 w-4 text-gray-700" />
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(design);
              }}
              className="p-2 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Copy className="h-4 w-4 text-blue-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(design);
              }}
              className="p-2 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Share2 className="h-4 w-4 text-green-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(design.id);
              }}
              className="p-2 bg-white rounded-lg shadow-lg hover:scale-110 transition-transform"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Design Info */}
      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2 truncate">{design.name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Clock className="h-4 w-4 mr-1" />
          <span>Updated {design.updatedAt.toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
              {design.elements.length} elements
            </span>
            {isRecent(design.updatedAt) && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Recent
              </span>
            )}
          </div>
          <Link
            to={`/create?design=${design.id}`}
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1 transition-colors"
          >
            <span>Edit</span>
            <Edit className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const DesignListItem = ({ design, onDelete, onDuplicate, onExport, onShare, isSelected, onSelect, isLast }) => {
  return (
    <div className={`flex items-center p-6 hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Selection */}
      <button
        onClick={onSelect}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-4 transition-colors ${
          isSelected 
            ? 'bg-primary-600 border-primary-600 text-white' 
            : 'border-gray-300 hover:border-primary-500'
        }`}
      >
        {isSelected && <CheckSquare className="h-3 w-3" />}
      </button>

      {/* Preview */}
      <div className="w-16 h-12 bg-gradient-to-br from-primary-50 to-cream-50 rounded-lg flex-shrink-0 mr-4 relative overflow-hidden">
        {design.elements.slice(0, 4).map((element, index) => (
          <div
            key={element.id}
            className="absolute rounded-sm"
            style={{
              left: `${(element.x / 400) * 100}%`,
              top: `${(element.y / 300) * 100}%`,
              width: `${Math.min((element.width / 400) * 100, 30)}%`,
              height: `${Math.min((element.height / 300) * 100, 30)}%`,
              backgroundColor: element.color,
              opacity: 0.7
            }}
          />
        ))}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{design.name}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
          <span>{design.elements.length} elements</span>
          <span>Updated {design.updatedAt.toLocaleDateString()}</span>
          <span>Created {design.createdAt.toLocaleDateString()}</span>
          {isRecent(design.updatedAt) && (
            <span className="text-green-600 font-medium">Recent</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Link
          to={`/create?design=${design.id}`}
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button
          onClick={() => onDuplicate(design)}
          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Copy className="h-4 w-4" />
        </button>
        <button
          onClick={() => onExport(design)}
          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <Download className="h-4 w-4" />
        </button>
        <button
          onClick={() => onShare(design)}
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Share2 className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(design.id)}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default MyDesignsPage;