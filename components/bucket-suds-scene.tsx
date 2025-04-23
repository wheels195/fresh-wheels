"use client"

import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

// Simple bucket component
function Bucket() {
  const bucketRef = useRef()

  useFrame((state) => {
    if (bucketRef.current) {
      bucketRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={bucketRef} position={[0, -1, 0]}>
      {/* Bucket body - cylinder */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.2, 1, 1.5, 32]} />
        <meshStandardMaterial color="#2c7cbd" metalness={0.1} roughness={0.2} />
      </mesh>

      {/* Bucket rim - torus */}
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[1.2, 0.1, 16, 32]} />
        <meshStandardMaterial color="#1e5c94" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Bucket handle - curved cylinder */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.08, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#1e5c94" metalness={0.3} roughness={0.2} />
      </mesh>

      {/* Soap suds on top of bucket */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[1.19, 1.19, 0.1, 32]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

// Soap bubbles floating around
function SoapBubbles({ count = 30 }) {
  const bubblesRef = useRef([])

  // Initialize bubble positions and speeds
  const bubbles = Array.from({ length: count }).map(() => ({
    position: [(Math.random() - 0.5) * 5, Math.random() * 5 - 1, (Math.random() - 0.5) * 5],
    scale: Math.random() * 0.2 + 0.1,
    speed: Math.random() * 0.01 + 0.005,
  }))

  useFrame(() => {
    bubblesRef.current.forEach((bubble, i) => {
      if (bubble) {
        // Move bubbles upward
        bubble.position.y += bubbles[i].speed

        // Add slight horizontal movement
        bubble.position.x += Math.sin(Date.now() * 0.001 + i) * 0.005
        bubble.position.z += Math.cos(Date.now() * 0.0015 + i) * 0.005

        // Reset position when bubble goes too high
        if (bubble.position.y > 5) {
          bubble.position.y = -1
        }
      }
    })
  })

  return (
    <group>
      {bubbles.map((bubble, i) => (
        <mesh key={i} ref={(el) => (bubblesRef.current[i] = el)} position={bubble.position}>
          <sphereGeometry args={[bubble.scale, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={0.7} roughness={0.1} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

export default function BucketSudsScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <color attach="background" args={["#0a0a0a"]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, 5, -10]} intensity={0.5} color="#80d8ff" />

        <Suspense fallback={null}>
          <Bucket />
          <SoapBubbles count={40} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  )
}
