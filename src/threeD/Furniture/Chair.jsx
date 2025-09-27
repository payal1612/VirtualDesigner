import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Chair = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1], 
  color = '#92400E',
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelPath="/src/threeD/models/chair.glb"
      furnitureType="chair"
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

export default Chair;