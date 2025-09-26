import React from 'react';
import FurnitureLoader from '../FurnitureLoader';

const Table = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#F8EAD8',
  isSelected = false,
  onSelect,
  ...props 
}) => {
  return (
    <FurnitureLoader
      modelUrl="/models/furniture/table_dining.glb"
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

export default Table;