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

  // Create realistic procedural furniture geometry based on type
  const createRealisticFurniture = () => {
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
      }),
      leather: new THREE.MeshStandardMaterial({ 
        color: '#654321', 
        roughness: 0.6, 
        metalness: 0.0 
      })
    };

    switch (furnitureType) {
      case 'sofa':
        return (
          <group>
            {/* Sofa base */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 0.5, 0.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Sofa back */}
            <mesh position={[0, 0.8, -0.35]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 0.9, 0.2]} />
              <primitive object={materials.fabric} />
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
            {/* Cushions */}
            <mesh position={[-0.5, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.2, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[0.5, 0.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.2, 0.7]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'chair':
      case 'armchair':
      case 'dining_chair':
      case 'office_chair':
        return (
          <group>
            {/* Chair seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.08, 0.5]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Chair back */}
            <mesh position={[0, 0.8, -0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.7, 0.08]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Chair legs */}
            {[[-0.2, 0.225, -0.2], [0.2, 0.225, -0.2], [-0.2, 0.225, 0.2], [0.2, 0.225, 0.2]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.45]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
            {/* Armrests */}
            <mesh position={[-0.3, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.08, 0.4]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.3, 0.65, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.08, 0.08, 0.4]} />
              <primitive object={materials.leather} />
            </mesh>
          </group>
        );

      case 'recliner':
        return (
          <group>
            {/* Recliner seat */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 0.15, 0.8]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Recliner back */}
            <mesh position={[0, 0.9, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[0.8, 1.0, 0.15]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Footrest */}
            <mesh position={[0, 0.2, 0.6]} castShadow receiveShadow>
              <boxGeometry args={[0.7, 0.1, 0.5]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Armrests */}
            <mesh position={[-0.5, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.6, 0.8]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.5, 0.7, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.15, 0.6, 0.8]} />
              <primitive object={materials.leather} />
            </mesh>
          </group>
        );

      case 'loveseat':
        return (
          <group>
            {/* Loveseat base */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.4, 0.8]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Loveseat back */}
            <mesh position={[0, 0.7, -0.3]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.8, 0.15]} />
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
          </group>
        );

      case 'bench':
        return (
          <group>
            {/* Bench seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 0.08, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Bench legs */}
            {[[-0.5, 0.225, -0.15], [0.5, 0.225, -0.15], [-0.5, 0.225, 0.15], [0.5, 0.225, 0.15]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.45, 0.08]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'stool':
      case 'bar_stool':
        return (
          <group>
            {/* Stool seat */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
            {/* Stool leg */}
            <mesh position={[0, 0.375, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.75]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'bean_bag':
        return (
          <group>
            {/* Bean bag body */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.6, 16, 12]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'sectional_sofa':
        return (
          <group>
            {/* Main section */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.5, 0.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Corner section */}
            <mesh position={[1.5, 0.3, 0.8]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.5, 0.9]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Back cushions */}
            <mesh position={[0, 0.8, -0.35]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.9, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
            <mesh position={[1.5, 0.8, 0.45]} castShadow receiveShadow>
              <boxGeometry args={[1.0, 0.9, 0.2]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'rocking_chair':
        return (
          <group>
            {/* Chair seat */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.08, 0.5]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Chair back */}
            <mesh position={[0, 0.9, -0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.9, 0.08]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Rockers */}
            <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
              <torusGeometry args={[0.4, 0.03, 8, 16, Math.PI]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Chair legs */}
            {[[-0.2, 0.225, -0.2], [0.2, 0.225, -0.2], [-0.2, 0.225, 0.2], [0.2, 0.225, 0.2]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.05, 0.45, 0.05]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

      case 'bed':
      case 'bed_frame':
        return (
          <group>
            {/* Mattress */}
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.25, 1.6]} />
              <primitive object={materials.fabric} />
            </mesh>
            {/* Headboard */}
            <mesh position={[0, 0.8, -0.75]} castShadow receiveShadow>
              <boxGeometry args={[2.2, 1.0, 0.1]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Bed frame */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.1, 0.15, 1.7]} />
              <primitive object={materials.wood} />
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
          </group>
        );

      case 'mattress':
        return (
          <group>
            {/* Mattress */}
            <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.0, 0.3, 1.6]} />
              <primitive object={materials.fabric} />
            </mesh>
          </group>
        );

      case 'wardrobe':
        return (
          <group>
            {/* Wardrobe body */}
            <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.2, 2.0, 0.6]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Doors */}
            <mesh position={[-0.3, 1.0, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 1.9, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0.3, 1.0, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.58, 1.9, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handles */}
            <mesh position={[-0.1, 1.0, 0.32]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
            <mesh position={[0.1, 1.0, 0.32]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.1]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'dresser':
        return (
          <group>
            {/* Dresser body */}
            <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.4, 0.8, 0.5]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawers */}
            <mesh position={[0, 0.6, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.4, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            <mesh position={[0, 0.2, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[1.3, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handles */}
            {[0.6, 0.4, 0.2].map((y, i) => (
              <mesh key={i} position={[0, y, 0.27]} castShadow receiveShadow>
                <cylinderGeometry args={[0.01, 0.01, 0.08]} />
                <primitive object={materials.metal} />
              </mesh>
            ))}
          </group>
        );

      case 'nightstand':
        return (
          <group>
            {/* Nightstand body */}
            <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.45, 0.6, 0.4]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Drawer */}
            <mesh position={[0, 0.45, 0.21]} castShadow receiveShadow>
              <boxGeometry args={[0.4, 0.15, 0.02]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Handle */}
            <mesh position={[0, 0.45, 0.22]} castShadow receiveShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.06]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'table':
      case 'dining_table':
      case 'coffee_table':
      case 'side_table':
      case 'console_table':
      case 'study_desk':
      case 'office_table':
      case 'folding_table':
      case 'dressing_table':
        return (
          <group>
            {/* Table top */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.08, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Table legs */}
            {[[-0.7, 0.375, -0.4], [0.7, 0.375, -0.4], [-0.7, 0.375, 0.4], [0.7, 0.375, 0.4]].map((pos, i) => (
              <mesh key={i} position={pos} castShadow receiveShadow>
                <boxGeometry args={[0.08, 0.75, 0.08]} />
                <primitive object={materials.wood} />
              </mesh>
            ))}
          </group>
        );

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
            {/* Handle */}
            <mesh position={[0.2, 0.45, 0.32]} castShadow receiveShadow>
              <cylinderGeometry args={[0.01, 0.01, 0.08]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'kitchen_island':
        return (
          <group>
            {/* Island base */}
            <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.8, 0.9, 0.9]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Countertop */}
            <mesh position={[0, 0.92, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.9, 0.05, 1.0]} />
              <primitive object={materials.wood} />
            </mesh>
            {/* Stools */}
            <mesh position={[-0.6, 0.65, 0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
            <mesh position={[0.6, 0.65, 0.6]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.05]} />
              <primitive object={materials.leather} />
            </mesh>
          </group>
        );

      case 'refrigerator':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.65, 1.8, 0.65]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Door */}
            <mesh position={[0.31, 0.9, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.03, 1.75, 0.6]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Handle */}
            <mesh position={[0.35, 1.2, 0.2]} castShadow receiveShadow>
              <boxGeometry args={[0.02, 0.3, 0.03]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Freezer compartment */}
            <mesh position={[0, 1.5, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.6, 0.5, 0.02]} />
              <primitive object={materials.plastic} />
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
            {/* Door */}
            <mesh position={[0.31, 0.6, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 0.8, 0.31]} castShadow receiveShadow>
              <boxGeometry args={[0.5, 0.1, 0.02]} />
              <primitive object={materials.plastic} />
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
            {/* Handle */}
            <mesh position={[0.27, 0.05, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.01, 0.15, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
          </group>
        );

      case 'air_cooler':
        return (
          <group>
            {/* Main body */}
            <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.25, 0.25, 1.5]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Fan grill */}
            <mesh position={[0, 1.2, 0.26]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.02]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Fan blades */}
            <mesh position={[0, 1.2, 0.27]} castShadow receiveShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.01]} />
              <primitive object={materials.metal} />
            </mesh>
            {/* Control panel */}
            <mesh position={[0, 1.0, 0.26]} castShadow receiveShadow>
              <boxGeometry args={[0.3, 0.1, 0.02]} />
              <primitive object={materials.plastic} />
            </mesh>
            {/* Base */}
            <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.3, 0.3, 0.1]} />
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
          {createRealisticFurniture()}
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