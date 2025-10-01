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

  // Create realistic materials
  const createMaterials = () => {
    return {
      wood: new THREE.MeshStandardMaterial({ 
        color: '#8B4513', 
        roughness: 0.8, 
        metalness: 0.1,
        normalScale: new THREE.Vector2(0.5, 0.5)
      }),
      darkWood: new THREE.MeshStandardMaterial({ 
        color: '#654321', 
        roughness: 0.7, 
        metalness: 0.1 
      }),
      lightWood: new THREE.MeshStandardMaterial({ 
        color: '#DEB887', 
        roughness: 0.8, 
        metalness: 0.1 
      }),
      fabric: new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.9, 
        metalness: 0.0,
        bumpScale: 0.1
      }),
      leather: new THREE.MeshStandardMaterial({ 
        color: '#654321', 
        roughness: 0.6, 
        metalness: 0.0,
        bumpScale: 0.2
      }),
      metal: new THREE.MeshStandardMaterial({ 
        color: '#C0C0C0', 
        roughness: 0.2, 
        metalness: 0.8,
        envMapIntensity: 1.0
      }),
      chrome: new THREE.MeshStandardMaterial({ 
        color: '#E8E8E8', 
        roughness: 0.1, 
        metalness: 0.9,
        envMapIntensity: 1.5
      }),
      plastic: new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.3, 
        metalness: 0.1 
      }),
      glass: new THREE.MeshStandardMaterial({ 
        color: '#FFFFFF', 
        roughness: 0.0, 
        metalness: 0.0,
        transparent: true,
        opacity: 0.3,
        envMapIntensity: 1.0
      }),
      marble: new THREE.MeshStandardMaterial({ 
        color: '#F8F8FF', 
        roughness: 0.1, 
        metalness: 0.0 
      }),
      cushion: new THREE.MeshStandardMaterial({ 
        color: color, 
        roughness: 0.8, 
        metalness: 0.0 
      })
    };
  };

  // Create highly detailed furniture geometry
  const createDetailedFurniture = () => {
    const materials = createMaterials();

    switch (furnitureType) {
      // SEATING CATEGORY
      case 'sofa':
        return (
          <group>
            {/* Main frame */}
            <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 0.4, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Seat cushions */}
            <mesh position={[-0.55, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.15, 0.7]} />
              <primitive object={materials.cushion} />
            </mesh>
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.15, 0.7]} />
              <primitive object={materials.cushion} />
            </mesh>
            <mesh position={[0.55, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.15, 0.7]} />
              <primitive object={materials.cushion} />
            </mesh>
            {/* Back cushions */}
            <mesh position={[-0.55, 0.75, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.6, 0.2]} />
              <primitive object={materials.cushion} />
            </mesh>
            <mesh position={[0, 0.75, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.6, 0.2]} />
              <primitive object={materials.cushion} />
            </mesh>
            <mesh position={[0.55, 0.75, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.6, 0.2]} />
              <primitive object={materials.cushion} />
            </mesh>
            {/* Left armrest */}
            <mesh position={[-1.0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.8, 0.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Right armrest */}
            <mesh position={[1.0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.8, 0.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Legs */}
            {[[-0.9, 0.1, -0.35], [0.9, 0.1, -0.35], [-0.9, 0.1, 0.35], [0.9, 0.1, 0.35]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.03, 0.03, 0.2]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'armchair':
        return (
          <group>
            {/* Chair frame */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.5, 0.8]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Seat cushion */}
            <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.12, 0.7]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.9, -0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.8, 0.15]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.35, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.4, 0.6]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.35, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.4, 0.6]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Legs */}
            {[[-0.3, 0.125, -0.3], [0.3, 0.125, -0.3], [-0.3, 0.125, 0.3], [0.3, 0.125, 0.3]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.25]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'recliner':
        return (
          <group>
            {/* Main seat */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.15, 0.8]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Backrest (reclined) */}
            <mesh position={[0, 0.8, -0.4]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.9, 0.15]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Extended footrest */}
            <mesh position={[0, 0.25, 0.7]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.1, 0.6]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.5, 0.65, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.5, 0.7]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.5, 0.65, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.5, 0.7]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Base mechanism */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.2]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'loveseat':
        return (
          <group>
            {/* Frame */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.5, 0.8]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Seat cushions */}
            <mesh position={[-0.35, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.12, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.35, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.12, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Back cushions */}
            <mesh position={[-0.35, 0.8, -0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.5, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.35, 0.8, -0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.5, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.6, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.6, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.6, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Legs */}
            {[[-0.6, 0.125, -0.3], [0.6, 0.125, -0.3], [-0.6, 0.125, 0.3], [0.6, 0.125, 0.3]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.25]} />
                <primitive object={materials.darkWood} />
              </mesh>
            ))}
          </group>
        );

      case 'bench':
        return (
          <group>
            {/* Bench seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.08, 0.35]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Bench legs */}
            <mesh position={[-0.5, 0.225, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.45, 0.3]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.5, 0.225, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.45, 0.3]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Cross support */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.05, 0.05]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'stool':
      case 'bar_stool':
        return (
          <group>
            {/* Seat */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Seat padding */}
            <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.03]} />
              <primitive object={materials.cushion} />
            </mesh>
            {/* Central pole */}
            <mesh position={[0, 0.375, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.75]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Footrest ring */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.2, 0.02, 8, 16]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.1]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Base spokes */}
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} position={[Math.cos(i * Math.PI * 2 / 5) * 0.2, 0.02, Math.sin(i * Math.PI * 2 / 5) * 0.2]} castShadow receiveShadow>
                <boxGeometry args={[0.05, 0.02, 0.15]} />
                <primitive object={materials.chrome} />
              </mesh>
            ))}
          </group>
        );

      case 'bean_bag':
        return (
          <group>
            {/* Main bean bag body */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.5, 16, 12]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Flattened bottom */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.45, 0.45, 0.1]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Seam details */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.3, 0.02, 8, 16]} />
              <primitive object={materials.darkWood} />
            </mesh>
          </group>
        );

      case 'sectional_sofa':
        return (
          <group>
            {/* Main section frame */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.5, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Corner section frame */}
            <mesh position={[1.45, 0.25, 0.8]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.5, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Main section cushions */}
            <mesh position={[-0.5, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.12, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.5, 0.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.12, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Corner section cushion */}
            <mesh position={[1.45, 0.55, 0.8]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.12, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Back cushions */}
            <mesh position={[0, 0.8, -0.35]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.7, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[1.45, 0.8, 0.35]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.7, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'rocking_chair':
        return (
          <group>
            {/* Seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.08, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Backrest with curve */}
            <mesh position={[0, 0.85, -0.15]} rotation={[-0.1, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.8, 0.08]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.3, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.4, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.3, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.4, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Rockers */}
            <mesh position={[-0.2, 0.1, 0]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
              <torusGeometry args={[0.35, 0.03, 8, 16, Math.PI]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.2, 0.1, 0]} rotation={[0, 0, Math.PI/2]} castShadow receiveShadow>
              <torusGeometry args={[0.35, 0.03, 8, 16, Math.PI]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Support posts */}
            {[[-0.2, 0.225, -0.15], [0.2, 0.225, -0.15], [-0.2, 0.225, 0.15], [0.2, 0.225, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.04, 0.45, 0.04]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'dining_chair':
        return (
          <group>
            {/* Seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.06, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Seat cushion */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.04, 0.4]} />
              <primitive object={materials.cushion} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.8, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.7, 0.06]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Legs */}
            {[[-0.18, 0.225, -0.18], [0.18, 0.225, -0.18], [-0.18, 0.225, 0.18], [0.18, 0.225, 0.18]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.04, 0.45, 0.04]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Cross supports */}
            <mesh position={[0, 0.2, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.02, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.2, 0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.02, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'office_chair':
        return (
          <group>
            {/* Seat */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.08]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Backrest */}
            <mesh position={[0, 0.8, -0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.6, 0.08]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.25, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.06, 0.3, 0.2]} />
              <primitive object={materials.plastic} />
            </mesh>
            <mesh position={[0.25, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.06, 0.3, 0.2]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Central column */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.5]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.1]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Wheels */}
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} position={[Math.cos(i * Math.PI * 2 / 5) * 0.25, 0.03, Math.sin(i * Math.PI * 2 / 5) * 0.25]} castShadow receiveShadow>
                <sphereGeometry args={[0.03, 8, 6]} />
                <primitive object={materials.plastic} />
              </mesh>
            ))}
          </group>
        );

      // TABLES CATEGORY
      case 'coffee_table':
        return (
          <group>
            {/* Glass top */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.02, 0.6]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Wooden frame */}
            <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.25, 0.06, 0.65]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Legs */}
            {[[-0.5, 0.2, -0.25], [0.5, 0.2, -0.25], [-0.5, 0.2, 0.25], [0.5, 0.2, 0.25]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.4, 0.06]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Lower shelf */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.1, 0.02, 0.5]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'dining_table':
        return (
          <group>
            {/* Table top */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.08, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Table apron */}
            <mesh position={[0, 0.68, 0.41]} castShadow receiveShadow>
              <boxGeometry args={[1.7, 0.08, 0.08]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.68, -0.41]} castShadow receiveShadow>
              <boxGeometry args={[1.7, 0.08, 0.08]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.85, 0.68, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.08, 0.74]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[-0.85, 0.68, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.08, 0.74]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Legs */}
            {[[-0.8, 0.375, -0.4], [0.8, 0.375, -0.4], [-0.8, 0.375, 0.4], [0.8, 0.375, 0.4]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.75, 0.08]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'side_table':
        return (
          <group>
            {/* Top */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.05]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawer */}
            <mesh position={[0, 0.45, 0.22]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.12, 0.06]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.45, 0.26]} castShadow receiveShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Legs */}
            {[[-0.15, 0.3, -0.15], [0.15, 0.3, -0.15], [-0.15, 0.3, 0.15], [0.15, 0.3, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'console_table':
        return (
          <group>
            {/* Top */}
            <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.06, 0.35]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Legs */}
            {[[-0.6, 0.4, -0.15], [0.6, 0.4, -0.15], [-0.6, 0.4, 0.15], [0.6, 0.4, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.8, 0.06]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Lower shelf */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.04, 0.3]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'study_desk':
        return (
          <group>
            {/* Desktop */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.05, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Left pedestal */}
            <mesh position={[-0.4, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.7, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Right pedestal */}
            <mesh position={[0.4, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.7, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            <mesh position={[-0.4, 0.55, 0.28]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.12, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[-0.4, 0.35, 0.28]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.12, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[-0.4, 0.15, 0.28]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.12, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'office_table':
        return (
          <group>
            {/* Desktop */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.05, 0.8]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Metal legs */}
            {[[-0.7, 0.375, -0.35], [0.7, 0.375, -0.35], [-0.7, 0.375, 0.35], [0.7, 0.375, 0.35]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.75, 0.06]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
            {/* Cable management */}
            <mesh position={[0, 0.72, -0.35]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.08, 0.1]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'nightstand':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.6, 0.35]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Top drawer */}
            <mesh position={[0, 0.5, 0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Bottom drawer */}
            <mesh position={[0, 0.25, 0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handles */}
            <mesh position={[0.1, 0.5, 0.19]} castShadow receiveShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.06]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.1, 0.25, 0.19]} castShadow receiveShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.06]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Legs */}
            {[[-0.18, 0.075, -0.15], [0.18, 0.075, -0.15], [-0.18, 0.075, 0.15], [0.18, 0.075, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.15]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'folding_table':
        return (
          <group>
            {/* Top */}
            <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.04, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Folding legs */}
            <mesh position={[-0.4, 0.35, -0.25]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.7, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.4, 0.35, -0.25]} rotation={[0, 0, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.7, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[-0.4, 0.35, 0.25]} rotation={[0, 0, 0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.7, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.4, 0.35, 0.25]} rotation={[0, 0, -0.1]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.7, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Cross braces */}
            <mesh position={[0, 0.35, -0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.02, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0, 0.35, 0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.02, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'dressing_table':
        return (
          <group>
            {/* Main surface */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.1, 0.05, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Mirror */}
            <mesh position={[0, 1.2, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.9, 0.02]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Mirror frame */}
            <mesh position={[0, 1.2, -0.19]} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.95, 0.03]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            <mesh position={[-0.3, 0.6, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 0.12, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.3, 0.6, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 0.12, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Legs */}
            {[[-0.45, 0.375, -0.15], [0.45, 0.375, -0.15], [-0.45, 0.375, 0.15], [0.45, 0.375, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.75, 0.06]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      // BEDROOM CATEGORY
      case 'bed':
      case 'bed_frame':
        return (
          <group>
            {/* Bed frame */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.1, 0.3, 1.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Mattress */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.25, 1.5]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 0.8, -0.7]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 1.0, 0.1]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Headboard padding */}
            <mesh position={[0, 0.8, -0.65]} castShadow receiveShadow>
              <boxGeometry args={[2.1, 0.9, 0.08]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Pillows */}
            <mesh position={[-0.4, 0.55, -0.5]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.15, 0.4]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.4, 0.55, -0.5]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.15, 0.4]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Blanket */}
            <mesh position={[0, 0.52, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.08, 1.0]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'mattress':
        return (
          <group>
            {/* Main mattress */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.3, 1.5]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Mattress border */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.05, 0.32, 1.55]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Quilted pattern simulation */}
            {[-0.5, 0, 0.5].map((x, i) => 
              [-0.3, 0, 0.3].map((z, j) => (
                <mesh key={`${i}-${j}`} position={[x, 0.31, z]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.01]} />
                  <primitive object={materials.fabric} />
                </mesh>
              ))
            )}
          </group>
        );

      case 'wardrobe':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 2.0, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Left door */}
            <mesh position={[-0.3, 1.0, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 1.9, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Right door */}
            <mesh position={[0.3, 1.0, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 1.9, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Door handles */}
            <mesh position={[-0.1, 1.0, 0.32]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.08]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.1, 1.0, 0.32]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.08]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Internal shelves */}
            <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.15, 0.02, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.15, 0.02, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.15, 0.02, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'dresser':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.8, 0.5]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Top surface */}
            <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.45, 0.04, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            <mesh position={[0, 0.65, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.45, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.25, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handles */}
            {[0.65, 0.45, 0.25].map((y, i) => (
              <mesh key={i} position={[0, y, 0.27]} castShadow receiveShadow>
                <boxGeometry args={[0.15, 0.02, 0.02]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
            {/* Legs */}
            {[[-0.6, 0.1, -0.2], [0.6, 0.1, -0.2], [-0.6, 0.1, 0.2], [0.6, 0.1, 0.2]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'vanity':
        return (
          <group>
            {/* Main surface */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.05, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Mirror */}
            <mesh position={[0, 1.3, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 1.0, 0.02]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Mirror frame */}
            <mesh position={[0, 1.3, -0.19]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 1.05, 0.03]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            <mesh position={[-0.25, 0.6, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.1, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.25, 0.6, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.1, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Vanity lights */}
            <mesh position={[-0.25, 1.6, -0.15]} castShadow receiveShadow>
              <sphereGeometry args={[0.04, 8, 6]} />
              <primitive object={materials.glass} />
            </mesh>
            <mesh position={[0.25, 1.6, -0.15]} castShadow receiveShadow>
              <sphereGeometry args={[0.04, 8, 6]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Legs */}
            {[[-0.4, 0.375, -0.15], [0.4, 0.375, -0.15], [-0.4, 0.375, 0.15], [0.4, 0.375, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.05, 0.75, 0.05]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'headboard':
        return (
          <group>
            {/* Main headboard */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 1.2, 0.15]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Upholstered panel */}
            <mesh position={[0, 0.6, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 1.0, 0.08]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Tufted buttons */}
            {[-0.5, 0, 0.5].map((x, i) => 
              [0.3, 0.6, 0.9].map((y, j) => (
                <mesh key={`${i}-${j}`} position={[x, y, 0.13]} castShadow receiveShadow>
                  <cylinderGeometry args={[0.02, 0.02, 0.01]} />
                  <primitive object={materials.metal} />
                </mesh>
              ))
            )}
            {/* Mounting brackets */}
            <mesh position={[-0.8, 0.2, -0.05]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.2, 0.05]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.8, 0.2, -0.05]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.2, 0.05]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'chest_of_drawers':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 1.2, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Top */}
            <mesh position={[0, 1.22, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.04, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            {[1.0, 0.8, 0.6, 0.4, 0.2].map((y, i) => (
              <mesh key={i} position={[0, y, 0.21]} castShadow receiveShadow>
                <boxGeometry args={[0.75, 0.15, 0.02]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Handles */}
            {[1.0, 0.8, 0.6, 0.4, 0.2].map((y, i) => (
              <mesh key={i} position={[0, y, 0.22]} castShadow receiveShadow>
                <cylinderGeometry args={[0.008, 0.008, 0.06]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.1, 0.45]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'bunk_bed':
        return (
          <group>
            {/* Lower bed frame */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.3, 2.0]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Lower mattress */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.2, 1.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Upper bed frame */}
            <mesh position={[0, 1.55, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.3, 2.0]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Upper mattress */}
            <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.9, 0.2, 1.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Support posts */}
            {[[-0.45, 0.85, -0.9], [0.45, 0.85, -0.9], [-0.45, 0.85, 0.9], [0.45, 0.85, 0.9]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.08, 1.7, 0.08]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Ladder */}
            <mesh position={[0.6, 0.85, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.05, 1.7, 0.05]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Ladder rungs */}
            {[0.3, 0.6, 0.9, 1.2].map((y, i) => (
              <mesh key={i} position={[0.4, y, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.03, 0.03]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Safety rail */}
            <mesh position={[0, 1.9, 0.9]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.3, 0.05]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'bedside_lamp':
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Lampshade */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <coneGeometry args={[0.15, 0.2, 8]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Light bulb */}
            <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.03, 8, 6]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Switch */}
            <mesh position={[0.02, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.03, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      // KITCHEN CATEGORY
      case 'kitchen_cabinet':
        return (
          <group>
            {/* Cabinet body */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.9, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Door */}
            <mesh position={[0, 0.45, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 0.85, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Door panel */}
            <mesh position={[0, 0.45, 0.32]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.7, 0.01]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.25, 0.45, 0.33]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.15, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Internal shelves */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 0.02, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 0.02, 0.55]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Hinges */}
            <mesh position={[-0.35, 0.7, 0.31]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[-0.35, 0.2, 0.31]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'kitchen_island':
        return (
          <group>
            {/* Main island body */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.9, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Countertop */}
            <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.9, 0.05, 1.0]} />
              <primitive object={materials.marble} />
            </mesh>
            {/* Cabinet doors */}
            <mesh position={[-0.6, 0.45, 0.46]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.8, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.45, 0.46]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.8, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.6, 0.45, 0.46]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.8, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handles */}
            {[-0.6, 0, 0.6].map((x, i) => (
              <mesh key={i} position={[x, 0.45, 0.47]} castShadow receiveShadow>
                <cylinderGeometry args={[0.008, 0.008, 0.08]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
            {/* Bar stools */}
            <mesh position={[-0.6, 0.65, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.6, 0.65, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Stool legs */}
            <mesh position={[-0.6, 0.35, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.6]} />
              <primitive object={materials.chrome} />
            </mesh>
            <mesh position={[0.6, 0.35, -0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.025, 0.025, 0.6]} />
              <primitive object={materials.chrome} />
            </mesh>
          </group>
        );

      case 'pantry_shelf':
        return (
          <group>
            {/* Main frame */}
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 1.8, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Shelves */}
            {[0.3, 0.6, 0.9, 1.2, 1.5].map((y, i) => (
              <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.55, 0.03, 0.35]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Back panel */}
            <mesh position={[0, 0.9, -0.18]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 1.78, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Side panels */}
            <mesh position={[-0.28, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 1.78, 0.38]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.28, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 1.78, 0.38]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'dish_rack':
        return (
          <group>
            {/* Base tray */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.02, 0.3]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Plate slots */}
            {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
              <mesh key={i} position={[x, 0.15, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.02, 0.2, 0.25]} />
                <primitive object={materials.plastic} />
              </mesh>
            ))}
            {/* Cup holders */}
            <mesh position={[0.15, 0.1, 0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.15]} />
              <primitive object={materials.plastic} />
            </mesh>
            <mesh position={[0.15, 0.1, -0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.15]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Utensil holder */}
            <mesh position={[-0.2, 0.1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.15]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'countertop':
        return (
          <group>
            {/* Main surface */}
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.08, 0.6]} />
              <primitive object={materials.marble} />
            </mesh>
            {/* Edge trim */}
            <mesh position={[0, 0.86, 0.32]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.08, 0.04]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.86, -0.32]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.08, 0.04]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Support brackets */}
            {[-0.8, -0.4, 0, 0.4, 0.8].map((x, i) => (
              <mesh key={i} position={[x, 0.82, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.08, 0.5]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
          </group>
        );

      case 'dining_set':
        return (
          <group>
            {/* Table */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.6, 0.6, 0.05]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Table base */}
            <mesh position={[0, 0.375, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.75]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Chairs around table */}
            {[0, 1, 2, 3].map((i) => {
              const angle = (i * Math.PI * 2) / 4;
              const x = Math.cos(angle) * 0.8;
              const z = Math.sin(angle) * 0.8;
              return (
                <group key={i} position={[x, 0, z]} rotation={[0, angle + Math.PI, 0]}>
                  <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.4, 0.06, 0.4]} />
                    <primitive object={materials.wood} />
                  </mesh>
                  <mesh position={[0, 0.75, -0.15]} castShadow receiveShadow>
                    <boxGeometry args={[0.4, 0.6, 0.06]} />
                    <primitive object={materials.wood} />
                  </mesh>
                  {[[-0.15, 0.225, -0.15], [0.15, 0.225, -0.15], [-0.15, 0.225, 0.15], [0.15, 0.225, 0.15]].map((pos, j) => (
                    <mesh key={j} position={pos} castShadow receiveShadow>
                      <boxGeometry args={[0.03, 0.45, 0.03]} />
                      <primitive object={materials.wood} />
                    </mesh>
                  ))}
                </group>
              );
            })}
          </group>
        );

      case 'sink_unit':
        return (
          <group>
            {/* Cabinet body */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.9, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Countertop */}
            <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.85, 0.04, 0.65]} />
              <primitive object={materials.marble} />
            </mesh>
            {/* Sink basin */}
            <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.18, 0.15]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Faucet */}
            <mesh position={[0, 1.1, -0.15]} castShadow receiveShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.25]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Faucet head */}
            <mesh position={[0, 1.05, 0.1]} castShadow receiveShadow>
              <sphereGeometry args={[0.03, 8, 6]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Cabinet doors */}
            <mesh position={[-0.2, 0.45, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.8, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.2, 0.45, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.35, 0.8, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
          </group>
        );

      case 'storage_rack':
        return (
          <group>
            {/* Vertical posts */}
            <mesh position={[-0.15, 0.6, -0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 1.2, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.15, 0.6, -0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 1.2, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[-0.15, 0.6, 0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 1.2, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.15, 0.6, 0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 1.2, 0.04]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Shelves */}
            {[0.3, 0.6, 0.9].map((y, i) => (
              <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
                <boxGeometry args={[0.35, 0.02, 0.35]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
            {/* Wire baskets */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.15, 0.3]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.15, 0.3]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      // APPLIANCES CATEGORY
      case 'refrigerator':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.65, 1.8, 0.65]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Freezer door */}
            <mesh position={[0.33, 1.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.6, 0.6]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Main door */}
            <mesh position={[0.33, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 1.2, 0.6]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Handles */}
            <mesh position={[0.35, 1.7, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.2, 0.03]} />
              <primitive object={materials.chrome} />
            </mesh>
            <mesh position={[0.35, 0.8, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.3, 0.03]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Water dispenser */}
            <mesh position={[0.32, 1.2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.15, 0.1]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Compressor grille */}
            <mesh position={[0, 0.1, -0.32]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.15, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'microwave_oven':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.3, 0.4]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Door */}
            <mesh position={[0.26, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.25, 0.35]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Door window */}
            <mesh position={[0.27, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.2, 0.25]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.28, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.12, 0.02]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0.1, 0.25, 0.21]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 0.15, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Display */}
            <mesh position={[0.05, 0.28, 0.21]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.03, 0.005]} />
              <primitive object={materials.glass} />
            </mesh>
          </group>
        );

      case 'washing_machine':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.425, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.85, 0.6]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Top lid */}
            <mesh position={[0, 0.86, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 0.04, 0.58]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Front door */}
            <mesh position={[0.31, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.22, 0.22, 0.02]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Door frame */}
            <mesh position={[0.32, 0.5, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.01]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.33, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.15, 0.03]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 0.8, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.08, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Detergent dispenser */}
            <mesh position={[-0.15, 0.75, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.1, 0.05, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'dishwasher':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.425, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.85, 0.6]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Front panel */}
            <mesh position={[0.31, 0.425, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.8, 0.55]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.32, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.4, 0.02]} />
              <primitive object={materials.chrome} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 0.8, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.06, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Dish racks inside */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.02, 0.5]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.02, 0.5]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'air_conditioner':
        return (
          <group>
            {/* Main unit */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.3, 0.25]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Front grille */}
            <mesh position={[0, 0.15, 0.13]} castShadow receiveShadow>
              <boxGeometry args={[0.75, 0.25, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Louvers */}
            {[-0.08, -0.04, 0, 0.04, 0.08].map((y, i) => (
              <mesh key={i} position={[0, 0.15 + y, 0.14]} castShadow receiveShadow>
                <boxGeometry args={[0.7, 0.01, 0.005]} />
                <primitive object={materials.plastic} />
              </mesh>
            ))}
            {/* Side vents */}
            <mesh position={[-0.41, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.2, 0.2]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.41, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.2, 0.2]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Remote sensor */}
            <mesh position={[0.2, 0.2, 0.13]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.01]} />
              <primitive object={materials.glass} />
            </mesh>
          </group>
        );

      case 'blender':
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.16]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Jar */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.08, 0.1, 0.25]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.39, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.09, 0.09, 0.03]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Blades */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI/2, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.01, 0.01]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control buttons */}
            <mesh position={[0, 0.12, 0.11]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'toaster':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.2, 0.2]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Slots */}
            <mesh position={[-0.06, 0.21, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.02, 0.15]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.06, 0.21, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.02, 0.15]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Lever */}
            <mesh position={[0.12, 0.15, 0.08]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.08, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Control dial */}
            <mesh position={[0.12, 0.15, -0.05]} castShadow receiveShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Crumb tray */}
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 0.01, 0.18]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'electric_kettle':
        return (
          <group>
            {/* Kettle body */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.12, 16, 12]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Spout */}
            <mesh position={[0.15, 0.2, 0]} rotation={[0, 0, -0.3]} castShadow receiveShadow>
              <cylinderGeometry args={[0.02, 0.03, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Handle */}
            <mesh position={[-0.1, 0.2, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.06, 0.01, 8, 16, Math.PI]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.13, 0.13, 0.04]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Power indicator */}
            <mesh position={[0.08, 0.18, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.005, 0.005, 0.01]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.27, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.11, 0.11, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      case 'induction_cooktop':
        return (
          <group>
            {/* Main surface */}
            <mesh position={[0, 0.025, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.05, 0.4]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Cooking zones */}
            <mesh position={[-0.15, 0.051, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.001]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.15, 0.051, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.1, 0.1, 0.001]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 0.051, -0.15]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.001, 0.08]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Touch controls */}
            {[-0.1, -0.05, 0, 0.05, 0.1].map((x, i) => (
              <mesh key={i} position={[x, 0.052, -0.15]} castShadow receiveShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.001]} />
                <primitive object={materials.glass} />
              </mesh>
            ))}
          </group>
        );

      case 'vacuum_cleaner':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.6]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.8, -0.1]} rotation={[-0.3, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.6]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Brush head */}
            <mesh position={[0, 0.05, 0.25]} castShadow receiveShadow>
              <boxGeometry args={[0.25, 0.1, 0.15]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Hose */}
            <mesh position={[0, 0.4, 0.2]} rotation={[0.5, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.3]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.1, 0.04, -0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
            <mesh position={[0.1, 0.04, -0.1]} castShadow receiveShadow>
              <cylinderGeometry args={[0.04, 0.04, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Dust bag indicator */}
            <mesh position={[0, 0.5, 0.16]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.01]} />
              <primitive object={materials.glass} />
            </mesh>
          </group>
        );

      case 'water_purifier':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.5]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Top cap */}
            <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.19, 0.19, 0.04]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Filter cartridge */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.12, 0.12, 0.3]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Spout */}
            <mesh position={[0.15, 0.4, 0]} rotation={[0, 0, -0.5]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.015, 0.08]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 0.4, 0.19]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.08, 0.01]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* LED indicators */}
            <mesh position={[-0.03, 0.42, 0.19]} castShadow receiveShadow>
              <cylinderGeometry args={[0.005, 0.005, 0.005]} />
              <primitive object={materials.glass} />
            </mesh>
            <mesh position={[0.03, 0.42, 0.19]} castShadow receiveShadow>
              <cylinderGeometry args={[0.005, 0.005, 0.005]} />
              <primitive object={materials.glass} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.04]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      // PLANTS AND LIGHTING
      case 'plant':
        return (
          <group>
            {/* Pot */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.12, 0.1, 0.2]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Soil */}
            <mesh position={[0, 0.19, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.11, 0.11, 0.02]} />
              <primitive object={materials.darkWood} />
            </mesh>
            {/* Main stem */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.3]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Leaves */}
            {[0.3, 0.4, 0.5].map((y, i) => 
              [0, 1, 2, 3].map((j) => {
                const angle = (j * Math.PI * 2) / 4;
                const x = Math.cos(angle) * 0.08;
                const z = Math.sin(angle) * 0.08;
                return (
                  <mesh key={`${i}-${j}`} position={[x, y, z]} rotation={[0, angle, 0]} castShadow receiveShadow>
                    <boxGeometry args={[0.06, 0.01, 0.12]} />
                    <meshStandardMaterial color="#16A34A" />
                  </mesh>
                );
              })
            )}
          </group>
        );

      case 'light':
        return (
          <group>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.06, 0.06, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Stem */}
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.4]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Lampshade */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <coneGeometry args={[0.12, 0.15, 8]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Light bulb */}
            <mesh position={[0, 0.43, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.025, 8, 6]} />
              <meshStandardMaterial 
                color="#FFF8DC" 
                emissive="#FFF8DC" 
                emissiveIntensity={0.3}
                transparent
                opacity={0.8}
              />
            </mesh>
            {/* Switch cord */}
            <mesh position={[0.08, 0.2, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.003, 0.003, 0.1]} />
              <primitive object={materials.plastic} />
            </mesh>
          </group>
        );

      default:
        return (
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  // Render loaded model or detailed fallback
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
          {createDetailedFurniture()}
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