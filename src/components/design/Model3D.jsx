import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced 3D Model Component for realistic furniture
const Model3D = ({ 
  element,
  isSelected = false,
  onSelect,
  onUpdate,
  ...props 
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  
  // Convert 2D coordinates to 3D
  const position = [
    (element.x - 400) / 50,
    0,
    -(element.y - 300) / 50
  ];
  
  const scale = [
    element.width / 100,
    element.height / 100,
    element.width / 100
  ];

  // Animation frame for selected elements
  useFrame((state) => {
    if (meshRef.current && isSelected) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.02;
    }
  });

  // Handle click
  const handleClick = (event) => {
    event.stopPropagation();
    if (onSelect) onSelect();
  };

  // Get realistic geometry based on furniture type
  const getRealisticGeometry = () => {
    switch (element.type) {
      case 'furniture':
        if (element.name.toLowerCase().includes('sofa')) {
          return (
            <group>
              {/* Sofa base */}
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[2, 0.4, 0.8]} />
                <meshStandardMaterial color={element.color} roughness={0.8} />
              </mesh>
              {/* Sofa back */}
              <mesh position={[0, 0.6, -0.3]}>
                <boxGeometry args={[2, 0.8, 0.2]} />
                <meshStandardMaterial color={element.color} roughness={0.8} />
              </mesh>
              {/* Cushions */}
              <mesh position={[-0.4, 0.45, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.6]} />
                <meshStandardMaterial color={element.color} roughness={0.6} />
              </mesh>
              <mesh position={[0.4, 0.45, 0]}>
                <boxGeometry args={[0.6, 0.1, 0.6]} />
                <meshStandardMaterial color={element.color} roughness={0.6} />
              </mesh>
            </group>
          );
        } else if (element.name.toLowerCase().includes('chair')) {
          return (
            <group>
              {/* Seat */}
              <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.5]} />
                <meshStandardMaterial color={element.color} roughness={0.7} />
              </mesh>
              {/* Backrest */}
              <mesh position={[0, 0.7, -0.2]}>
                <boxGeometry args={[0.5, 0.6, 0.1]} />
                <meshStandardMaterial color={element.color} roughness={0.7} />
              </mesh>
              {/* Legs */}
              {[[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]].map((pos, i) => (
                <mesh key={i} position={[pos[0], 0.2, pos[1]]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                  <meshStandardMaterial color="#8B4513" metalness={0.1} />
                </mesh>
              ))}
            </group>
          );
        } else if (element.name.toLowerCase().includes('table')) {
          return (
            <group>
              {/* Table top */}
              <mesh position={[0, 0.75, 0]}>
                <boxGeometry args={[1.2, 0.05, 0.8]} />
                <meshStandardMaterial 
                  color={element.color} 
                  roughness={0.2} 
                  metalness={0.1}
                />
              </mesh>
              {/* Legs */}
              {[[-0.5, -0.3], [0.5, -0.3], [-0.5, 0.3], [0.5, 0.3]].map((pos, i) => (
                <mesh key={i} position={[pos[0], 0.375, pos[1]]}>
                  <cylinderGeometry args={[0.03, 0.03, 0.75]} />
                  <meshStandardMaterial color="#2D3748" metalness={0.8} roughness={0.2} />
                </mesh>
              ))}
            </group>
          );
        }
        break;

      case 'bed':
        return (
          <group>
            {/* Bed frame */}
            <mesh position={[0, 0.3, 0]}>
              <boxGeometry args={[1.6, 0.6, 2]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            {/* Mattress */}
            <mesh position={[0, 0.65, 0]}>
              <boxGeometry args={[1.5, 0.1, 1.9]} />
              <meshStandardMaterial color="#F5F5DC" roughness={0.9} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 1, -0.9]}>
              <boxGeometry args={[1.6, 0.8, 0.1]} />
              <meshStandardMaterial color={element.color} roughness={0.7} />
            </mesh>
            {/* Pillows */}
            <mesh position={[-0.3, 0.75, -0.6]}>
              <boxGeometry args={[0.4, 0.1, 0.3]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            <mesh position={[0.3, 0.75, -0.6]}>
              <boxGeometry args={[0.4, 0.1, 0.3]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
          </group>
        );

      case 'appliance':
        if (element.name.toLowerCase().includes('refrigerator')) {
          return (
            <group>
              {/* Main body */}
              <mesh position={[0, 0.9, 0]}>
                <boxGeometry args={[0.6, 1.8, 0.6]} />
                <meshStandardMaterial color="#E5E7EB" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Door handles */}
              <mesh position={[0.25, 1.2, 0.31]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh position={[0.25, 0.6, 0.31]}>
                <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                <meshStandardMaterial color="#374151" metalness={0.9} roughness={0.1} />
              </mesh>
            </group>
          );
        } else if (element.name.toLowerCase().includes('cooler')) {
          return (
            <group>
              {/* Main body */}
              <mesh position={[0, 0.75, 0]}>
                <cylinderGeometry args={[0.2, 0.25, 1.5]} />
                <meshStandardMaterial color={element.color} roughness={0.3} />
              </mesh>
              {/* Fan grill */}
              <mesh position={[0, 1.2, 0.26]}>
                <cylinderGeometry args={[0.15, 0.15, 0.02]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
              </mesh>
              {/* Control panel */}
              <mesh position={[0, 0.8, 0.26]}>
                <boxGeometry args={[0.15, 0.1, 0.02]} />
                <meshStandardMaterial color="#1F2937" />
              </mesh>
            </group>
          );
        }
        break;

      case 'plant':
        return (
          <group>
            {/* Pot */}
            <mesh position={[0, 0.15, 0]}>
              <cylinderGeometry args={[0.15, 0.12, 0.3]} />
              <meshStandardMaterial color="#8B4513" roughness={0.8} />
            </mesh>
            {/* Plant stem */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <meshStandardMaterial color="#228B22" />
            </mesh>
            {/* Leaves */}
            {[0, 1, 2, 3].map((i) => (
              <mesh 
                key={i} 
                position={[
                  Math.cos(i * Math.PI / 2) * 0.2, 
                  0.6 + i * 0.1, 
                  Math.sin(i * Math.PI / 2) * 0.2
                ]}
                rotation={[0, i * Math.PI / 2, Math.PI / 6]}
              >
                <planeGeometry args={[0.3, 0.2]} />
                <meshStandardMaterial 
                  color="#228B22" 
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            ))}
          </group>
        );

      case 'light':
        return (
          <group>
            {/* Light fixture */}
            <mesh position={[0, 0.8, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial 
                color={element.color} 
                emissive={element.color}
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* Cord/mount */}
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.8]} />
              <meshStandardMaterial color="#374151" />
            </mesh>
            {/* Light effect */}
            <pointLight
              position={[0, 0.8, 0]}
              color={element.color}
              intensity={0.5}
              distance={3}
              decay={2}
            />
          </group>
        );

      default:
        return (
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={element.color} roughness={0.5} />
          </mesh>
        );
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        rotation={[0, (element.rotation || 0) * Math.PI / 180, 0]}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
        {...props}
      >
        {getRealisticGeometry()}
      </mesh>

      {/* Selection indicator */}
      {isSelected && (
        <mesh position={[position[0], 0.01, position[2]]}>
          <ringGeometry args={[
            Math.max(element.width, element.height) / 80, 
            Math.max(element.width, element.height) / 70, 
            32
          ]} />
          <meshBasicMaterial color="#A7727D" transparent opacity={0.6} />
        </mesh>
      )}

      {/* Hover indicator */}
      {hovered && !isSelected && (
        <mesh position={[position[0], 0.01, position[2]]}>
          <ringGeometry args={[
            Math.max(element.width, element.height) / 85, 
            Math.max(element.width, element.height) / 75, 
            32
          ]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.4} />
        </mesh>
      )}

      {/* Element Label */}
      {(isSelected || hovered) && (
        <Html position={[position[0], position[1] + 2, position[2]]} center>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg text-sm font-medium text-gray-800 pointer-events-none border border-gray-200">
            {element.name}
            {element.locked && <span className="ml-2">🔒</span>}
          </div>
        </Html>
      )}

      {/* 3D Model Badge */}
      {hovered && (
        <Html position={[position[0], position[1] + 1.5, position[2]]} center>
          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
            3D Model
          </div>
        </Html>
      )}
    </group>
  );
};

export default Model3D;