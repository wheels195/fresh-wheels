"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"

// Enhanced bucket with more realistic details
function EnhancedBucket() {
  const bucketRef = useRef()
  const waterRef = useRef()

  useFrame((state) => {
    if (bucketRef.current) {
      // Subtle rotation
      bucketRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }

    // We don't need to manually update the wobble material's time
    // as it handles animation internally
  })

  return (
    <group ref={bucketRef} position={[0, -1, 0]}>
      {/* Bucket body with metallic finish */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[1.2, 0.9, 1.5, 32]} />
        <meshStandardMaterial color="#3a86c8" metalness={0.4} roughness={0.2} envMapIntensity={1} />
      </mesh>

      {/* Bucket rim with more detail */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <torusGeometry args={[1.2, 0.1, 16, 32]} />
        <meshStandardMaterial color="#2a6ca8" metalness={0.5} roughness={0.15} />
      </mesh>

      {/* Bucket handle with better shape */}
      <mesh position={[0, 1.7, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[1, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#2a6ca8" metalness={0.5} roughness={0.15} />
      </mesh>

      {/* Water inside bucket with wobble effect */}
      <mesh position={[0, 1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 32]} />
        <MeshWobbleMaterial
          ref={waterRef}
          color="#a0d8ef"
          factor={0.15}
          speed={0.5}
          transparent
          opacity={0.9}
          metalness={0.3}
          roughness={0}
        />
      </mesh>

      {/* Soap suds on top of water - more organic shape */}
      <mesh position={[0, 1.15, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.15, 32]} />
        <MeshDistortMaterial color="white" transparent opacity={0.85} speed={1.5} distort={0.3} radius={1} />
      </mesh>

      {/* Bucket measurement markings */}
      <mesh position={[0, 0.5, 1.21]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 1.2]} />
        <meshBasicMaterial color="#2a6ca8" transparent opacity={0.7} />
      </mesh>

      {/* Brand logo on bucket */}
      <mesh position={[0, 0.5, 1.22]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.7, 0.3]} />
        <meshBasicMaterial color="white" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// Enhanced soap bubbles with more realistic properties
function EnhancedSoapBubbles({ count = 40 }) {
  const bubblesRef = useRef([])

  // Create more varied bubble clusters
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * 5, Math.random() * 5 - 1, (Math.random() - 0.5) * 5],
      scale: Math.random() * 0.25 + 0.05,
      speed: Math.random() * 0.015 + 0.005,
      wobble: Math.random() * 0.5 + 0.1,
      rotationSpeed: Math.random() * 0.01 - 0.005,
      hue: Math.random() * 0.1 + 0.65, // Slight color variation
      delay: Math.random() * 2,
    }))
  }, [count])

  useFrame((state) => {
    bubblesRef.current.forEach((bubble, i) => {
      if (bubble) {
        const time = state.clock.getElapsedTime() + bubbles[i].delay

        // More organic upward movement with wobble
        bubble.position.y += bubbles[i].speed
        bubble.position.x += Math.sin(time * bubbles[i].wobble) * 0.01
        bubble.position.z += Math.cos(time * bubbles[i].wobble) * 0.01

        // Subtle rotation
        bubble.rotation.x += bubbles[i].rotationSpeed
        bubble.rotation.z += bubbles[i].rotationSpeed * 0.7

        // Reset position when bubble goes too high
        if (bubble.position.y > 5) {
          bubble.position.y = -1
          bubble.position.x = (Math.random() - 0.5) * 5
          bubble.position.z = (Math.random() - 0.5) * 5
        }
      }
    })
  })

  return (
    <group>
      {bubbles.map((bubble, i) => (
        <mesh key={i} ref={(el) => (bubblesRef.current[i] = el)} position={bubble.position} castShadow>
          <sphereGeometry args={[bubble.scale, 16, 16]} />
          <MeshDistortMaterial
            color={`hsl(${Math.floor(bubble.hue * 360)}, 20%, 95%)`}
            transparent
            opacity={0.7 + Math.sin(bubble.delay) * 0.2}
            distort={0.2}
            speed={1}
            metalness={0.8}
            roughness={0}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Suds that stick to the bucket and rim
function StickyBubbleClusters() {
  const clusters = useMemo(() => {
    return Array.from({ length: 15 }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = 1.2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      return {
        position: [x, 1.25 + Math.random() * 0.15, z],
        scale: Math.random() * 0.15 + 0.05,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        wobble: Math.random() * 0.3 + 0.1,
      }
    })
  }, [])

  return (
    <group>
      {clusters.map((cluster, i) => (
        <mesh key={i} position={cluster.position} rotation={cluster.rotation}>
          <sphereGeometry args={[cluster.scale, 16, 16]} />
          <MeshDistortMaterial
            color="white"
            transparent
            opacity={0.85}
            distort={0.3}
            speed={0.5}
            metalness={0.2}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Water droplets on the floor and bucket
function WaterDroplets({ count = 25 }) {
  const droplets = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 3
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      return {
        position: [x, -1.49, z],
        scale: Math.random() * 0.08 + 0.02,
        flatten: Math.random() * 0.5 + 0.5,
      }
    })
  }, [count])

  return (
    <group>
      {droplets.map((droplet, i) => (
        <mesh key={i} position={droplet.position} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[droplet.scale, 16, 16]} />
          <meshStandardMaterial color="#a0d8ef" transparent opacity={0.7} metalness={1} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

// Floor with reflection
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
    </mesh>
  )
}

export default function EnhancedBucketScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [3, 2, 5], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />

        {/* Enhanced lighting for more realism */}
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 7, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#80d8ff" />
        <pointLight position={[5, 0, 5]} intensity={0.5} color="#ffffff" />

        <Suspense fallback={null}>
          <EnhancedBucket />
          <EnhancedSoapBubbles count={50} />
          <StickyBubbleClusters />
          <WaterDroplets count={30} />
          <ReflectiveFloor />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  )
}
