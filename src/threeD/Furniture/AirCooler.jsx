import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const AirCooler = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1], 
  color = '#6B7280',
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelPath="/src/threeD/models/air_cooler.glb"
      furnitureType="air_cooler"
      position={position}
      rotation={rotation}
      scale={scale}
      color={color}
      isSelected={isSelected}
      onSelect={onSelect}
      onUpdate={onUpdate}
      {...props}
    />
  );
};

export default AirCooler;