'use client';

import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

export function BubbleParticles({ count = 150, scrollProgress = 0 }) {
  const particlesRef = useRef();
  const particleDataRef = useRef([]);

  useEffect(() => {
    if (!particlesRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const opacities = new Float32Array(count);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = Math.random() * 50 - 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50;
      
      sizes[i] = 0.05 + Math.random() * 0.3;
      opacities[i] = 0.1 + Math.random() * 0.4;
      speeds[i] = 0.5 + Math.random() * 2;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    geometry.setAttribute('offset', new THREE.BufferAttribute(offsets, 1));

    const material = new THREE.PointsMaterial({
      color: 0x67E8F9,
      size: 1,
      transparent: true,
      opacity: 0.6,
      vertexColors: false,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.name = 'bubbles';
    particlesRef.current.add(particles);
    particleDataRef.current = { geometry, material, particles };

    return () => {
      if (particlesRef.current && particles) {
        particlesRef.current.remove(particles);
        geometry.dispose();
        material.dispose();
      }
    };
  }, [count]);

  useFrame((state, delta) => {
    const { geometry, particles } = particleDataRef.current;
    if (!geometry || !particles) return;

    const time = state.clock.getElapsedTime();
    const positions = geometry.attributes.position.array;
    const sizes = geometry.attributes.size.array;
    const speeds = geometry.attributes.speed.array;
    const offsets = geometry.attributes.offset.array;
    const count = positions.length / 3;

    const scrollOffset = scrollProgress * 300;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += speeds[i] * delta * 0.5;
      positions[i * 3] += Math.sin(time * speeds[i] + offsets[i]) * 0.02;
      positions[i * 3 + 2] += Math.cos(time * speeds[i] * 0.7 + offsets[i]) * 0.015;

      if (positions[i * 3 + 1] > 25) {
        positions[i * 3 + 1] = -25;
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100 - 50 - scrollOffset;
      }

      const yNormalized = (positions[i * 3 + 1] + 25) / 50;
      positions[i * 3 + 3] = sizes[i] * (0.5 + yNormalized * 0.5);
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;
  });

  return <group ref={particlesRef} name="bubble-particles" />;
}