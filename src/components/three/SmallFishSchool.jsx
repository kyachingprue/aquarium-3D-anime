'use client';

import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const SMALL_FISH_MODELS = [
  '/models/clownfish.glb',
  '/models/blue-tang.glb',
];

function createProceduralFish(type = 0, index = 0) {
  const group = new THREE.Group();
  group.name = `procedural-fish-${type}-${index}`;

  const colors = [
    { body: 0xFF6B35, accent: 0xFFFFFF },
    { body: 0x0077BE, accent: 0xFFD700 },
    { body: 0xFFD700, accent: 0x000000 },
    { body: 0xFF1493, accent: 0xFFFFFF },
    { body: 0x00FFFF, accent: 0xFF6B35 },
  ];

  const color = colors[type % colors.length];
  const size = 0.3 + Math.random() * 0.4;

  const bodyGeometry = new THREE.CapsuleGeometry(0.3 * size, 0.8 * size, 8, 16);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: color.body,
    roughness: 0.6,
    metalness: 0.1,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.name = 'body';
  group.add(body);

  const tailGeometry = new THREE.ConeGeometry(0.4 * size, 0.6 * size, 8);
  const tailMaterial = new THREE.MeshStandardMaterial({
    color: color.body,
    roughness: 0.6,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.name = 'tail';
  tail.rotation.z = -Math.PI / 2;
  tail.position.z = -0.7 * size;
  group.add(tail);

  const finGeometry = new THREE.ConeGeometry(0.2 * size, 0.4 * size, 6);
  const finMaterial = new THREE.MeshStandardMaterial({
    color: color.accent,
    roughness: 0.5,
    metalness: 0.2,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
  });

  const topFin = new THREE.Mesh(finGeometry, finMaterial);
  topFin.name = 'top-fin';
  topFin.rotation.x = -Math.PI / 2;
  topFin.position.y = 0.3 * size;
  topFin.position.z = -0.1 * size;
  group.add(topFin);

  const bottomFin = new THREE.Mesh(finGeometry, finMaterial);
  bottomFin.name = 'bottom-fin';
  bottomFin.rotation.x = Math.PI / 2;
  bottomFin.position.y = -0.3 * size;
  bottomFin.position.z = -0.1 * size;
  group.add(bottomFin);

  const pectoralGeometry = new THREE.PlaneGeometry(0.5 * size, 0.3 * size, 4, 4);
  const pectoralMaterial = new THREE.MeshStandardMaterial({
    color: color.accent,
    roughness: 0.5,
    metalness: 0.1,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7,
  });

  const leftPectoral = new THREE.Mesh(pectoralGeometry, pectoralMaterial);
  leftPectoral.name = 'left-pectoral';
  leftPectoral.rotation.y = Math.PI / 2;
  leftPectoral.rotation.z = -Math.PI / 6;
  leftPectoral.position.x = -0.4 * size;
  group.add(leftPectoral);

  const rightPectoral = new THREE.Mesh(pectoralGeometry, pectoralMaterial);
  rightPectoral.name = 'right-pectoral';
  rightPectoral.rotation.y = -Math.PI / 2;
  rightPectoral.rotation.z = Math.PI / 6;
  rightPectoral.position.x = 0.4 * size;
  group.add(rightPectoral);

  const eyeGeometry = new THREE.SphereGeometry(0.05 * size, 8, 8);
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.1,
    metalness: 0.9,
  });

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.name = 'left-eye';
  leftEye.position.set(-0.15 * size, 0.1 * size, 0.5 * size);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.name = 'right-eye';
  rightEye.position.set(0.15 * size, 0.1 * size, 0.5 * size);
  group.add(rightEye);

  return group;
}

export function SmallFishSchool({ count = 30, scrollProgress = 0 }) {
  const schoolRef = useRef();
  const fishDataRef = useRef([]);
  const models = useLoader(GLTFLoader, SMALL_FISH_MODELS);

  useEffect(() => {
    if (!schoolRef.current) return;

    fishDataRef.current = [];
    
    for (let i = 0; i < count; i++) {
      const type = i % 5;
      let fish;
      
      if (models && models[type % models.length]) {
        const model = models[type % models.length].scene.clone();
        model.scale.setScalar(0.5);
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        fish = model;
      } else {
        fish = createProceduralFish(type, i);
      }

      const fishData = {
        mesh: fish,
        type,
        index: i,
        basePosition: new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 40 - 10,
          (Math.random() - 0.5) * 80 - 50
        ),
        swimOffset: Math.random() * Math.PI * 2,
        swimSpeed: 0.5 + Math.random() * 1,
        swimRadius: 2 + Math.random() * 4,
        swimHeight: 1 + Math.random() * 2,
        schoolOffset: new THREE.Vector3(
          Math.sin(i * 0.5) * 10,
          Math.cos(i * 0.3) * 5,
          Math.sin(i * 0.7) * 10
        ),
        turnSpeed: 0.5 + Math.random() * 0.5,
        targetRotation: new THREE.Euler(),
        currentRotation: new THREE.Euler(),
      };

      fishDataRef.current.push(fishData);
      schoolRef.current.add(fish);
    }

    return () => {
      fishDataRef.current.forEach(({ mesh }) => {
        if (schoolRef.current) {
          schoolRef.current.remove(mesh);
        }
      });
      fishDataRef.current = [];
    };
  }, [count, models]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const progress = scrollProgress;

    fishDataRef.current.forEach((fishData) => {
      const { mesh, swimOffset, swimSpeed, swimRadius, swimHeight, schoolOffset, basePosition, turnSpeed, targetRotation, currentRotation } = fishData;

      const schoolCenterX = Math.sin(time * 0.1 + progress * 5) * 15;
      const schoolCenterY = Math.cos(time * 0.08 + progress * 3) * 8 - 10;
      const schoolCenterZ = -progress * 300 + Math.sin(time * 0.05) * 10;

      const individualX = Math.sin(time * swimSpeed + swimOffset) * swimRadius;
      const individualY = Math.cos(time * swimSpeed * 0.7 + swimOffset) * swimHeight;
      const individualZ = Math.sin(time * swimSpeed * 0.5 + swimOffset * 1.3) * swimRadius;

      const targetX = schoolCenterX + schoolOffset.x + individualX;
      const targetY = schoolCenterY + schoolOffset.y + individualY;
      const targetZ = schoolCenterZ + schoolOffset.z + individualZ;

      const prevPosition = mesh.position.clone();
      mesh.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);

      const direction = new THREE.Vector3().subVectors(mesh.position, prevPosition);
      if (direction.length() > 0.001) {
        direction.normalize();
        targetRotation.y = Math.atan2(direction.x, direction.z);
        targetRotation.x = -Math.asin(THREE.MathUtils.clamp(direction.y, -1, 1));
        
        currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRotation.y, turnSpeed * delta);
        currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRotation.x, turnSpeed * delta);
        mesh.rotation.y = currentRotation.y;
        mesh.rotation.x = currentRotation.x;
      }

      const tail = mesh.getObjectByName('tail');
      const topFin = mesh.getObjectByName('top-fin');
      const bottomFin = mesh.getObjectByName('bottom-fin');
      const leftPectoral = mesh.getObjectByName('left-pectoral');
      const rightPectoral = mesh.getObjectByName('right-pectoral');

      const flapAmount = 0.5;
      const flap = Math.sin(time * swimSpeed * 8 + swimOffset) * flapAmount;

      if (tail) tail.rotation.y = flap;
      if (topFin) topFin.rotation.z = flap * 0.5;
      if (bottomFin) bottomFin.rotation.z = -flap * 0.5;
      if (leftPectoral) leftPectoral.rotation.z = -Math.PI / 6 + flap * 0.3;
      if (rightPectoral) rightPectoral.rotation.z = Math.PI / 6 - flap * 0.3;

      const body = mesh.getObjectByName('body');
      if (body) {
        body.rotation.z = Math.sin(time * 2 + swimOffset) * 0.1;
      }
    });
  });

  return <group ref={schoolRef} name="small-fish-school" />;
}