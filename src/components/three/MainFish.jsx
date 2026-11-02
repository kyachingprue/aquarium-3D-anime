'use client';

import { useFrame, useLoader } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FISH_MODEL_URL = '/models/manta-ray.glb';

function createProceduralMantaRay() {
  const group = new THREE.Group();
  group.name = 'manta-ray';

  const bodyGeometry = new THREE.SphereGeometry(1.2, 32, 16);
  bodyGeometry.scale(3, 0.5, 1.5);
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    roughness: 0.7,
    metalness: 0.1,
    side: THREE.DoubleSide,
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.name = 'body';
  group.add(body);

  const wingGeometry = new THREE.PlaneGeometry(12, 6, 32, 16);
  const wingMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.05,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
  });
  
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.name = 'left-wing';
  leftWing.rotation.y = Math.PI / 2;
  leftWing.position.x = -1.5;
  group.add(leftWing);

  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  rightWing.name = 'right-wing';
  rightWing.rotation.y = -Math.PI / 2;
  rightWing.position.x = 1.5;
  group.add(rightWing);

  const tailGeometry = new THREE.ConeGeometry(0.15, 4, 8);
  const tailMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.05,
  });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.name = 'tail';
  tail.rotation.x = -Math.PI / 2;
  tail.position.z = -2.5;
  group.add(tail);

  const cephalicFinGeometry = new THREE.ConeGeometry(0.3, 1.5, 8);
  const cephalicFinMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    roughness: 0.8,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  const leftCephalic = new THREE.Mesh(cephalicFinGeometry, cephalicFinMaterial);
  leftCephalic.name = 'left-cephalic';
  leftCephalic.rotation.x = Math.PI / 2;
  leftCephalic.rotation.z = -Math.PI / 6;
  leftCephalic.position.set(-1, 0.2, 2);
  group.add(leftCephalic);

  const rightCephalic = new THREE.Mesh(cephalicFinGeometry, cephalicFinMaterial);
  rightCephalic.name = 'right-cephalic';
  rightCephalic.rotation.x = Math.PI / 2;
  rightCephalic.rotation.z = Math.PI / 6;
  rightCephalic.position.set(1, 0.2, 2);
  group.add(rightCephalic);

  const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    roughness: 0.1,
    metalness: 0.9,
  });

  const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  leftEye.name = 'left-eye';
  leftEye.position.set(-0.8, 0.15, 1.8);
  leftEye.scale.set(1, 0.8, 1);
  group.add(leftEye);

  const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
  rightEye.name = 'right-eye';
  rightEye.position.set(0.8, 0.15, 1.8);
  rightEye.scale.set(1, 0.8, 1);
  group.add(rightEye);

  return group;
}

export function MainFish({ scrollProgress = 0 }) {
  const fishRef = useRef();
  const mixerRef = useRef();
  const animationRef = useRef();
  const wingRefs = useRef({ left: null, right: null });
  const tailRef = useRef(null);
  const cephalicRefs = useRef({ left: null, right: null });
  const bodyRef = useRef(null);
  const eyeRefs = useRef({ left: null, right: null });

  const model = useLoader(GLTFLoader, FISH_MODEL_URL, (gltf) => {
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
        child.material.side = THREE.DoubleSide;
      }
    });
  });

  useEffect(() => {
    if (!fishRef.current) return;

    if (model) {
      fishRef.current.add(model.scene);
      if (model.animations.length > 0) {
        mixerRef.current = new THREE.AnimationMixer(model.scene);
        animationRef.current = mixerRef.current.clipAction(model.animations[0]);
        animationRef.current.play();
      }
    } else {
      const proceduralFish = createProceduralMantaRay();
      fishRef.current.add(proceduralFish);
      
      bodyRef.current = proceduralFish.getObjectByName('body');
      wingRefs.current.left = proceduralFish.getObjectByName('left-wing');
      wingRefs.current.right = proceduralFish.getObjectByName('right-wing');
      tailRef.current = proceduralFish.getObjectByName('tail');
      cephalicRefs.current.left = proceduralFish.getObjectByName('left-cephalic');
      cephalicRefs.current.right = proceduralFish.getObjectByName('right-cephalic');
      eyeRefs.current.left = proceduralFish.getObjectByName('left-eye');
      eyeRefs.current.right = proceduralFish.getObjectByName('right-eye');
    }

    return () => {
      if (model && fishRef.current) {
        fishRef.current.remove(model.scene);
      }
    };
  }, [model]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const mixer = mixerRef.current;
    const animation = animationRef.current;

    if (mixer && animation) {
      mixer.update(delta);
    }

    const progress = scrollProgress;
    const totalSections = 10;
    const sectionHeight = 1 / totalSections;
    const currentSection = Math.floor(progress / sectionHeight);
    const sectionProgress = (progress % sectionHeight) / sectionHeight;

    const pathPoints = [
      { x: 0, y: 0, z: 0, rotY: 0 },
      { x: -15, y: -5, z: -20, rotY: 0.3 },
      { x: 10, y: -15, z: -50, rotY: -0.5 },
      { x: -20, y: -10, z: -80, rotY: 0.7 },
      { x: 5, y: 5, z: -120, rotY: -0.2 },
      { x: 25, y: -20, z: -160, rotY: 0.4 },
      { x: -10, y: -30, z: -200, rotY: -0.6 },
      { x: 15, y: -15, z: -250, rotY: 0.8 },
      { x: 0, y: 10, z: -300, rotY: 0 },
      { x: 0, y: 0, z: -350, rotY: 0 },
    ];

    const getPosition = (progress) => {
      const clampedProgress = Math.min(progress, 1);
      const index = Math.min(Math.floor(clampedProgress * (pathPoints.length - 1)), pathPoints.length - 2);
      const localProgress = (clampedProgress * (pathPoints.length - 1)) - index;
      const p1 = pathPoints[index];
      const p2 = pathPoints[index + 1];

      return {
        x: THREE.MathUtils.lerp(p1.x, p2.x, localProgress),
        y: THREE.MathUtils.lerp(p1.y, p2.y, localProgress),
        z: THREE.MathUtils.lerp(p1.z, p2.z, localProgress),
        rotY: THREE.MathUtils.lerp(p1.rotY, p2.rotY, localProgress),
      };
    };

    const pos = getPosition(progress);

    if (fishRef.current) {
      fishRef.current.position.lerp(new THREE.Vector3(pos.x, pos.y, pos.z), 0.1);
      
      const targetRotation = new THREE.Euler(0, pos.rotY, 0);
      fishRef.current.rotation.y = THREE.MathUtils.lerp(
        fishRef.current.rotation.y,
        targetRotation.y,
        0.05
      );

      const wingFlapSpeed = 1.5;
      const wingFlapAmount = 0.6;
      const tailSwishSpeed = 2;
      const tailSwishAmount = 0.4;
      const cephalicFlapSpeed = 1.2;
      const cephalicFlapAmount = 0.3;

      if (wingRefs.current.left && wingRefs.current.right) {
        const flap = Math.sin(time * wingFlapSpeed) * wingFlapAmount;
        wingRefs.current.left.rotation.z = flap;
        wingRefs.current.right.rotation.z = -flap;
      }

      if (tailRef.current) {
        tailRef.current.rotation.z = Math.sin(time * tailSwishSpeed) * tailSwishAmount;
      }

      if (cephalicRefs.current.left && cephalicRefs.current.right) {
        const flap = Math.sin(time * cephalicFlapSpeed) * cephalicFlapAmount;
        cephalicRefs.current.left.rotation.z = -Math.PI / 6 + flap;
        cephalicRefs.current.right.rotation.z = Math.PI / 6 - flap;
      }

      if (bodyRef.current) {
        bodyRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
        bodyRef.current.rotation.x = Math.sin(time * 0.3) * 0.03;
      }

      if (eyeRefs.current.left && eyeRefs.current.right) {
        const blink = Math.sin(time * 0.02) > 0.99 ? 0.1 : 1;
        eyeRefs.current.left.scale.y = blink;
        eyeRefs.current.right.scale.y = blink;
      }
    }
  });

  return (
    <group ref={fishRef} name="main-fish">
      {model && <primitive object={model.scene} />}
    </group>
  );
}