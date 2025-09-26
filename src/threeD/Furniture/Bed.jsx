import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Bed = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#A7727D',
  isSelected = false,
  onSelect,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelUrl="/models/furniture/bed_queen.glb"
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

export default Bed;