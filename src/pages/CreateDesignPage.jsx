import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCw, FlipHorizontal, FlipVertical, Square, Circle, Triangle, Hexagon, Pentagon, CreditCard as Edit, Home, ChefHat, Bed, Monitor, Bath, Baby, Shuffle, Check, Ruler, Grid3x3 as Grid3X3, Plus, Save, Eye, Layers, Camera, Download, Share2, Settings, Palette, Move, RotateCcw, ZoomIn, ZoomOut, Sofa, TreePine, Lightbulb, Package, CircleDot as DragHandleDots2, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';
import Canvas2D from '../components/design/Canvas2D';
import Canvas3D from '../components/design/Canvas3D';
import FurnitureLibrary from '../components/design/FurnitureLibrary';
import html2canvas from 'html2canvas';

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
    roomStyle: 'modern1',
    rotation: 0,
    flipH: false,
    flipV: false
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

  // Drag and drop components for Step 3
  const dragDropComponents = [
    {
      id: 'sofa',
      name: 'Sofa',
      icon: Sofa,
      type: 'furniture',
      width: 120,
      height: 60,
      color: '#A7727D',
      category: 'seating'
    },
    {
      id: 'chair',
      name: 'Chair',
      icon: Sofa,
      type: 'furniture',
      width: 50,
      height: 50,
      color: '#EDDBC7',
      category: 'seating'
    },
    {
      id: 'table',
      name: 'Table',
      icon: Square,
      type: 'furniture',
      width: 80,
      height: 80,
      color: '#F8EAD8',
      category: 'tables'
    },
    {
      id: 'bed',
      name: 'Bed',
      icon: Bed,
      type: 'bed',
      width: 140,
      height: 200,
      color: '#A7727D',
      category: 'bedroom'
    },
    {
      id: 'desk',
      name: 'Desk',
      icon: Monitor,
      type: 'desk',
      width: 120,
      height: 60,
      color: '#EDDBC7',
      category: 'office'
    },
    {
      id: 'plant',
      name: 'Plant',
      icon: TreePine,
      type: 'plant',
      width: 30,
      height: 30,
      color: '#16A34A',
      category: 'decor'
    },
    {
      id: 'light',
      name: 'Light',
      icon: Lightbulb,
      type: 'light',
      width: 25,
      height: 25,
      color: '#F59E0B',
      category: 'lighting'
    },
    {
      id: 'cabinet',
      name: 'Cabinet',
      icon: Package,
      type: 'furniture',
      width: 80,
      height: 40,
      color: '#F8EAD8',
      category: 'storage'
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

  // Step 1 transform functions
  const handleRotate = () => {
    updateWizardData('rotation', (wizardData.rotation + 90) % 360);
  };

  const handleFlipH = () => {
    updateWizardData('flipH', !wizardData.flipH);
  };

  const handleFlipV = () => {
    updateWizardData('flipV', !wizardData.flipV);
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

  // Download 3D preview
  const handleDownload3DPreview = async () => {
    try {
      const previewElement = document.getElementById('room-preview-3d');
      if (previewElement) {
        const canvas = await html2canvas(previewElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true
        });
        
        const link = document.createElement('a');
        link.download = `room-preview-${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        showNotification('3D preview downloaded successfully!', 'success');
      }
    } catch (error) {
      showNotification('Failed to download preview', 'error');
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
                onRotate={handleRotate}
                onFlipH={handleFlipH}
                onFlipV={handleFlipV}
              />}
              {currentStep === 2 && <Step2Content 
                wizardData={wizardData} 
                updateWizardData={updateWizardData}
              />}
              {currentStep === 3 && <Step3Content 
                wizardData={wizardData} 
                updateWizardData={updateWizardData}
                roomTypes={roomTypes}
                dragDropComponents={dragDropComponents}
                onAddComponent={handleAddElement}
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
              onDownload3D={handleDownload3DPreview}
             roomTypes={roomTypes}
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

// Step 1: Room Shape Selection with Transform Features
const Step1Content = ({ wizardData, updateWizardData, roomShapes, onRotate, onFlipH, onFlipV }) => (
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

    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Transform Room</h3>
      
      {/* Transform Controls */}
      <div className="grid grid-cols-3 gap-4">
        <button 
          onClick={onRotate}
          className="flex flex-col items-center space-y-2 p-4 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors"
        >
          <RotateCw className="h-6 w-6" />
          <span className="text-sm font-medium">Rotate</span>
          <span className="text-xs text-primary-600">{wizardData.rotation}°</span>
        </button>
        
        <button 
          onClick={onFlipH}
          className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${
            wizardData.flipH 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FlipHorizontal className="h-6 w-6" />
          <span className="text-sm font-medium">Flip H</span>
          <span className="text-xs">{wizardData.flipH ? 'ON' : 'OFF'}</span>
        </button>
        
        <button 
          onClick={onFlipV}
          className={`flex flex-col items-center space-y-2 p-4 rounded-lg transition-colors ${
            wizardData.flipV 
              ? 'bg-primary-100 text-primary-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FlipVertical className="h-6 w-6" />
          <span className="text-sm font-medium">Flip V</span>
          <span className="text-xs">{wizardData.flipV ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Room Properties */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Room Properties</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Shape:</span>
            <span className="font-medium text-gray-900 capitalize">{wizardData.roomShape}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rotation:</span>
            <span className="font-medium text-gray-900">{wizardData.rotation}°</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Flipped:</span>
            <span className="font-medium text-gray-900">
              {wizardData.flipH || wizardData.flipV ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
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
    
    <div className="space-y-6">
      <div>
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
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>2m</span>
          <span>10m</span>
        </div>
      </div>

      <div>
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
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>2m</span>
          <span>10m</span>
        </div>
      </div>

      {/* Units Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurement Units</h3>
        <div className="flex space-x-3">
          <button
            onClick={() => updateWizardData('unit', 'cm')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              wizardData.unit === 'cm'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Centimeters
          </button>
          <button
            onClick={() => updateWizardData('unit', 'inch')}
            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
              wizardData.unit === 'inch'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inches
          </button>
        </div>
      </div>

      {/* Room Area Display */}
      <div className="bg-primary-50 rounded-lg p-4">
        <h4 className="font-medium text-primary-900 mb-2">Room Area</h4>
        <div className="text-2xl font-bold text-primary-700">
          {((wizardData.roomWidth / 100) * (wizardData.roomHeight / 100)).toFixed(2)} m²
        </div>
        <div className="text-sm text-primary-600">
          {wizardData.roomWidth / 100}m × {wizardData.roomHeight / 100}m
        </div>
      </div>
    </div>
  </motion.div>
);

// Step 3: Room Type and Drag-Drop Components
const Step3Content = ({ wizardData, updateWizardData, roomTypes, dragDropComponents, onAddComponent }) => {
  const [draggedComponent, setDraggedComponent] = useState(null);

  const handleDragStart = (e, component) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedComponent(null);
  };

  const handleComponentClick = (component) => {
    const newElement = {
      ...component,
      id: `element_${Date.now()}`,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      rotation: 0,
      opacity: 1,
      locked: false,
      name: component.name
    };
    onAddComponent(newElement);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-full"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select room type and add components</h2>
      
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

      {/* Drag and Drop Components */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Furniture Components</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <DragHandleDots2 className="h-4 w-4" />
            <span>Drag or click to add</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
          {dragDropComponents.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              onDragEnd={handleDragEnd}
              onClick={() => handleComponentClick(component)}
              className={`relative p-4 rounded-lg border-2 border-dashed cursor-move transition-all hover:scale-105 hover:shadow-lg ${
                draggedComponent?.id === component.id
                  ? 'border-primary-500 bg-primary-50 opacity-50'
                  : 'border-gray-300 hover:border-primary-400 bg-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: component.color + '20' }}
                >
                  <component.icon 
                    className="h-6 w-6" 
                    style={{ color: component.color }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900">{component.name}</span>
                <span className="text-xs text-gray-500 capitalize">{component.category}</span>
              </div>
              
              {/* Size indicator */}
              <div className="absolute top-2 right-2 text-xs text-gray-400">
                {component.width}×{component.height}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            💡 <strong>Tip:</strong> Drag components to the preview area or click to add them to your design. 
            You can customize their position and properties later in the design canvas.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Room Preview Component with 3D Download
const RoomPreview = ({ wizardData, currentStep, calculateArea, onDownload3D, roomTypes }) => {
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Room Preview</h3>
        {currentStep === 3 && (
          <button
            onClick={onDownload3D}
            className="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </button>
        )}
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-xl relative overflow-hidden" id="room-preview-3d">
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
            className="relative bg-gradient-to-br from-beige-100 to-beige-200 border-4 border-gray-300 transition-all duration-500"
            style={{
              width: `${roomWidthPx}px`,
              height: `${roomHeightPx}px`,
              borderRadius: wizardData.roomShape === 'circle' ? '50%' : '8px',
              transform: `rotate(${wizardData.rotation}deg) scaleX(${wizardData.flipH ? -1 : 1}) scaleY(${wizardData.flipV ? -1 : 1})`
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
                  className="absolute top-0 left-0 right-0 h-2 transition-colors duration-300"
                  style={{ backgroundColor: wallColors.top }}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2 transition-colors duration-300"
                  style={{ backgroundColor: wallColors.bottom }}
                />
                <div 
                  className="absolute top-0 bottom-0 left-0 w-2 transition-colors duration-300"
                  style={{ backgroundColor: wallColors.left }}
                />
                <div 
                  className="absolute top-0 bottom-0 right-0 w-2 transition-colors duration-300"
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
                <div className="text-sm font-semibold text-gray-900">
                  {roomTypes.find(t => t.id === wizardData.roomType)?.name || 'Room'}
                </div>
                <div className="text-xs text-gray-600">({calculateArea()} m²)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: 3D Preview with Enhanced Features */}
      {currentStep === 3 && (
        <div className="mt-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 relative overflow-hidden">
            <div className="text-white">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">3D Room Preview</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Ready</span>
                </div>
              </div>
              
              <div className="w-full h-32 bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg flex items-center justify-center relative mb-4">
                <div className="text-center">
                  <Grid3X3 className="h-8 w-8 mx-auto mb-2 opacity-75" />
                  <p className="text-sm opacity-75">3D Rendering Ready</p>
                </div>
                
                {/* Floating elements animation */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-primary-400 rounded-full animate-bounce"></div>
                <div className="absolute top-6 right-6 w-2 h-2 bg-cream-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-beige-400 rounded-full animate-ping"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-primary-400 font-semibold">Lighting</div>
                  <div className="opacity-75">Dynamic</div>
                </div>
                <div className="text-center">
                  <div className="text-cream-400 font-semibold">Shadows</div>
                  <div className="opacity-75">Enabled</div>
                </div>
                <div className="text-center">
                  <div className="text-beige-400 font-semibold">Quality</div>
                  <div className="opacity-75">High</div>
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