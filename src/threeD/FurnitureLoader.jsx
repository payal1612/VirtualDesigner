import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FurnitureLoader = ({ 
  modelUrl, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = null,
  isSelected = false,
  onSelect,
  ...props 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [loadError, setLoadError] = useState(false);

  // Load GLTF model
  let gltf;
  try {
    gltf = useGLTF(modelUrl);
  } catch (error) {
    console.error('Error loading model:', error);
    setLoadError(true);
  }

  // Animation for selected items
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
  });

  // Apply color override if provided
  React.useEffect(() => {
    if (gltf && color && meshRef.current) {
      meshRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          const newMaterial = child.material.clone();
          newMaterial.color = new THREE.Color(color);
          child.material = newMaterial;
        }
      });
    }
  }, [gltf, color]);

  // Handle click
  const handleClick = (event) => {
    event.stopPropagation();
    if (onSelect) onSelect();
  };

  // Fallback geometry for loading errors
  const FallbackGeometry = () => (
    <mesh position={position} rotation={rotation} scale={scale} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color || '#8B5CF6'} />
    </mesh>
  );

  if (loadError || !gltf) {
    return <FallbackGeometry />;
  }

  return (
    <group>
      <primitive
        ref={meshRef}
        object={gltf.scene.clone()}
        position={position}
        rotation={rotation}
        scale={hovered ? [scale[0] * 1.05, scale[1] * 1.05, scale[2] * 1.05] : scale}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        {...props}
      />

      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[position[0], position[1] - 0.01, position[2]]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#A7727D" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Hover indicator */}
      {hovered && !isSelected && (
        <mesh position={[position[0], position[1] - 0.01, position[2]]}>
          <ringGeometry args={[1.1, 1.3, 32]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  );
};

// Preload models for better performance
useGLTF.preload('/models/furniture/sofa_modern.glb');
useGLTF.preload('/models/furniture/chair_modern.glb');
useGLTF.preload('/models/furniture/bed_queen.glb');
useGLTF.preload('/models/furniture/table_dining.glb');

export default FurnitureLoader;