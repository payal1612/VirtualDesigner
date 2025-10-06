import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Stage, Layer, Rect, Circle, Group, Text, Line } from 'react-konva';
import { motion } from 'framer-motion';
import { 
  Grid3X3, 
  Move, 
  RotateCw, 
  Copy, 
  Trash2, 
  Lock, 
  Unlock,
  Eye,
  EyeOff,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers
} from 'lucide-react';

const Canvas2D = ({ 
  design, 
  selectedElement, 
  onElementSelect, 
  onElementUpdate, 
  onElementDelete,
  onElementDuplicate,
  gridEnabled = true, 
  snapToGrid = true,
  onAddElement,
  viewMode,
  onToggleView
}) => {
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [draggedElement, setDraggedElement] = useState(null);
  const [showMeasurements, setShowMeasurements] = useState(false);

  // Update stage size on container resize
  useEffect(() => {
    const updateStageSize = () => {
      const container = document.getElementById('canvas-2d-container');
      if (container) {
        setStageSize({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    updateStageSize();
    window.addEventListener('resize', updateStageSize);
    return () => window.removeEventListener('resize', updateStageSize);
  }, []);

  // Handle element drag
  const handleElementDragEnd = useCallback((elementId, e) => {
    const element = design?.elements.find(el => el.id === elementId);
    if (!element) return;

    let newX = e.target.x();
    let newY = e.target.y();

    // Snap to grid if enabled
    if (snapToGrid) {
      const gridSize = 20;
      newX = Math.round(newX / gridSize) * gridSize;
      newY = Math.round(newY / gridSize) * gridSize;
    }

    // Boundary constraints
    newX = Math.max(0, Math.min(newX, stageSize.width - element.width));
    newY = Math.max(0, Math.min(newY, stageSize.height - element.height));

    onElementUpdate(elementId, { x: newX, y: newY });
    setDraggedElement(null);
  }, [design, snapToGrid, stageSize, onElementUpdate]);

  // Handle stage click
  const handleStageClick = useCallback((e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onElementSelect(null);
    }
  }, [onElementSelect]);

  // Handle zoom
  const handleWheel = useCallback((e) => {
    e.evt.preventDefault();
    const scaleBy = 1.1;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    const clampedScale = Math.max(0.3, Math.min(3, newScale));

    setZoom(clampedScale);
    setStagePos({
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    });
  }, []);

  // Zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const resetView = () => {
    setZoom(1);
    setStagePos({ x: 0, y: 0 });
  };

  // Element transformation handlers
  const handleElementTransform = useCallback((elementId, newAttrs) => {
    onElementUpdate(elementId, newAttrs);
  }, [onElementUpdate]);

  // Render grid
  const renderGrid = () => {
    if (!gridEnabled) return null;

    const gridSize = 20;
    const lines = [];

    // Vertical lines
    for (let i = 0; i <= stageSize.width / gridSize; i++) {
      lines.push(
        <Line
          key={`grid-v-${i}`}
          points={[i * gridSize, 0, i * gridSize, stageSize.height]}
          stroke="#e5e7eb"
          strokeWidth={1 / zoom}
          opacity={0.5}
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i <= stageSize.height / gridSize; i++) {
      lines.push(
        <Line
          key={`grid-h-${i}`}
          points={[0, i * gridSize, stageSize.width, i * gridSize]}
          stroke="#e5e7eb"
          strokeWidth={1 / zoom}
          opacity={0.5}
        />
      );
    }

    return lines;
  };

  // Render design elements
  const renderElements = () => {
    if (!design?.elements) return null;

    return design.elements.map((element) => (
      <DesignElement
        key={element.id}
        element={element}
        isSelected={selectedElement?.id === element.id}
        isDragged={draggedElement === element.id}
        onSelect={() => onElementSelect(element.id)}
        onDragStart={() => setDraggedElement(element.id)}
        onDragEnd={(e) => handleElementDragEnd(element.id, e)}
        onTransform={(newAttrs) => handleElementTransform(element.id, newAttrs)}
        showMeasurements={showMeasurements}
        zoom={zoom}
      />
    ));
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      {/* Canvas Container */}
      <div id="canvas-2d-container" className="w-full h-full relative">
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          scaleX={zoom}
          scaleY={zoom}
          x={stagePos.x}
          y={stagePos.y}
          onClick={handleStageClick}
          onWheel={handleWheel}
          draggable={!selectedElement}
          onDragEnd={(e) => setStagePos({ x: e.target.x(), y: e.target.y() })}
        >
          <Layer>
            {/* Grid */}
            {renderGrid()}
            
            {/* Design Elements */}
            {renderElements()}
            
            {/* Measurements */}
            {showMeasurements && selectedElement && (
              <MeasurementOverlay element={selectedElement} zoom={zoom} />
            )}
          </Layer>
        </Stage>
      </div>

      {/* 2D Controls */}
      <Canvas2DControls
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={resetView}
        showMeasurements={showMeasurements}
        onToggleMeasurements={() => setShowMeasurements(!showMeasurements)}
        onToggleView={onToggleView}
        viewMode={viewMode}
      />

      {/* Element Toolbar */}
      {selectedElement && (
        <ElementToolbar
          element={selectedElement}
          onUpdate={onElementUpdate}
          onDelete={() => onElementDelete(selectedElement.id)}
          onDuplicate={() => onElementDuplicate(selectedElement)}
        />
      )}
    </div>
  );
};

// Design Element Component
const DesignElement = ({ 
  element, 
  isSelected, 
  isDragged, 
  onSelect, 
  onDragStart, 
  onDragEnd, 
  onTransform,
  showMeasurements,
  zoom 
}) => {
  const shapeRef = useRef();

  const handleTransformEnd = () => {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Reset scale and update dimensions
    node.scaleX(1);
    node.scaleY(1);

    onTransform({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
      rotation: node.rotation(),
    });
  };

  // Handle click
  const handleClick = (event) => {
    event.cancelBubble = true;
    onSelect();
  };

  // Render different shapes based on element type
  const renderShape = () => {
    const commonProps = {
      ref: shapeRef,
      x: element.x,
      y: element.y,
      rotation: element.rotation || 0,
      fill: element.color,
      stroke: isSelected ? '#A7727D' : undefined,
      strokeWidth: isSelected ? 3 / zoom : 0,
      opacity: isDragged ? 0.7 : (element.opacity || 1),
      draggable: !element.locked,
      onClick: handleClick,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      onTransformEnd: handleTransformEnd,
    };

    return (
      <Rect
        {...commonProps}
        width={element.width}
        height={element.height}
      />
    );
  };

  return (
    <Group>
      {renderShape()}
      
      {/* Element Label */}
      <Text
        text={element.name}
        fontSize={12 / zoom}
        fill="#374151"
        x={element.x - element.width / 4}
        y={element.y + element.height + 5}
        visible={isSelected || showMeasurements}
      />
      
      {/* Lock Indicator */}
      {element.locked && (
        <Group x={element.x + element.width - 20} y={element.y - 20}>
          <Circle radius={10} fill="rgba(0,0,0,0.7)" />
          <Text
            text="🔒"
            fontSize={12}
            x={-6}
            y={-6}
            fill="white"
          />
        </Group>
      )}
    </Group>
  );
};

// Measurement Overlay Component
const MeasurementOverlay = ({ element, zoom }) => {
  return (
    <Group>
      {/* Dimension lines */}
      <Line
        points={[element.x, element.y - 20, element.x + element.width, element.y - 20]}
        stroke="#6B7280"
        strokeWidth={1 / zoom}
      />
      <Text
        text={`${element.width}px`}
        fontSize={10 / zoom}
        fill="#6B7280"
        x={element.x + element.width / 2 - 15}
        y={element.y - 35}
      />
      
      <Line
        points={[element.x - 20, element.y, element.x - 20, element.y + element.height]}
        stroke="#6B7280"
        strokeWidth={1 / zoom}
      />
      <Text
        text={`${element.height}px`}
        fontSize={10 / zoom}
        fill="#6B7280"
        x={element.x - 50}
        y={element.y + element.height / 2 - 5}
        rotation={-90}
      />
    </Group>
  );
};

// 2D Controls Component
const Canvas2DControls = ({ 
  zoom, 
  onZoomIn, 
  onZoomOut, 
  onResetView, 
  showMeasurements, 
  onToggleMeasurements,
  onToggleView,
  viewMode 
}) => {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
      {/* View Toggle */}
      <button
        onClick={onToggleView}
        className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
        title="Toggle 3D View"
      >
        <Layers className="h-5 w-5" />
      </button>

      {/* Zoom Controls */}
      <button 
        onClick={onZoomIn}
        className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      
      <div className="px-3 py-2 bg-white rounded-full shadow-lg text-sm font-medium text-gray-700">
        {Math.round(zoom * 100)}%
      </div>
      
      <button 
        onClick={onZoomOut}
        className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      
      <button 
        onClick={onResetView}
        className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 transition-colors"
        title="Reset View"
      >
        <Eye className="h-5 w-5" />
      </button>

      {/* Measurements Toggle */}
      <button
        onClick={onToggleMeasurements}
        className={`p-3 rounded-full shadow-lg transition-all ${
          showMeasurements 
            ? 'bg-primary-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
        title="Toggle Measurements"
      >
        <Grid3X3 className="h-5 w-5" />
      </button>
    </div>
  );
};

// Element Toolbar Component
const ElementToolbar = ({ element, onUpdate, onDelete, onDuplicate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 flex items-center space-x-2"
    >
      <button
        onClick={() => onUpdate(element.id, { 
          rotation: ((element.rotation || 0) + 45) % 360 
        })}
        className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        title="Rotate"
      >
        <RotateCw className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onUpdate(element.id, { 
          locked: !element.locked 
        })}
        className={`p-2 rounded-lg transition-colors ${
          element.locked 
            ? 'text-red-600 bg-red-50 hover:bg-red-100' 
            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        }`}
        title={element.locked ? 'Unlock' : 'Lock'}
      >
        {element.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
      </button>
      
      <button
        onClick={onDuplicate}
        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        title="Duplicate"
      >
        <Copy className="h-4 w-4" />
      </button>
      
      <button
        onClick={onDelete}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
};

export default Canvas2D;