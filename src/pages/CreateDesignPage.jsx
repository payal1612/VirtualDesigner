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
  Grid3X3
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDesignStore } from '../stores/designStore';
import { useAuthStore } from '../stores/authStore';

const CreateDesignPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createNewDesign, loadDesign, savedDesigns } = useDesignStore();
  const { isAuthenticated } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState(1);
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
      navigate('/');
      return;
    }

    // Check if loading existing design
    const designId = searchParams.get('design');
    if (designId) {
      const existingDesign = savedDesigns.find(d => d.id === designId);
      if (existingDesign) {
        loadDesign(existingDesign);
        // Skip wizard and go directly to design canvas
        setCurrentStep(4);
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
      name: 'Modern 1',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Clean lines and minimalist design'
    },
    {
      id: 'classic1',
      name: 'Classic 1',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Traditional and elegant styling'
    },
    {
      id: 'scandinavian1',
      name: 'Scandinavian 1',
      thumbnail: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Light woods and cozy textures'
    },
    {
      id: 'industrial1',
      name: 'Industrial 1',
      thumbnail: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Raw materials and urban feel'
    },
    {
      id: 'bohemian1',
      name: 'Bohemian 1',
      thumbnail: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Eclectic and artistic vibe'
    },
    {
      id: 'minimalist1',
      name: 'Minimalist 1',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Simple and uncluttered'
    }
  ];

  const calculateArea = () => {
    const widthM = wizardData.roomWidth / 100;
    const heightM = wizardData.roomHeight / 100;
    return (widthM * heightM).toFixed(3);
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

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  if (currentStep === 4) {
    return <DesignCanvas />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lightest-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Wizard - Planner 5D</h1>
          <p className="text-gray-600">Create your perfect room in 3 easy steps</p>
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
    
    {/* Shape Selection Grid */}
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

    {/* Transform Options */}
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Transform</h3>
      <div className="flex space-x-4">
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <RotateCw className="h-4 w-4" />
          <span>Rotate</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <FlipHorizontal className="h-4 w-4" />
          <span>Flip Horizontal</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <FlipVertical className="h-4 w-4" />
          <span>Flip Vertical</span>
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
    
    {/* Width Slider */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Width: {wizardData.roomWidth.toFixed(2)} {wizardData.unit}
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

    {/* Height Slider */}
    <div className="mb-8">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Height: {wizardData.roomHeight.toFixed(2)} {wizardData.unit}
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

    {/* Unit Toggle */}
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

// Step 3: Room Type and Style
const Step3Content = ({ wizardData, updateWizardData, roomTypes, roomStyles, onShuffle }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Select room type and style</h2>
    
    {/* Room Type Selection */}
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Type</h3>
      <div className="space-y-2">
        {roomTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => updateWizardData('roomType', type.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all ${
              wizardData.roomType === type.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <type.icon className="h-5 w-5" />
            <span className="font-medium">{type.name}</span>
            {wizardData.roomType === type.id && (
              <Check className="h-5 w-5 ml-auto text-primary-600" />
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Style Selection */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Style</h3>
      <div className="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto">
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
const RoomPreview = ({ wizardData, currentStep, calculateArea }) => {
  const getWallColors = () => {
    if (currentStep === 2) {
      return {
        top: '#F97316', // Orange
        bottom: '#F97316', // Orange
        left: '#3B82F6', // Blue
        right: '#3B82F6' // Blue
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
      
      {/* 2D Room View */}
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

        {/* Room Container */}
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
            className="relative bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-gray-300"
            style={{
              width: `${roomWidthPx}px`,
              height: `${roomHeightPx}px`,
              borderRadius: wizardData.roomShape === 'circle' ? '50%' : '8px'
            }}
          >
            {/* Wooden Floor Texture */}
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
                {/* Top Wall */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2"
                  style={{ backgroundColor: wallColors.top }}
                />
                {/* Bottom Wall */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-2"
                  style={{ backgroundColor: wallColors.bottom }}
                />
                {/* Left Wall */}
                <div 
                  className="absolute top-0 bottom-0 left-0 w-2"
                  style={{ backgroundColor: wallColors.left }}
                />
                {/* Right Wall */}
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
                  <p className="text-sm opacity-75">3D Rendering</p>
                </div>
                
                {/* Shuffle Button */}
                <button
                  onClick={onShuffle}
                  className="absolute bottom-2 right-2 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Shuffle className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Design Canvas Component (placeholder for now)
const DesignCanvas = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Grid3X3 className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Design Canvas</h2>
        <p className="text-gray-600 mb-6">Your design workspace will appear here</p>
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 max-w-md mx-auto">
          <p className="text-gray-500">Canvas implementation coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default CreateDesignPage;