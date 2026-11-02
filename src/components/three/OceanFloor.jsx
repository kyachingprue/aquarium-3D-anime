'use client';

import { useFrame, useRef, useEffect } from 'react';
import * as THREE from 'three';

export function OceanFloor({ scrollProgress = 0 }) {
  const floorRef = useRef();
  const rocksRef = useRef([]);
  const sandParticlesRef = useRef(null);

  useEffect(() => {
    if (!floorRef.current) return;

    const floorGeometry = new THREE.PlaneGeometry(500, 500, 100, 100);
    const positions = floorGeometry.attributes.position.array;
    
    for (let i = 0; i < positions.length / 3; i++) {
      const x = positions[i * 3];
      const z = positions[i * 3 + 2];
      const noise = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 0.5 +
                    Math.sin(x * 0.1 + 100) * Math.cos(z * 0.1 + 200) * 0.25;
      positions[i * 3 + 1] = noise;
    }
    floorGeometry.computeVertexNormals();
    floorGeometry.attributes.position.needsUpdate = true;

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a2a3a,
      roughness: 0.95,
      metalness: 0.02,
      vertexColors: false,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -15.5;
    floor.receiveShadow = true;
    floor.name = 'ocean-floor';
    floorRef.current.add(floor);

    const rockGeometry = new THREE.DodecahedronGeometry(1, 0);
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a3a4a,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true,
    });

    for (let i = 0; i < 100; i++) {
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(
        (Math.random() - 0.5) * 400,
        -15 + Math.random() * 1,
        (Math.random() - 0.5) * 400 - 100
      );
      rock.scale.setScalar(0.5 + Math.random() * 3);
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      rock.castShadow = true;
      rock.receiveShadow = true;
      rocksRef.current.push(rock);
      floorRef.current.add(rock);
    }

    const particleCount = 2000;
    const sandGeometry = new THREE.BufferGeometry();
    const sandPositions = new Float32Array(particleCount * 3);
    const sandSizes = new Float32Array(particleCount);
    const sandColors = new Float32Array(particleCount * 3);

    const sandColor1 = new THREE.Color(0x2a3a4a);
    const sandColor2 = new THREE.Color(0x3a4a5a);
    const sandColor3 = new THREE.Color(0x1a2a3a);

    for (let i = 0; i < particleCount; i++) {
      sandPositions[i * 3] = (Math.random() - 0.5) * 500;
      sandPositions[i * 3 + 1] = -15 + Math.random() * 0.5;
      sandPositions[i * 3 + 2] = (Math.random() - 0.5) * 500 - 100;
      
      sandSizes[i] = 0.02 + Math.random() * 0.08;
      
      const colorChoice = Math.random();
      const color = colorChoice < 0.33 ? sandColor1 : colorChoice < 0.66 ? sandColor2 : sandColor3;
      sandColors[i * 3] = color.r;
      sandColors[i * 3 + 1] = color.g;
      sandColors[i * 3 + 2] = color.b;
    }

    sandGeometry.setAttribute('position', new THREE.BufferAttribute(sandPositions, 3));
    sandGeometry.setAttribute('size', new THREE.BufferAttribute(sandSizes, 1));
    sandGeometry.setAttribute('color', new THREE.BufferAttribute(sandColors, 3));

    const sandMaterial = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    const sandParticles = new THREE.Points(sandGeometry, sandMaterial);
    sandParticles.name = 'sand-particles';
    floorRef.current.add(sandParticles);
    sandParticlesRef.current = { geometry: sandGeometry, material: sandMaterial, particles: sandParticles };

    return () => {
      floorRef.current?.remove(floor);
      rocksRef.current.forEach(rock => floorRef.current?.remove(rock));
      if (sandParticlesRef.current) {
        floorRef.current?.remove(sandParticlesRef.current.particles);
        sandParticlesRef.current.geometry.dispose();
        sandParticlesRef.current.material.dispose();
      }
      rocksRef.current = [];
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (sandParticlesRef.current) {
      const positions = sandParticlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += Math.sin(time * 0.5 + i) * 0.001;
      }
      sandParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return <group ref={floorRef} name="ocean-floor" />;
}