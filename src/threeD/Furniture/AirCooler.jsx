import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const AirCooler = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#374151',
  isSelected = false,
  onSelect,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelUrl="/models/furniture/air_cooler.glb"
      position={position}
      rotation={rotation}
      scale={scale}
      color={color}
      isSelected={isSelected}
      onSelect={onSelect}
      {...props}
    />
  );
};

export default AirCooler;