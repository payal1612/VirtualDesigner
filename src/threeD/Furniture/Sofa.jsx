import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Sofa = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#8B5CF6',
  isSelected = false,
  onSelect,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelUrl="/models/furniture/sofa_modern.glb"
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

export default Sofa;