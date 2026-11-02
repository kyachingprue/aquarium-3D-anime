import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const route = [
  [1.8, -0.2, 0, 0.05, 1.25],
  [-1.6, 0.2, -0.3, -0.12, 1.05],
  [1.8, -0.5, 0.2, 0.12, 0.93],
  [-1.8, 0.6, -0.4, -0.08, 0.9],
  [1.4, -0.25, 0.3, 0.14, 0.93],
  [-1.5, 0.2, -0.2, -0.12, 0.9],
  [1.5, 0.35, 0.4, 0.08, 0.92],
  [-1.3, -0.3, -0.2, -0.12, 0.9],
  [0.8, 0.1, 0.1, 0.06, 0.95],
]

function seeded(index, salt) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
  return value - Math.floor(value)
}

function routeAt(progress) {
  const scaled = THREE.MathUtils.clamp(progress, 0, 1) * (route.length - 1)
  const index = Math.min(Math.floor(scaled), route.length - 2)
  const amount = THREE.MathUtils.smoothstep(scaled - index, 0, 1)
  return route[index].map((value, axis) => THREE.MathUtils.lerp(value, route[index + 1][axis], amount))
}

function createWhaleSharkTexture(image) {
  const sourceX = Math.round(image.width * 0.025)
  const sourceY = Math.round(image.height * 0.06)
  const sourceWidth = Math.round(image.width * 0.45)
  const sourceHeight = Math.round(image.height * 0.25)
  const canvas = document.createElement('canvas')
  canvas.width = sourceWidth
  canvas.height = sourceHeight
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) throw new Error('Unable to prepare the whale shark image texture.')

  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight)
  const pixels = context.getImageData(0, 0, sourceWidth, sourceHeight)
  const { data } = pixels
  const visited = new Uint8Array(sourceWidth * sourceHeight)
  const queue = new Int32Array(sourceWidth * sourceHeight)
  let head = 0
  let tail = 0

  const isBackground = (pixel) => {
    const red = data[pixel * 4]
    const green = data[pixel * 4 + 1]
    const blue = data[pixel * 4 + 2]
    return Math.min(red, green, blue) > 218 && Math.max(red, green, blue) - Math.min(red, green, blue) < 34
  }
  const enqueue = (pixel) => {
    if (visited[pixel] || !isBackground(pixel)) return
    visited[pixel] = 1
    queue[tail] = pixel
    tail += 1
  }

  for (let x = 0; x < sourceWidth; x += 1) {
    enqueue(x)
    enqueue((sourceHeight - 1) * sourceWidth + x)
  }
  for (let y = 0; y < sourceHeight; y += 1) {
    enqueue(y * sourceWidth)
    enqueue(y * sourceWidth + sourceWidth - 1)
  }

  while (head < tail) {
    const pixel = queue[head]
    head += 1
    const x = pixel % sourceWidth
    if (x > 0) enqueue(pixel - 1)
    if (x < sourceWidth - 1) enqueue(pixel + 1)
    if (pixel >= sourceWidth) enqueue(pixel - sourceWidth)
    if (pixel < sourceWidth * (sourceHeight - 1)) enqueue(pixel + sourceWidth)
  }

  for (let pixel = 0; pixel < visited.length; pixel += 1) {
    const alphaIndex = pixel * 4 + 3
    if (visited[pixel]) {
      data[alphaIndex] = 0
      continue
    }

    const x = pixel % sourceWidth
    const hasBackgroundNeighbor =
      (x > 0 && visited[pixel - 1]) ||
      (x < sourceWidth - 1 && visited[pixel + 1]) ||
      (pixel >= sourceWidth && visited[pixel - sourceWidth]) ||
      (pixel < sourceWidth * (sourceHeight - 1) && visited[pixel + sourceWidth])
    if (!hasBackgroundNeighbor) continue

    const red = data[pixel * 4]
    const green = data[pixel * 4 + 1]
    const blue = data[pixel * 4 + 2]
    const brightness = (red + green + blue) / 3
    if (Math.max(red, green, blue) - Math.min(red, green, blue) < 42 && brightness > 185) {
      data[alphaIndex] = Math.round(data[alphaIndex] * THREE.MathUtils.clamp((235 - brightness) / 42, 0, 1))
    }
  }

  context.putImageData(pixels, 0, 0)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function createGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Unable to prepare the underwater glow texture.')
  const gradient = context.createRadialGradient(64, 64, 3, 64, 64, 64)
  gradient.addColorStop(0, 'rgba(86, 220, 225, 0.42)')
  gradient.addColorStop(0.45, 'rgba(50, 173, 195, 0.16)')
  gradient.addColorStop(1, 'rgba(30, 133, 165, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  return texture
}

function WhaleSharkImagePlane({ progress, reducedMotion }) {
  const root = useRef(null)
  const sourceTexture = useLoader(THREE.TextureLoader, '/images/whale-shark.jpg')
  const imageTexture = useMemo(() => createWhaleSharkTexture(sourceTexture.image), [sourceTexture])
  const glowTexture = useMemo(() => createGlowTexture(), [])
  const planeHeight = 4.1
  const planeWidth = planeHeight * (imageTexture.image.width / imageTexture.image.height)

  useFrame((state, delta) => {
    if (!root.current) return
    const time = state.clock.elapsedTime
    const point = routeAt(progress.current)
    const mobile = window.innerWidth < 700
    const bob = reducedMotion ? 0 : Math.sin(time * 0.55) * 0.12
    const glide = reducedMotion ? 0 : Math.sin(time * 0.32) * 0.035
    const bank = reducedMotion ? 0 : Math.sin(time * 0.48) * 0.045
    const viewportScale = mobile ? 0.42 : window.innerWidth < 1050 ? 0.82 : 1.18
    const targetX = point[0] * viewportScale - (mobile ? 0.7 : 0)
    const target = new THREE.Vector3(targetX, point[1] + bob - (mobile ? 1.35 : 0), point[2])
    root.current.position.lerp(target, 1 - Math.exp(-delta * 2.4))
    const turn = reducedMotion ? 0 : Math.sin(time * 0.22) * 0.12
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, point[3] + glide + turn, 1.8, delta)
    root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, bank, 1.8, delta)
    const scale = point[4] * viewportScale
    root.current.scale.set(scale, scale, scale)
  })

  return (
    <group ref={root} position={[1.8, -0.2, 0]} scale={1.25}>
      <sprite position={[0, 0, -0.08]} scale={[planeWidth * 1.35, planeHeight * 1.55, 1]}>
        <spriteMaterial map={glowTexture} transparent opacity={0.72} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial map={imageTexture} transparent alphaTest={0.015} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  )
}

function BubbleField({ count, reducedMotion }) {
  const points = useRef(null)
  const { positions, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const offsets = new Float32Array(count)
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seeded(index, 1) - 0.5) * 22
      positions[index * 3 + 1] = (seeded(index, 2) - 0.5) * 14
      positions[index * 3 + 2] = -2 - seeded(index, 3) * 12
      speeds[index] = 0.22 + seeded(index, 4) * 0.55
      offsets[index] = seeded(index, 5) * Math.PI * 2
    }
    return { positions, speeds, offsets }
  }, [count])

  useFrame((state, delta) => {
    if (reducedMotion) return
    const geometry = points.current?.geometry
    const attribute = geometry?.attributes.position
    if (!attribute) return
    const array = attribute.array
    for (let index = 0; index < count; index += 1) {
      array[index * 3 + 1] += speeds[index] * delta
      array[index * 3] += Math.sin(state.clock.elapsedTime * 0.4 + offsets[index]) * delta * 0.04
      if (array[index * 3 + 1] > 8) array[index * 3 + 1] = -8
    }
    attribute.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#a8eff0" size={0.045} transparent opacity={0.62} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function SmallFishSchool({ reducedMotion }) {
  const school = useRef(null)
  const fish = useMemo(() => Array.from({ length: 14 }, (_, index) => ({
    x: (seeded(index, 6) - 0.5) * 17,
    y: (seeded(index, 7) - 0.5) * 8,
    z: -2 - seeded(index, 8) * 8,
    phase: index * 0.72,
    scale: 0.045 + seeded(index, 9) * 0.055,
  })), [])

  useFrame((state) => {
    if (!school.current || reducedMotion) return
    school.current.children.forEach((group, index) => {
      const { x, y, z, phase } = fish[index]
      const time = state.clock.elapsedTime * 0.22 + phase
      group.position.set(x + Math.sin(time) * 0.65, y + Math.sin(time * 1.4) * 0.16, z)
      group.rotation.z = Math.cos(time) * 0.08
    })
  })

  return (
    <group ref={school}>
      {fish.map((item, index) => (
        <group key={index} scale={item.scale}>
          <mesh><sphereGeometry args={[1, 12, 8]} /><meshStandardMaterial color={index % 3 === 0 ? '#99e4dc' : '#71b9d1'} roughness={0.5} /></mesh>
          <mesh position={[-1.25, 0, 0]} rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.56, 1.05, 4]} /><meshStandardMaterial color="#65afc6" /></mesh>
        </group>
      ))}
    </group>
  )
}

function Sunbeams() {
  return (
    <group position={[0, 3, -5]}>
      {[-5.5, -2.5, 0.8, 3.4, 6].map((x, index) => (
        <mesh key={x} position={[x, 1.2, -index * 0.35]} rotation={[0, 0, -0.15 + index * 0.06]}>
          <planeGeometry args={[0.5 + (index % 2) * 0.45, 12]} />
          <meshBasicMaterial color="#8ce7e8" transparent opacity={0.035} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

function SceneContents({ progress, reducedMotion }) {
  const light = useRef(null)
  useFrame((state) => {
    if (!light.current || reducedMotion) return
    light.current.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 2
  })
  return (
    <>
      <ambientLight intensity={1.15} color="#8bd3e1" />
      <directionalLight ref={light} position={[-4, 7, 5]} intensity={3.2} color="#d2fbf6" />
      <pointLight position={[5, -2, 3]} intensity={17} color="#168fa6" distance={24} />
      <fog attach="fog" args={['#062b43', 12, 31]} />
      <Sunbeams />
      <WhaleSharkImagePlane progress={progress} reducedMotion={reducedMotion} />
      <SmallFishSchool reducedMotion={reducedMotion} />
      <BubbleField count={window.innerWidth < 700 ? 75 : 170} reducedMotion={reducedMotion} />
    </>
  )
}

export function OceanScene({ progress, reducedMotion }) {
  return (
    <div className="ocean-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 12], fov: 43 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <SceneContents progress={progress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
