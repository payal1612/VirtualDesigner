import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  FlipHorizontal, 
  FlipVertical,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Pentagon,
  Edit,
  Home,
  ChefHat,
  Bed,
  Monitor,
  Bath,
  Baby,
  Shuffle,
  Check,
  Ruler,
  Grid3X3,
  Plus,
  Save,
  Eye,
  Layers,
  Camera,
  Download,
  Share2,
  Settings,
  Palette,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';
import Canvas2D from '../components/design/Canvas2D';
import Canvas3D from '../components/design/Canvas3D';
import FurnitureLibrary from '../components/design/FurnitureLibrary';

const CreateDesignPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { 
    currentDesign, 
    selectedElement,
    createNewDesign, 
    loadDesign, 
    savedDesigns,
    addElement,
    updateElement,
    deleteElement,
    selectElement,
    saveCurrentDesign,
    setViewMode,
    viewMode
  } = useDesignStore();
  const { isAuthenticated } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showFurnitureLibrary, setShowFurnitureLibrary] = useState(false);
  const [wizardData, setWizardData] = useState({
    roomShape: 'square',
    roomWidth: 500,
    roomHeight: 500,
    unit: 'cm',
    roomType: 'bedroom',
    roomStyle: 'modern1'
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Please sign in to start designing';
      document.body.appendChild(notification);
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 3000);
      navigate('/', { replace: true });
      return;
    }

    // Check if loading existing design
    const designId = searchParams.get('design');
    if (designId) {
      const existingDesign = savedDesigns.find(d => d.id === designId);
      if (existingDesign) {
        loadDesign(existingDesign);
        setCurrentStep(4); // Skip wizard and go to canvas
      }
    }
  }, [isAuthenticated, navigate, searchParams, savedDesigns, loadDesign]);

  const roomShapes = [
    { id: 'square', name: 'Square', icon: Square },
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'triangle', name: 'Triangle', icon: Triangle },
    { id: 'hexagon', name: 'Hexagon', icon: Hexagon },
    { id: 'custom', name: 'Custom', icon: Edit }
  ];

  const roomTypes = [
    { id: 'living', name: 'Living Room', icon: Home },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'office', name: 'Office', icon: Monitor },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'child', name: 'Child Room', icon: Baby }
  ];

  const roomStyles = [
    {
      id: 'modern1',
      name: 'Modern',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Clean lines and minimalist design'
    },
    {
      id: 'classic1',
      name: 'Classic',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Traditional and elegant styling'
    },
    {
      id: 'scandinavian1',
      name: 'Scandinavian',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Light woods and cozy textures'
    },
    {
      id: 'industrial1',
      name: 'Industrial',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Raw materials and urban feel'
    },
    {
      id: 'bohemian1',
      name: 'Bohemian',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Eclectic and artistic vibe'
    },
    {
      id: 'minimalist1',
      name: 'Minimalist',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Simple and uncluttered'
    }
  ];

  const calculateArea = () => {
    const widthM = wizardData.roomWidth / 100;
    const heightM = wizardData.roomHeight / 100;
    return (widthM * heightM).toFixed(2);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Create design and navigate to canvas
      const designName = `${roomTypes.find(t => t.id === wizardData.roomType)?.name || 'Room'} Design`;
      createNewDesign(designName);
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const updateWizardData = (key, value) => {
    setWizardData(prev => ({ ...prev, [key]: value }));
  };

  const shuffleStyle = () => {
    const currentIndex = roomStyles.findIndex(style => style.id === wizardData.roomStyle);
    const nextIndex = (currentIndex + 1) % roomStyles.length;
    updateWizardData('roomStyle', roomStyles[nextIndex].id);
  };

  // Handle element operations
  const handleAddElement = (element) => {
    addElement(element);
    setShowFurnitureLibrary(false);
  };

  const handleElementSelect = (elementId) => {
    selectElement(elementId);
  };

  const handleElementUpdate = (elementId, updates) => {
    updateElement(elementId, updates);
  };

  const handleElementDelete = (elementId) => {
    deleteElement(elementId);
  };

  const handleElementDuplicate = (element) => {
    const duplicatedElement = {
      ...element,
      id: `element_${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
      name: `${element.name} Copy`
    };
    addElement(duplicatedElement);
  };

  const handleSaveDesign = () => {
    const savedDesign = saveCurrentDesign();
    if (savedDesign) {
      showNotification('Design saved successfully!', 'success');
    }
  };

  const handleToggleView = () => {
    const newViewMode = viewMode === '2d' ? '3d' : '2d';
    setViewMode(newViewMode);
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
    return null;
  }

  // Render Design Canvas
  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Canvas Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {currentDesign?.name || 'New Design'}
                </h1>
                <p className="text-sm text-gray-600">
                  {currentDesign?.elements?.length || 0} elements • {viewMode.toUpperCase()} View
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('2d')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === '2d' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === '3d' 
                      ? 'bg-white text-primary-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  3D
                </button>
              </div>

              {/* Add Furniture */}
              <button
                onClick={() => setShowFurnitureLibrary(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add Furniture</span>
              </button>

              {/* Save Design */}
              <button
                onClick={handleSaveDesign}
                className="flex items-center space-x-2 px-4 py-2 bg-cream-600 text-white rounded-lg hover:bg-cream-700 transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Element Properties */}
          {selectedElement && (
            <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
              <ElementProperties
                element={selectedElement}
                onUpdate={handleElementUpdate}
                onDelete={() => handleElementDelete(selectedElement.id)}
                onDuplicate={() => handleElementDuplicate(selectedElement)}
              />
            </div>
          )}

          {/* Main Canvas */}
          <div className="flex-1 relative">
            {viewMode === '2d' ? (
              <Canvas2D
                design={currentDesign}
                selectedElement={selectedElement}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onElementDelete={handleElementDelete}
                onElementDuplicate={handleElementDuplicate}
                onAddElement={handleAddElement}
                gridEnabled={true}
                snapToGrid={true}
                viewMode={viewMode}
                onToggleView={handleToggleView}
              />
            ) : (
              <Canvas3D
                design={currentDesign}
                selectedElement={selectedElement}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                viewMode={viewMode}
                onToggleView={handleToggleView}
              />
            )}
          </div>

          {/* Right Sidebar - Tools */}
          <div className="w-64 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <DesignTools
              onAddFurniture={() => setShowFurnitureLibrary(true)}
              onSave={handleSaveDesign}
              currentDesign={currentDesign}
            />
          </div>
        </div>

        {/* Furniture Library Modal */}
        <FurnitureLibrary
          isOpen={showFurnitureLibrary}
          onClose={() => setShowFurnitureLibrary(false)}
          onAddElement={handleAddElement}
        />
      </div>
    );
  }

  // Wizard Steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-lightest-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Design</h1>
          <p className="text-gray-600">Design your perfect room in 3 easy steps</p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Controls */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          >
            <AnimatePresence mode="wait">
              {currentStep === 1 && <Step1Content 
                wizardData={wizardData} 
                updateWizardData={updateWizardData}
                roomShapes={roomShapes}
              />}
              {currentStep === 2 && <Step2Content 
                wizardData={wizardData} 
                updateWizardData={updateWizardData}
              />}
              {currentStep === 3 && <Step3Content 
                wizardData={wizardData} 
                updateWizardData={updateWizardData}
                roomTypes={roomTypes}
                roomStyles={roomStyles}
                onShuffle={shuffleStyle}
              />}
            </AnimatePresence>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
          >
            <RoomPreview 
              wizardData={wizardData} 
              currentStep={currentStep}
              calculateArea={calculateArea}
             roomStyles={roomStyles}
            />
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              {currentStep === 3 ? 'Last Step' : `Step ${currentStep} of 3`}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
          >
            <span>{currentStep === 3 ? 'Create Design' : 'Next Step'}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 1: Room Shape Selection
const Step1Content = ({ wizardData, updateWizardData, roomShapes }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose room shape</h2>
    
    <div className="grid grid-cols-3 gap-4 mb-8">
      {roomShapes.map((shape) => (
        <button
          key={shape.id}
          onClick={() => updateWizardData('roomShape', shape.id)}
          className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
            wizardData.roomShape === shape.id
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <shape.icon className={`h-8 w-8 mx-auto mb-2 ${
            wizardData.roomShape === shape.id ? 'text-primary-600' : 'text-gray-600'
          }`} />
          <span className="text-sm font-medium text-gray-700">{shape.name}</span>
        </button>
      ))}
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Transform</h3>
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <RotateCw className="h-4 w-4" />
          <span>Rotate</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <FlipHorizontal className="h-4 w-4" />
          <span>Flip H</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <FlipVertical className="h-4 w-4" />
          <span>Flip V</span>
        </button>
      </div>
    </div>
  </motion.div>
);

// Step 2: Room Dimensions
const Step2Content = ({ wizardData, updateWizardData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add room dimensions</h2>
    
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Width: {wizardData.roomWidth} {wizardData.unit}
      </label>
      <input
        type="range"
        min="200"
        max="1000"
        value={wizardData.roomWidth}
        onChange={(e) => updateWizardData('roomWidth', parseInt(e.target.value))}
        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer slider-blue"
      />
    </div>

    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Height: {wizardData.roomHeight} {wizardData.unit}
      </label>
      <input
        type="range"
        min="200"
        max="1000"
        value={wizardData.roomHeight}
        onChange={(e) => updateWizardData('roomHeight', parseInt(e.target.value))}
        className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider-orange"
      />
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Units</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => updateWizardData('unit', 'cm')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            wizardData.unit === 'cm'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Cm
        </button>
        <button
          onClick={() => updateWizardData('unit', 'inch')}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            wizardData.unit === 'inch'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Inch
        </button>
      </div>
    </div>
  </motion.div>
);

// Step 3: Room Type and Style - FIXED
const Step3Content = ({ wizardData, updateWizardData, roomTypes, roomStyles, onShuffle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="h-full"
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select room type and style</h2>
    
    {/* Room Type Selection */}
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Type</h3>
      <div className="grid grid-cols-2 gap-3">
        {roomTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateWizardData('roomType', type.id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
              wizardData.roomType === type.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <type.icon className="h-5 w-5" />
            <span className="font-medium text-sm">{type.name}</span>
            {wizardData.roomType === type.id && (
              <Check className="h-4 w-4 ml-auto text-primary-600" />
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Style Selection */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Style</h3>
        <button
          onClick={onShuffle}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Shuffle className="h-4 w-4" />
          <span className="text-sm">Shuffle</span>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
        {roomStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => updateWizardData('roomStyle', style.id)}
            className={`relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
              wizardData.roomStyle === style.id
                ? 'border-primary-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={style.thumbnail}
              alt={style.name}
              className="w-full h-24 object-cover"
            />
            <div className="p-3">
              <h4 className="font-medium text-gray-900 text-sm">{style.name}</h4>
              <p className="text-xs text-gray-600">{style.description}</p>
            </div>
            {wizardData.roomStyle === style.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  </motion.div>
);

// Room Preview Component
const RoomPreview = ({ wizardData, currentStep, calculateArea, roomStyles }) => {
  const getWallColors = () => {
    if (currentStep === 2) {
      return {
        top: '#F97316',
        bottom: '#F97316',
        left: '#3B82F6',
        right: '#3B82F6'
      };
    }
    return {
      top: '#E5E7EB',
      bottom: '#E5E7EB',
      left: '#E5E7EB',
      right: '#E5E7EB'
    };
  };

  const wallColors = getWallColors();
  const roomWidthPx = Math.min(wizardData.roomWidth / 2, 300);
  const roomHeightPx = Math.min(wizardData.roomHeight / 2, 300);

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Room Preview</h3>
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9CA3AF" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative">
          {/* Dimension Labels */}
          <div className="absolute -top-8 left-0 right-0 text-center">
            <span className="text-sm font-medium text-gray-600">
              {(wizardData.roomWidth / 100).toFixed(1)}m
            </span>
          </div>
          <div className="absolute top-0 bottom-0 -left-8 flex items-center">
            <span className="text-sm font-medium text-gray-600 transform -rotate-90">
              {(wizardData.roomHeight / 100).toFixed(1)}m
            </span>
          </div>

          {/* Room Shape */}
          <div 
            className="relative bg-gradient-to-br from-beige-100 to-beige-200 border-4 border-gray-300"
            style={{
              width: `${roomWidthPx}px`,
              height: `${roomHeightPx}px`,
              borderRadius: wizardData.roomShape === 'circle' ? '50%' : '8px'
            }}
          >
            {/* Floor Texture */}
            <div 
              className="absolute inset-1 opacity-30"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  #D2691E 0px,
                  #D2691E 4px,
                  #CD853F 4px,
                  #CD853F 8px
                )`,
                borderRadius: wizardData.roomShape === 'circle' ? '50%' : '4px'
              }}
            />

            {/* Walls with Step 2 Colors */}
            {currentStep >= 2 && (
              <>
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: wallColors.top }}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{ backgroundColor: wallColors.bottom }}
                />
                <div 
                  className="absolute top-0 bottom-0 left-0 w-2"
                  style={{ backgroundColor: wallColors.left }}
                />
                <div 
                  className="absolute top-0 bottom-0 right-0 w-2"
                  style={{ backgroundColor: wallColors.right }}
                />
              </>
            )}

            {/* Door */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1">
              <div className="w-8 h-2 bg-amber-800 rounded-t-lg relative">
                <div className="absolute -top-1 left-1 w-6 h-1 bg-amber-600 rounded transform rotate-12 origin-left"></div>
              </div>
            </div>

            {/* Room Area Label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2">
                <div className="text-sm font-semibold text-gray-900">Room</div>
                <div className="text-xs text-gray-600">({calculateArea()} m²)</div>
              </div>
            </div>

            {/* Step 3: Style Preview */}
            {currentStep === 3 && (
              <div className="absolute inset-4 rounded-lg overflow-hidden">
                <img
                  src={roomStyles.find(s => s.id === wizardData.roomStyle)?.thumbnail}
                  alt="Room Style"
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step 3: 3D Preview */}
      {currentStep === 3 && (
        <div className="mt-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 relative overflow-hidden">
            <div className="text-white text-center">
              <h4 className="font-semibold mb-2">3D Room Preview</h4>
              <div className="w-full h-32 bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <Grid3X3 className="h-8 w-8 mx-auto mb-2 opacity-75" />
                  <p className="text-sm opacity-75">3D Rendering Ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Element Properties Panel
const ElementProperties = ({ element, onUpdate, onDelete, onDuplicate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Element Properties</h3>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={element.name}
              onChange={(e) => onUpdate(element.id, { name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Position */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X Position</label>
              <input
                type="number"
                value={Math.round(element.x)}
                onChange={(e) => onUpdate(element.id, { x: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y Position</label>
              <input
                type="number"
                value={Math.round(element.y)}
                onChange={(e) => onUpdate(element.id, { y: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Size */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="number"
                value={Math.round(element.width)}
                onChange={(e) => onUpdate(element.id, { width: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="number"
                value={Math.round(element.height)}
                onChange={(e) => onUpdate(element.id, { height: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              type="color"
              value={element.color}
              onChange={(e) => onUpdate(element.id, { color: e.target.value })}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          {/* Rotation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation: {element.rotation || 0}°
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={element.rotation || 0}
              onChange={(e) => onUpdate(element.id, { rotation: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Opacity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opacity: {Math.round((element.opacity || 1) * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={element.opacity || 1}
              onChange={(e) => onUpdate(element.id, { opacity: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={onDuplicate}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Duplicate</span>
        </button>
        <button
          onClick={onDelete}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <X className="h-4 w-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

// Design Tools Panel
const DesignTools = ({ onAddFurniture, onSave, currentDesign }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Design Tools</h3>
        
        <div className="space-y-3">
          <button
            onClick={onAddFurniture}
            className="w-full flex items-center space-x-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Furniture</span>
          </button>

          <button
            onClick={onSave}
            className="w-full flex items-center space-x-2 px-4 py-3 bg-cream-600 text-white rounded-lg hover:bg-cream-700 transition-colors"
          >
            <Save className="h-5 w-5" />
            <span>Save Design</span>
          </button>
        </div>
      </div>

      {/* Design Info */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Design Info</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Elements:</span>
            <span>{currentDesign?.elements?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Last saved:</span>
            <span>{currentDesign?.updatedAt ? new Date(currentDesign.updatedAt).toLocaleTimeString() : 'Never'}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4 mx-auto" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="h-4 w-4 mx-auto" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Camera className="h-4 w-4 mx-auto" />
          </button>
          <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Settings className="h-4 w-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignPage;