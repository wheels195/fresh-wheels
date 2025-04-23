"use client"

import { Suspense, useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei"

// Sophisticated floating bubbles with dark grey and white colors
function FloatingBubbles({ count = 80 }) {
  const bubblesRef = useRef([])

  // Create varied bubble clusters with dark grey and white colors
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      // Determine if bubble is white or dark grey
      const isWhite = Math.random() > 0.4

      return {
        position: [(Math.random() - 0.5) * 10, Math.random() * 10 - 2, (Math.random() - 0.5) * 10],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.01 + 0.002,
        wobble: Math.random() * 0.5 + 0.1,
        rotationSpeed: Math.random() * 0.01 - 0.005,
        color: isWhite ? "#ffffff" : "#333333",
        opacity: isWhite ? 0.9 : 0.7,
        metalness: isWhite ? 0.1 : 0.5,
        roughness: isWhite ? 0.2 : 0.1,
        distort: isWhite ? 0.2 : 0.3,
        delay: Math.random() * 2,
      }
    })
  }, [count])

  useFrame((state) => {
    bubblesRef.current.forEach((bubble, i) => {
      if (bubble) {
        const time = state.clock.getElapsedTime() + bubbles[i].delay

        // Organic upward movement with wobble
        bubble.position.y += bubbles[i].speed
        bubble.position.x += Math.sin(time * bubbles[i].wobble) * 0.01
        bubble.position.z += Math.cos(time * bubbles[i].wobble) * 0.01

        // Subtle rotation
        bubble.rotation.x += bubbles[i].rotationSpeed
        bubble.rotation.z += bubbles[i].rotationSpeed * 0.7

        // Reset position when bubble goes too high
        if (bubble.position.y > 8) {
          bubble.position.y = -2
          bubble.position.x = (Math.random() - 0.5) * 10
          bubble.position.z = (Math.random() - 0.5) * 10
        }
      }
    })
  })

  return (
    <group>
      {bubbles.map((bubble, i) => (
        <mesh key={i} ref={(el) => (bubblesRef.current[i] = el)} position={bubble.position} castShadow>
          <sphereGeometry args={[bubble.scale, 32, 32]} />
          <MeshDistortMaterial
            color={bubble.color}
            transparent
            opacity={bubble.opacity}
            distort={bubble.distort}
            speed={1}
            metalness={bubble.metalness}
            roughness={bubble.roughness}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Reflective floor
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}

export default function FloatingBubblesScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <color attach="background" args={["#0a0a0a"]} />

        {/* Sophisticated lighting */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[5, 7, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.3} color="#ffffff" />
        <pointLight position={[5, 0, 5]} intensity={0.3} color="#ffffff" />

        <Suspense fallback={null}>
          <FloatingBubbles count={100} />
          <ReflectiveFloor />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  )
}
