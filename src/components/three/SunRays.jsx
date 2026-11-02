'use client';

import { useFrame, useRef, useEffect } from 'react';
import * as THREE from 'three';

export function SunRays({ scrollProgress = 0 }) {
  const raysRef = useRef();
  const rayMeshesRef = useRef([]);

  useEffect(() => {
    if (!raysRef.current) return;

    const rayCount = 12;
    const maxDistance = 200;

    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const width = 8 + Math.random() * 12;
      const height = maxDistance;
      
      const geometry = new THREE.PlaneGeometry(width, height, 1, 8);
      const positions = geometry.attributes.position.array;
      
      for (let j = 0; j < positions.length / 3; j++) {
        const y = positions[j * 3 + 1];
        const fade = 1 - (y + height / 2) / height;
        positions[j * 3] *= fade * 0.5;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.translate(0, -height / 2, 0);

      const material = new THREE.MeshBasicMaterial({
        color: 0x67E8F9,
        transparent: true,
        opacity: 0.03 + Math.random() * 0.05,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const ray = new THREE.Mesh(geometry, material);
      ray.position.set(
        Math.cos(angle) * 5,
        100,
        Math.sin(angle) * 5
      );
      ray.rotation.y = angle;
      ray.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      ray.userData = { baseAngle: angle, baseOpacity: material.opacity, rotationSpeed: 0.01 + Math.random() * 0.02 };
      
      rayMeshesRef.current.push(ray);
      raysRef.current.add(ray);
    }

    const causticGeometry = new THREE.PlaneGeometry(200, 200);
    const causticMaterial = new THREE.MeshBasicMaterial({
      color: 0x67E8F9,
      transparent: true,
      opacity: 0.05,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const caustics = new THREE.Mesh(causticGeometry, causticMaterial);
    caustics.rotation.x = -Math.PI / 2;
    caustics.position.y = -15;
    caustics.name = 'caustics';
    raysRef.current.add(caustics);
    rayMeshesRef.current.push(caustics);

    return () => {
      rayMeshesRef.current.forEach(ray => {
        raysRef.current?.remove(ray);
        if (ray.geometry) ray.geometry.dispose();
        if (ray.material) ray.material.dispose();
      });
      rayMeshesRef.current = [];
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    rayMeshesRef.current.forEach(ray => {
      if (ray.name === 'caustics') {
        ray.material.opacity = 0.03 + Math.sin(time * 0.5) * 0.02;
        ray.rotation.z = time * 0.02;
        ray.scale.setScalar(1 + Math.sin(time * 0.3) * 0.1);
      } else {
        const { baseAngle, baseOpacity, rotationSpeed } = ray.userData;
        ray.rotation.y = baseAngle + Math.sin(time * rotationSpeed) * 0.1;
        ray.material.opacity = baseOpacity * (0.5 + Math.sin(time * 0.7 + baseAngle) * 0.5);
        ray.position.y = 100 + Math.sin(time * 0.3 + baseAngle) * 5;
      }
    });
  });

  return <group ref={raysRef} name="sun-rays" />;
}