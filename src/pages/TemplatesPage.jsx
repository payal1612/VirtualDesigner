import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';
import { Search, Filter, Grid, List, Star, Eye, Download } from 'lucide-react';

const TemplatesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createDesign } = useDesignStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const templates = [
    {
      id: 1,
      name: 'Modern Living Room',
      category: 'living-room',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 12,
      rating: 4.8,
      downloads: 1250,
      premium: false
    },
    {
      id: 2,
      name: 'Cozy Bedroom',
      category: 'bedroom',
      image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 8,
      rating: 4.6,
      downloads: 980,
      premium: false
    },
    {
      id: 3,
      name: 'Minimalist Kitchen',
      category: 'kitchen',
      image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 15,
      rating: 4.9,
      downloads: 1580,
      premium: true
    },
    {
      id: 4,
      name: 'Home Office',
      category: 'office',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 10,
      rating: 4.7,
      downloads: 750,
      premium: false
    },
    {
      id: 5,
      name: 'Luxury Bathroom',
      category: 'bathroom',
      image: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 6,
      rating: 4.5,
      downloads: 620,
      premium: true
    },
    {
      id: 6,
      name: 'Elegant Dining Room',
      category: 'dining',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400',
      elements: 9,
      rating: 4.8,
      downloads: 890,
      premium: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'living-room', name: 'Living Room', count: templates.filter(t => t.category === 'living-room').length },
    { id: 'bedroom', name: 'Bedroom', count: templates.filter(t => t.category === 'bedroom').length },
    { id: 'kitchen', name: 'Kitchen', count: templates.filter(t => t.category === 'kitchen').length },
    { id: 'office', name: 'Office', count: templates.filter(t => t.category === 'office').length },
    { id: 'bathroom', name: 'Bathroom', count: templates.filter(t => t.category === 'bathroom').length },
    { id: 'dining', name: 'Dining', count: templates.filter(t => t.category === 'dining').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (template) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const newDesign = createDesign({
      name: `${template.name} - Copy`,
      type: template.category,
      templateId: template.id
    });

    navigate(`/create/${newDesign.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Design Templates</h1>
              <p className="mt-2 text-gray-600">Choose from professionally designed templates to start your project</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <span className="text-xs text-gray-400">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-full h-48 object-cover"
                      />
                      {template.premium && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Premium
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                        {template.elements} elements
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{template.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>{template.downloads}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTemplates.map((template) => (
                  <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-6">
                      <img
                        src={template.image}
                        alt={template.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          {template.premium && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Premium
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                          <span>{template.elements} elements</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>{template.downloads}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                          Use Template
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;