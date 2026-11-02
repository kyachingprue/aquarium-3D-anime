'use client';

import { useFrame, useRef, useEffect } from 'react';
import * as THREE from 'three';

const CORAL_COLORS = [
  0xFF6B6B, 0xFF8E8E, 0xFFB3B3,
  0xFFD93D, 0xFFE66D, 0xFFF1A8,
  0x6BCB77, 0x98D9AA, 0xC4E8D0,
  0x4D96FF, 0x7BAAFF, 0xA8CCFF,
  0xFF6B9D, 0xFF9EC7, 0xFFD1E0,
  0xFFFFFF, 0xF0F0F0, 0xE0E0E0,
];

function createCoral(type, position, scale = 1) {
  const group = new THREE.Group();
  group.name = `coral-${type}`;
  group.position.copy(position);
  group.scale.setScalar(scale);

  const color = CORAL_COLORS[Math.floor(Math.random() * CORAL_COLORS.length)];

  const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 3, 6);
  const trunkMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.8,
    metalness: 0.05,
  });

  switch (type) {
    case 'branching': {
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 1.5;
      group.add(trunk);

      for (let i = 0; i < 5; i++) {
        const branchGeometry = new THREE.CylinderGeometry(0.15, 0.25, 1.5, 5);
        const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
        branch.position.set(
          (Math.random() - 0.5) * 1,
          2 + i * 0.4,
          (Math.random() - 0.5) * 1
        );
        branch.rotation.set(
          (Math.random() - 0.5) * 0.5,
          Math.random() * Math.PI * 2,
          (Math.random() - 0.5) * 0.5
        );
        group.add(branch);
      }
      break;
    }
    case 'fan': {
      const fanGeometry = new THREE.PlaneGeometry(2, 2.5, 8, 8);
      const fanMaterial = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.7,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });
      const fan = new THREE.Mesh(fanGeometry, fanMaterial);
      fan.rotation.x = -Math.PI / 2;
      fan.position.y = 1.2;
      group.add(fan);

      const stemGeometry = new THREE.CylinderGeometry(0.1, 0.2, 1.5, 5);
      const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a4a,
        roughness: 0.9,
        metalness: 0.05,
      });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.y = 0.75;
      group.add(stem);
      break;
    }
    case 'brain': {
      const brainGeometry = new THREE.SphereGeometry(1.2, 12, 12);
      const brainMaterial = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.9,
        metalness: 0.02,
      });
      const brain = new THREE.Mesh(brainGeometry, brainMaterial);
      brain.position.y = 1;
      brain.scale.set(1.2, 0.7, 1);
      group.add(brain);
      break;
    }
    case 'tube': {
      for (let i = 0; i < 4; i++) {
        const tubeGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2.5, 8, 1, true);
        const tubeMaterial = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.7,
          metalness: 0.1,
          side: THREE.DoubleSide,
        });
        const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
        tube.position.set(
          (Math.random() - 0.5) * 0.8,
          1.25,
          (Math.random() - 0.5) * 0.8
        );
        tube.rotation.set(
          (Math.random() - 0.5) * 0.3,
          0,
          (Math.random() - 0.5) * 0.3
        );
        group.add(tube);
      }
      break;
    }
    case 'soft': {
      for (let i = 0; i < 8; i++) {
        const polypGeometry = new THREE.SphereGeometry(0.25, 8, 8);
        const polypMaterial = new THREE.MeshStandardMaterial({
          color,
          roughness: 0.6,
          metalness: 0.1,
        });
        const polyp = new THREE.Mesh(polypGeometry, polypMaterial);
        polyp.position.set(
          (Math.random() - 0.5) * 1.5,
          0.5 + Math.random() * 1.5,
          (Math.random() - 0.5) * 1.5
        );
        polyp.scale.set(1, 1.5 + Math.random(), 1);
        group.add(polyp);
      }
      break;
    }
  }

  return group;
}

function createSeaweed(position, height = 3, segments = 8) {
  const group = new THREE.Group();
  group.name = 'seaweed';
  group.position.copy(position);

  const color = new THREE.Color().setHSL(0.35 + Math.random() * 0.1, 0.5, 0.25 + Math.random() * 0.15);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
  });

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3((Math.random() - 0.5) * 0.5, height * 0.3, (Math.random() - 0.5) * 0.5),
    new THREE.Vector3((Math.random() - 0.5) * 0.8, height * 0.6, (Math.random() - 0.5) * 0.8),
    new THREE.Vector3((Math.random() - 0.5) * 1, height, (Math.random() - 0.5) * 1),
  ]);

  const tubeGeometry = new THREE.TubeGeometry(curve, segments, 0.08, 6, false);
  const tube = new THREE.Mesh(tubeGeometry, material);
  group.add(tube);

  group.userData = { curve, originalPoints: curve.points.map(p => p.clone()), material, timeOffset: Math.random() * Math.PI * 2 };

  return group;
}

export function CoralReef({ scrollProgress = 0 }) {
  const reefRef = useRef();
  const coralsRef = useRef([]);
  const seaweedsRef = useRef([]);

  useEffect(() => {
    if (!reefRef.current) return;

    const coralTypes = ['branching', 'fan', 'brain', 'tube', 'soft'];

    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 120;
      const z = (Math.random() - 0.5) * 120 - 80;
      const y = -15;
      const type = coralTypes[Math.floor(Math.random() * coralTypes.length)];
      const scale = 0.5 + Math.random() * 1.5;

      const coral = createCoral(type, new THREE.Vector3(x, y, z), scale);
      coral.userData = { type, swayOffset: Math.random() * Math.PI * 2, swaySpeed: 0.2 + Math.random() * 0.3 };
      coralsRef.current.push(coral);
      reefRef.current.add(coral);
    }

    for (let i = 0; i < 60; i++) {
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 150 - 100;
      const y = -15;
      const height = 2 + Math.random() * 4;

      const seaweed = createSeaweed(new THREE.Vector3(x, y, z), height);
      seaweedsRef.current.push(seaweed);
      reefRef.current.add(seaweed);
    }

    return () => {
      coralsRef.current.forEach(coral => reefRef.current?.remove(coral));
      seaweedsRef.current.forEach(seaweed => reefRef.current?.remove(seaweed));
      coralsRef.current = [];
      seaweedsRef.current = [];
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    coralsRef.current.forEach(coral => {
      const { swayOffset, swaySpeed } = coral.userData;
      coral.rotation.y = Math.sin(time * swaySpeed + swayOffset) * 0.05;
      coral.rotation.x = Math.cos(time * swaySpeed * 0.7 + swayOffset) * 0.03;
      coral.rotation.z = Math.sin(time * swaySpeed * 0.5 + swayOffset) * 0.02;
    });

    seaweedsRef.current.forEach(seaweed => {
      const { curve, originalPoints, timeOffset } = seaweed.userData;
      const points = curve.points;
      
      for (let i = 1; i < points.length; i++) {
        const original = originalPoints[i];
        const sway = Math.sin(time * 0.5 + timeOffset + i * 0.8) * 0.15 * (i / points.length);
        const swayZ = Math.cos(time * 0.4 + timeOffset + i * 0.6) * 0.1 * (i / points.length);
        
        points[i].x = original.x + sway;
        points[i].z = original.z + swayZ;
      }
      curve.updateArcLengths();
    });
  });

  return <group ref={reefRef} name="coral-reef" />;
}