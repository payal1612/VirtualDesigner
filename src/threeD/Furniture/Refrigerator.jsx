import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Refrigerator = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1], 
  color = '#FFFFFF',
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelPath="/src/threeD/models/refrigerator.glb"
      furnitureType="refrigerator"
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

export default Refrigerator;