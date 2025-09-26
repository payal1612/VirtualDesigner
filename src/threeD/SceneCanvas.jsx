import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Grid, 
  ContactShadows,
  Sky,
  Stars,
  Html,
  useProgress,
  Bounds
} from '@react-three/drei';
import * as THREE from 'three';

// Loading component
const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="text-gray-600 font-medium">Loading 3D Scene...</div>
        <div className="text-sm text-gray-500">{Math.round(progress)}% loaded</div>
      </div>
    </Html>
  );
};

// Lighting setup
const SceneLighting = ({ mode = 'day' }) => {
  return (
    <>
      <ambientLight intensity={mode === 'day' ? 0.6 : 0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={mode === 'day' ? 1 : 0.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={mode === 'day' ? 0.3 : 0.1}
      />

      {mode === 'night' && (
        <>
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
          <spotLight
            position={[5, 8, 5]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
        </>
      )}
    </>
  );
};

const SceneCanvas = ({ 
  children, 
  cameraPosition = [10, 10, 10],
  showGrid = true,
  showShadows = true,
  lightingMode = 'day',
  environmentPreset = 'apartment',
  enableControls = true,
  ...props 
}) => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={showShadows}
        camera={{ position: cameraPosition, fov: 60 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance",
          alpha: true
        }}
        {...props}
      >
        <Suspense fallback={<Loader />}>
          {/* Camera Controls */}
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={50}
              maxPolarAngle={Math.PI / 2}
            />
          )}

          {/* Lighting */}
          <SceneLighting mode={lightingMode} />

          {/* Environment */}
          <Environment preset={environmentPreset} />
          
          {/* Sky/Stars based on lighting mode */}
          {lightingMode === 'day' && <Sky sunPosition={[100, 20, 100]} />}
          {lightingMode === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />}

          {/* Grid */}
          {showGrid && (
            <Grid
              args={[20, 20]}
              cellSize={1}
              cellThickness={0.5}
              cellColor="#6b7280"
              sectionSize={5}
              sectionThickness={1}
              sectionColor="#374151"
              fadeDistance={25}
              fadeStrength={1}
              followCamera={false}
              infiniteGrid={true}
            />
          )}

          {/* Ground Plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#f3f4f6" />
          </mesh>

          {/* Contact Shadows */}
          {showShadows && (
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.4}
              scale={20}
              blur={1}
              far={10}
              resolution={256}
              color="#000000"
            />
          )}

          {/* Scene Content */}
          <Bounds fit clip observe margin={1.2}>
            {children}
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;