'use client';

import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import { OceanEnvironment } from './OceanEnvironment';
import { MainFish } from './MainFish';
import { SmallFishSchool } from './SmallFishSchool';
import { BubbleParticles } from './BubbleParticles';
import { CoralReef } from './CoralReef';
import { SunRays } from './SunRays';
import { OceanFloor } from './OceanFloor';

export function OceanScene({ scrollProgress, isMobile }) {
  const cameraRef = useRef();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 0, 30);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x031B35, 1);
        gl.toneMapping = 1;
        gl.toneMappingExposure = 1.2;
      }}
    >
      <PerspectiveCamera makeDefault ref={cameraRef} position={[0, 0, 30]} fov={50} near={0.1} far={1000} />
      
      <OceanEnvironment scrollProgress={scrollProgress} />
      <SunRays scrollProgress={scrollProgress} />
      
      <Suspense fallback={null}>
        <MainFish scrollProgress={scrollProgress} />
        <SmallFishSchool count={isMobile ? 15 : 30} scrollProgress={scrollProgress} />
        <BubbleParticles count={isMobile ? 50 : 150} scrollProgress={scrollProgress} />
        <CoralReef scrollProgress={scrollProgress} />
        <OceanFloor scrollProgress={scrollProgress} />
      </Suspense>
      
      <OrbitControls 
        enablePan={false} 
        enableZoom={false} 
        enableRotate={false}
        enabled={false}
      />
      
      <Html fullscreen>
        <div id="html-overlay" style={{ pointerEvents: 'auto' }} />
      </Html>
    </Canvas>
  );
}

export function OceanSceneWrapper({ scrollProgress, isMobile }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100vh' }}>
      <OceanScene scrollProgress={scrollProgress} isMobile={isMobile} />
    </div>
  );
}