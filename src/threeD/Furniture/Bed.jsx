import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Bed = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1], 
  color = '#059669',
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelPath="/src/threeD/models/bed.glb"
      furnitureType="bed"
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

export default Bed;