import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FurnitureLoader = ({ 
  modelPath, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  color = '#ffffff',
  isSelected = false,
  onSelect,
  onUpdate,
  furnitureType = 'generic',
  ...props 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState(false);
  
  // Try to load 3D model, fallback to procedural geometry
  let model;
  try {
    if (modelPath && !error) {
      model = useGLTF(modelPath);
    }
  } catch (err) {
    console.warn(`Failed to load model: ${modelPath}`, err);
    setError(true);
    model = null;
  }

  // Animation frame for selected items
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  // Handle click
  const handleClick = (event) => {
    event.stopPropagation();
    if (onSelect) onSelect();
  };

  // Create procedural furniture geometry based on type
  const createProceduralFurniture = () => {
    const materials = {
      wood: new THREE.MeshStandardMaterial({ 
        color: '#8B4513', 
        roughness: 0.8, 
        metalness: 0.1 
      }),
      fabric: new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.9, 
        metalness: 0.0 
      }),
      metal: new THREE.MeshStandardMaterial({ 
        color: '#C0C0C0', 
        roughness: 0.2, 
        metalness: 0.8 
      }),
      plastic: new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.3, 
        metalness: 0.1 
      })
    };

    switch (furnitureType) {
      case 'sofa':
        return (
          <group>
            {/* Sofa base */}
            <mesh position={[0, 0.2, 0]}>
              <boxGeometry args={[2, 0.4, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Sofa back */}
            <mesh position={[0, 0.6, -0.3]}>
              <boxGeometry args={[2, 0.8, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.9, 0.5, 0]}>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.9, 0.5, 0]}>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'chair':
        return (
          <group>
            {/* Chair seat */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.5, 0.05, 0.5]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Chair back */}
            <mesh position={[0, 0.7, -0.2]}>
              <boxGeometry args={[0.5, 0.6, 0.05]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Chair legs */}
            {[[-0.2, 0.2, -0.2], [0.2, 0.2, -0.2], [-0.2, 0.2, 0.2], [0.2, 0.2, 0.2]].map((pos, i) => (
              <mesh key={i} position={pos}>
                <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
          </group>
        );

      case 'bed':
        return (
          <group>
            {/* Mattress */}
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[2, 0.2, 1.6]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 0.7, -0.7]}>
              <boxGeometry args={[2.2, 0.8, 0.1]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Bed frame */}
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[2.1, 0.1, 1.7]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'table':
        return (
          <group>
            {/* Table top */}
            <mesh position={[0, 0.7, 0]}>
              <boxGeometry args={[1.5, 0.05, 0.8]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Table legs */}
            {[[-0.7, 0.35, -0.35], [0.7, 0.35, -0.35], [-0.7, 0.35, 0.35], [0.7, 0.35, 0.35]].map((pos, i) => (
              <mesh key={i} position={pos}>
                <boxGeometry args={[0.05, 0.7, 0.05]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'refrigerator':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[0.6, 1.8, 0.6]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Door handle */}
            <mesh position={[0.25, 1.2, 0.31]}>
              <boxGeometry args={[0.05, 0.3, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Freezer compartment */}
            <mesh position={[0, 1.5, 0.31]}>
              <boxGeometry args={[0.55, 0.5, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'air_cooler':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 1.5]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Fan grill */}
            <mesh position={[0, 1.2, 0.26]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 1, 0.26]}>
              <boxGeometry args={[0.3, 0.1, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  // Render loaded model or fallback
  const renderFurniture = () => {
    if (model && model.scene && !error) {
      return (
        <primitive
          ref={meshRef}
          object={model.scene.clone()}
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          {...props}
        />
      );
    } else {
      return (
        <group
          ref={meshRef}
          position={position}
          rotation={rotation}
          scale={scale}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          {...props}
        >
          {createProceduralFurniture()}
        </group>
      );
    }
  };

  return (
    <group>
      {renderFurniture()}
      
      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[position[0], position[1] - 0.01, position[2]]}>
          <ringGeometry args={[1.2, 1.4, 32]} />
          <meshBasicMaterial color="#A7727D" transparent opacity={0.5} />
        </mesh>
      )}
      
      {/* Hover effect */}
      {hovered && !isSelected && (
        <mesh position={[position[0], position[1] - 0.01, position[2]]}>
          <ringGeometry args={[1.1, 1.3, 32]} />
          <meshBasicMaterial color="#EDDBC7" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
};

// Preload models (when they exist)
const modelPaths = [
  '/src/threeD/models/sofa.glb',
  '/src/threeD/models/chair.glb',
  '/src/threeD/models/bed.glb',
  '/src/threeD/models/table.glb',
  '/src/threeD/models/refrigerator.glb',
  '/src/threeD/models/air_cooler.glb'
];

modelPaths.forEach(path => {
  try {
    useGLTF.preload(path);
  } catch (error) {
    console.warn(`Could not preload model: ${path}`);
  }
});

export default FurnitureLoader;