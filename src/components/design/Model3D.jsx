import React, { useRef, useState } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Model Component for furniture items
const Model3D = ({ 
  modelPath, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#ffffff',
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Load 3D model (fallback to basic geometry if model not found)
  let model;
  try {
    model = useGLTF(modelPath);
  } catch (error) {
    console.warn(`Failed to load model: ${modelPath}`);
    model = null;
  }

  // Animation frame
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  // Handle click
  const handleClick = (event) => {
    event.stopPropagation();
    if (onSelect) onSelect();
  };

  // Handle drag (for future implementation)
  const handlePointerDown = (event) => {
    event.stopPropagation();
    // Implement drag logic here
  };

  // Render fallback geometry if model fails to load
  const renderFallback = () => {
    return (
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        {...props}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#8B5CF6' : color}
          transparent
          opacity={isSelected ? 0.8 : 1}
        />
        {isSelected && (
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color="#8B5CF6" linewidth={2} />
          </lineSegments>
        )}
      </mesh>
    );
  };

  // Render loaded model
  const renderModel = () => {
    if (!model || !model.scene) return renderFallback();

    return (
      <primitive
        ref={meshRef}
        object={model.scene.clone()}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={handleClick}
        onPointerDown={handlePointerDown}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        {...props}
      />
    );
  };

  return (
    <group>
      {model ? renderModel() : renderFallback()}
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[position[0], position[1] - 0.01, position[2]]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  );
};

// Preload common models
useGLTF.preload('/models/furniture/sofa_modern.glb');
useGLTF.preload('/models/furniture/coffee_table_glass.glb');
useGLTF.preload('/models/furniture/bed_queen.glb');
useGLTF.preload('/models/furniture/kitchen_island.glb');

export default Model3D;