'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export function OceanEnvironment({ scrollProgress = 0 }) {
  const { scene } = useThree();
  const fogRef = useRef();
  const lightRefs = useRef({});

  useMemo(() => {
    const fog = new THREE.FogExp2(0x031B35, 0.008);
    fogRef.current = fog;
    scene.fog = fog;

    const ambientLight = new THREE.AmbientLight(0x67E8F9, 0.4);
    ambientLight.name = 'ambient';
    scene.add(ambientLight);
    lightRefs.current.ambient = ambientLight;

    const sunLight = new THREE.DirectionalLight(0xFFFFFF, 2);
    sunLight.position.set(100, 200, 50);
    sunLight.name = 'sun';
    scene.add(sunLight);
    lightRefs.current.sun = sunLight;

    const fillLight = new THREE.DirectionalLight(0x06B6D4, 0.8);
    fillLight.position.set(-50, 50, -50);
    fillLight.name = 'fill';
    scene.add(fillLight);
    lightRefs.current.fill = fillLight;

    const rimLight = new THREE.DirectionalLight(0x67E8F9, 0.5);
    rimLight.position.set(0, -100, -100);
    rimLight.name = 'rim';
    scene.add(rimLight);
    lightRefs.current.rim = rimLight;

    const causticLight = new THREE.SpotLight(0x67E8F9, 1.5, 200, Math.PI / 6, 0.5, 1);
    causticLight.position.set(0, 150, 0);
    causticLight.target.position.set(0, 0, 0);
    causticLight.name = 'caustic';
    scene.add(causticLight);
    scene.add(causticLight.target);
    lightRefs.current.caustic = causticLight;

    return () => {
      scene.remove(ambientLight, sunLight, fillLight, rimLight, causticLight, causticLight.target);
      scene.fog = null;
    };
  }, [scene]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (lightRefs.current.caustic) {
      lightRefs.current.caustic.target.position.x = Math.sin(time * 0.3) * 30;
      lightRefs.current.caustic.target.position.z = Math.cos(time * 0.2) * 30;
      lightRefs.current.caustic.target.updateMatrixWorld();
    }

    if (lightRefs.current.sun) {
      lightRefs.current.sun.position.y = 200 + Math.sin(time * 0.1) * 20;
    }

    if (fogRef.current) {
      fogRef.current.density = 0.008 + scrollProgress * 0.004;
    }
  });

  return null;
}