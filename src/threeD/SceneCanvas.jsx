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
  useProgress
} from '@react-three/drei';

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

const SceneCanvas = ({ 
  children, 
  cameraPosition = [10, 10, 10],
  lightingMode = 'day',
  showGrid = true,
  showShadows = true,
  environmentPreset = 'apartment',
  ...props 
}) => {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows={showShadows}
        camera={{ position: cameraPosition, fov: 60 }}
        gl={{ 
          antialias: true,
          powerPreference: "high-performance"
        }}
        {...props}
      >
        <Suspense fallback={<Loader />}>
          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={30}
            maxPolarAngle={Math.PI / 2}
            target={[0, 4, 0]}
          />

          {/* Lighting Setup */}
          <ambientLight intensity={lightingMode === 'day' ? 0.4 : 0.1} />
          <directionalLight
            position={[15, 15, 10]}
            intensity={lightingMode === 'day' ? 0.8 : 0.2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
          />
          <directionalLight
            position={[-8, 8, -8]}
            intensity={lightingMode === 'day' ? 0.2 : 0.05}
          />

          {/* Environment */}
          <Environment preset={environmentPreset} />
          
          {/* Sky */}
          {lightingMode === 'day' && <Sky sunPosition={[100, 20, 100]} />}
          {lightingMode === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />}


          {/* Contact Shadows */}
          {showShadows && (
            <ContactShadows
              position={[0, 0, 0]}
              opacity={0.4}
              scale={15}
              blur={1}
              far={10}
              resolution={256}
              color="#000000"
            />
          )}

          {/* Night lighting */}
          {lightingMode === 'night' && (
            <>
              <pointLight position={[0, 7, 0]} intensity={0.3} color="#ffffff" />
              <spotLight
                position={[8, 10, 8]}
                angle={0.3}
                penumbra={1}
                intensity={0.3}
                castShadow
              />
            </>
          )}

          {/* Render children (furniture components) */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneCanvas;