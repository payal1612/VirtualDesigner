import React, { Suspense, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw, 
  Home, 
  Sun, 
  Moon, 
  Settings, 
  Camera,
  Download,
  Maximize2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Database,
  HardDrive,
  Cloud,
  Layers,
  Palette
} from 'lucide-react';
import SceneCanvas from '../../threeD/SceneCanvas';
import { Sofa, Chair, Bed, Table, Refrigerator, AirCooler } from '../../threeD/Furniture';

const Canvas3D = ({ 
  design, 
  selectedElement, 
  onElementSelect, 
  onElementUpdate,
  viewMode,
  onToggleView 
}) => {
  const [cameraPosition, setCameraPosition] = useState([10, 10, 10]);
  const [lightingMode, setLightingMode] = useState('day');
  const [showGrid, setShowGrid] = useState(true);
  const [showShadows, setShowShadows] = useState(true);
  const [environmentPreset, setEnvironmentPreset] = useState('city');
  const [renderQuality, setRenderQuality] = useState('medium');
  const [showSettings, setShowSettings] = useState(false);
  const controlsRef = useRef();

  // Reset camera view
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // Convert 2D elements to 3D positions
  const convertTo3D = (element) => {
    return {
      ...element,
      x: (element.x - 400) / 50,
      y: 0,
      z: -(element.y - 300) / 50,
      width: element.width / 50,
      height: element.height / 50,
      depth: element.type === 'wall' ? 0.2 : 1
    };
  };

  // Render 3D furniture based on type
  const render3DFurniture = (element) => {
    const element3D = convertTo3D(element);
    const commonProps = {
      key: element.id,
      position: [element3D.x, element3D.y, element3D.z],
      rotation: [0, (element.rotation || 0) * Math.PI / 180, 0],
      scale: [element3D.width, 1, element3D.height],
      color: element.color,
      isSelected: selectedElement?.id === element.id,
      onSelect: () => onElementSelect(element.id)
    };

    switch (element.furnitureType || element.type) {
      case 'sofa':
        return <Sofa {...commonProps} />;
      case 'chair':
        return <Chair {...commonProps} />;
      case 'bed':
        return <Bed {...commonProps} />;
      case 'table':
        return <Table {...commonProps} />;
      case 'refrigerator':
        return <Refrigerator {...commonProps} />;
      case 'air_cooler':
        return <AirCooler {...commonProps} />;
      default:
        return <Element3D {...commonProps} element={element3D} />;
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-50 to-blue-100">
      {/* 3D Canvas */}
      <SceneCanvas
        cameraPosition={cameraPosition}
        lightingMode={lightingMode}
        showGrid={showGrid}
        showShadows={showShadows}
        environmentPreset={environmentPreset}
      >
        {/* Render 3D Furniture */}
        {design?.elements?.map((element) => render3DFurniture(element))}
        
        {/* Room Boundaries */}
        <RoomBoundaries design={design} />
      </SceneCanvas>

      {/* 3D Controls */}
      <Canvas3DControls
        lightingMode={lightingMode}
        onLightingChange={setLightingMode}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showShadows={showShadows}
        onToggleShadows={() => setShowShadows(!showShadows)}
        environmentPreset={environmentPreset}
        onEnvironmentChange={setEnvironmentPreset}
        onResetCamera={resetCamera}
        onToggleView={onToggleView}
        viewMode={viewMode}
        showSettings={showSettings}
        onToggleSettings={() => setShowSettings(!showSettings)}
      />

      {/* Quality Settings */}
      <QualitySettings
        quality={renderQuality}
        onQualityChange={setRenderQuality}
      />
    </div>
  );
};

// 3D Element Component
const Element3D = ({ element, isSelected, onSelect, onUpdate, position, rotation, scale, color }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const getElementGeometry = () => {
    switch (element.type) {
      case 'wall':
        return <boxGeometry args={[element.width, 3, element.depth]} />;
      case 'door':
        return <boxGeometry args={[element.width, 2.5, 0.1]} />;
      case 'window':
        return <boxGeometry args={[element.width, 1.5, 0.1]} />;
      case 'furniture':
      case 'bed':
      case 'desk':
        return <boxGeometry args={[element.width, 0.8, element.height]} />;
      case 'plant':
        return <sphereGeometry args={[element.width / 2, 8, 6]} />;
      case 'light':
        return <sphereGeometry args={[element.width / 4, 8, 6]} />;
      default:
        return <boxGeometry args={[element.width, 1, element.height]} />;
    }
  };

  const getMaterial = () => {
    const baseColor = element.color;
    const emissive = element.type === 'light' ? baseColor : '#000000';
    const metalness = element.type === 'light' ? 0.8 : 0.1;
    const roughness = element.type === 'plant' ? 0.8 : 0.3;

    return (
      <meshStandardMaterial
        color={baseColor}
        emissive={emissive}
        emissiveIntensity={element.type === 'light' ? 0.3 : 0}
        metalness={metalness}
        roughness={roughness}
        transparent={element.opacity < 1}
        opacity={element.opacity || 1}
      />
    );
  };

  return (
    <group position={[element.x, element.y, element.z]}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={onSelect}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.05 : 1}
      >
        {getElementGeometry()}
        {getMaterial()}
      </mesh>

      {/* Selection Indicator */}
      {isSelected && (
        <mesh position={[0, -0.01, 0]}>
          <ringGeometry args={[Math.max(element.width, element.height) * 0.6, Math.max(element.width, element.height) * 0.7, 32]} />
          <meshBasicMaterial color="#A7727D" transparent opacity={0.5} />
        </mesh>
      )}

      {/* Element Label */}
      {(isSelected || hovered) && (
        <Html position={[0, element.height + 1, 0]} center>
          <div className="bg-white px-2 py-1 rounded shadow-lg text-xs font-medium text-gray-800 pointer-events-none">
            {element.name}
          </div>
        </Html>
      )}

      {/* Light Effect */}
      {element.type === 'light' && (
        <pointLight
          position={[0, 1, 0]}
          color={element.color}
          intensity={0.5}
          distance={5}
          decay={2}
          castShadow
        />
      )}
    </group>
  );
};

// Room Boundaries Component
const RoomBoundaries = ({ design }) => {
  if (!design?.elements) return null;

  const walls = design.elements.filter(el => el.type === 'wall');
  
  return (
    <group>
      {walls.map((wall) => {
        const wall3D = {
          x: (wall.x - 400) / 50,
          y: 1.5,
          z: -(wall.y - 300) / 50,
          width: wall.width / 50,
          height: 3,
          depth: 0.2
        };

        return (
          <mesh
            key={wall.id}
            position={[wall3D.x, wall3D.y, wall3D.z]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[wall3D.width, wall3D.height, wall3D.depth]} />
            <meshStandardMaterial color={wall.color} />
          </mesh>
        );
      })}
    </group>
  );
};

// 3D Controls Component
const Canvas3DControls = ({ 
  lightingMode, 
  onLightingChange, 
  showGrid, 
  onToggleGrid,
  showShadows,
  onToggleShadows,
  environmentPreset,
  onEnvironmentChange,
  onResetCamera,
  onToggleView,
  viewMode,
  showSettings,
  onToggleSettings
}) => {
  const environments = [
    { id: 'city', name: 'City', icon: '🏙️' },
    { id: 'sunset', name: 'Sunset', icon: '🌅' },
    { id: 'dawn', name: 'Dawn', icon: '🌄' },
    { id: 'night', name: 'Night', icon: '🌃' },
    { id: 'studio', name: 'Studio', icon: '💡' },
    { id: 'apartment', name: 'Apartment', icon: '🏠' }
  ];

  return (
    <>
      {/* Main Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        {/* View Toggle */}
        <button
          onClick={onToggleView}
          className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
          title="Toggle 2D View"
        >
          <Layers className="h-5 w-5" />
        </button>

        {/* Lighting Toggle */}
        <button
          onClick={() => onLightingChange(lightingMode === 'day' ? 'night' : 'day')}
          className={`p-3 rounded-full shadow-lg transition-all ${
            lightingMode === 'night' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-yellow-500 text-white'
          }`}
          title={`Switch to ${lightingMode === 'day' ? 'Night' : 'Day'} Mode`}
        >
          {lightingMode === 'day' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>

        {/* Grid Toggle */}
        <button
          onClick={onToggleGrid}
          className={`p-3 rounded-full shadow-lg transition-all ${
            showGrid 
              ? 'bg-green-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          title="Toggle Grid"
        >
          <Home className="h-5 w-5" />
        </button>

        {/* Reset Camera */}
        <button
          onClick={onResetCamera}
          className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
          title="Reset Camera"
        >
          <RotateCcw className="h-5 w-5" />
        </button>

        {/* Settings */}
        <button
          onClick={onToggleSettings}
          className={`p-3 rounded-full shadow-lg transition-all ${
            showSettings 
              ? 'bg-gray-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          title="3D Settings"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute bottom-4 right-20 bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-80"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">3D Settings</h3>
          
          {/* Environment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {environments.map((env) => (
                <button
                  key={env.id}
                  onClick={() => onEnvironmentChange(env.id)}
                  className={`p-2 text-xs rounded-lg border transition-all ${
                    environmentPreset === env.id
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-lg mb-1">{env.icon}</div>
                  <div>{env.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Shadows Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Shadows</span>
            <button
              onClick={onToggleShadows}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showShadows ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showShadows ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

// Quality Settings Component
const QualitySettings = ({ quality, onQualityChange }) => {
  return (
    <div className="absolute top-4 right-4">
      <select
        value={quality}
        onChange={(e) => onQualityChange(e.target.value)}
        className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="low">Low Quality</option>
        <option value="medium">Medium Quality</option>
        <option value="high">High Quality</option>
      </select>
    </div>
  );
};

export default Canvas3D;